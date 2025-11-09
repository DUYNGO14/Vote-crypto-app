// src/services/AxiosService.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from '@/utils/token';
import { Config } from '@/config/env';

// ==================== TYPES ====================
type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
  config: any;
};

interface NormalizedResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// ==================== MAIN CLASS ====================
export class AxiosService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedQueueItem[] = [];
  private readonly MAX_QUEUE_SIZE = 50;

  constructor(
    baseURL: string = Config.apiBaseUrl,
    timeout: number = Config.apiTimeout || 10000
  ) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors();
  }

  // ==================== LOGGING ====================
  private log(...args: any[]) {
    if (__DEV__ || Config.enableLogger) {
      console.log(...args);
    }
  }

  // ==================== INTERCEPTORS ====================
  private setupInterceptors() {
    // === Request interceptor ===
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getAccessToken();
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        this.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // === Response interceptor ===
    this.axiosInstance.interceptors.response.use(
      (response) => this.normalizeResponse(response),
      (error) => this.handleResponseError(error)
    );
  }

  // ==================== NORMALIZE RESPONSE ====================
  private normalizeResponse(response: AxiosResponse): AxiosResponse {
    this.log(`[API RESPONSE] ${response.status} ${response.config.url}`);

    const code = response.data?.code ?? response.status ?? 200;
    const success = response.data?.success ?? (code >= 200 && code < 300);
    const message = response.data?.message ?? 'Success';

    let data: any;
    if (response.data?.data?.items !== undefined) {
      data = response.data.data.items;
    } else if (response.data?.data !== undefined) {
      data = response.data.data;
    } else {
      data = response.data ?? null;
    }

    const meta =
      response.data?.data?.total !== undefined
        ? {
            total: response.data.data.total,
            page: response.data.data.page,
            limit: response.data.data.limit,
          }
        : undefined;

    // ✅ Modify response.data instead of creating new object
    response.data = { 
      code, 
      success, 
      message, 
      data, 
      ...(meta && { meta }) 
    };

    return response;
  }

  // ==================== ERROR HANDLER ====================
  private async handleResponseError(error: any): Promise<any> {
    const originalRequest = error.config;

    // --- Network error ---
    if (!error.response) {
      this.log('[API ERROR] Network error:', error.message);
      return Promise.reject({
        code: 0,
        success: false,
        message: 'Không có kết nối mạng',
        data: null,
        isNetworkError: true,
      });
    }

    const status = error.response?.status;

    // --- Handle token expired (401) ---
    if (status === 401 && !originalRequest._retry) {
      if (this.failedQueue.length >= this.MAX_QUEUE_SIZE) {
        return Promise.reject({
          code: 429,
          success: false,
          message: 'Quá nhiều yêu cầu đang chờ',
          data: null,
        });
      }

      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      this.isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        const refreshUrl = `${Config.apiBaseUrl}/auth/refresh-token`;
        const { data } = await axios.post(
          refreshUrl,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
        );

        const newAccessToken = data?.data?.accessToken ?? data?.accessToken;
        const newRefreshToken = data?.data?.refreshToken ?? data?.refreshToken;

        if (!newAccessToken) throw new Error('Refresh failed: no new access token');

        await saveAccessToken(newAccessToken);
        if (newRefreshToken) await saveRefreshToken(newRefreshToken);

        this.log('[REFRESH SUCCESS] New token set.');

        this.processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return this.axiosInstance(originalRequest);
      } catch (err) {
        console.error('[REFRESH FAILED]', err);
        this.processQueue(err, null);
        await clearTokens();
        
        return Promise.reject({
          code: 401,
          success: false,
          message: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại',
          data: null,
          requiresLogin: true,
        });
      } finally {
        this.isRefreshing = false;
      }
    }

    this.log('[API ERROR]', error.message, error.config?.url);
    return Promise.reject({
      code: status || error.code || 500,
      success: false,
      message: error.response?.data?.message || error.message || 'Unknown error',
      data: error.response?.data ?? null,
    });
  }

  // ==================== QUEUE HANDLER ====================
  private processQueue(error: any, token: string | null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        if (token) {
          prom.config.headers = prom.config.headers ?? {};
          prom.config.headers.Authorization = `Bearer ${token}`;
        }
        prom.resolve(this.axiosInstance(prom.config));
      }
    });
    this.failedQueue = [];
  }

  // ==================== PUBLIC METHODS ====================
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<NormalizedResponse<T>> {
    return this.axiosInstance.get(url, config)
      .then(res => res.data as NormalizedResponse<T>);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<NormalizedResponse<T>> {
    return this.axiosInstance.post(url, data, config)
      .then(res => res.data as NormalizedResponse<T>);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<NormalizedResponse<T>> {
    return this.axiosInstance.put(url, data, config)
      .then(res => res.data as NormalizedResponse<T>);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<NormalizedResponse<T>> {
    return this.axiosInstance.patch(url, data, config)
      .then(res => res.data as NormalizedResponse<T>);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<NormalizedResponse<T>> {
    return this.axiosInstance.delete(url, config)
      .then(res => res.data as NormalizedResponse<T>);
  }

  // ==================== UTILITY ====================
  public setAuthToken(token: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public clearAuthToken() {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }
}

// ==================== EXPORT SINGLETON ====================
const api = new AxiosService(Config.apiBaseUrl);
export default api;