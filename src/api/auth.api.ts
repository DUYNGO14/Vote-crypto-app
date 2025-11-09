// src/api/auth.api.ts
import {
  LoginRequest,
  LoginResponse,
  User
} from '@/types/auth.types';
import { clearTokens, saveAccessToken, saveRefreshToken } from '@/utils/token';
import api from './axiosInstance';

/**
 * Auth API Service
 * Tất cả API calls liên quan đến authentication
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);

    if (response.success && response.data) {
      // Save tokens to storage
      await saveAccessToken(response.data.accessToken);
      await saveRefreshToken(response.data.refreshToken);
      
      // Set token to axios instance
      api.setAuthToken(response.data.accessToken);

      return response.data;
    }

    throw new Error(response.message || 'Login failed');
  },

  /**
  //  * Register new user
  //  */
  // register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
  //   const response = await api.post<RegisterResponse>('/auth/register', userData);

  //   if (response.success && response.data) {
  //     // Auto login after register
  //     await saveAccessToken(response.data.accessToken);
  //     await saveRefreshToken(response.data.refreshToken);
  //     api.setAuthToken(response.data.accessToken);

  //     return response.data;
  //   }

  //   throw new Error(response.message || 'Register failed');
  // },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint (optional)
      await api.post('/auth/logout');
    } catch (error) {
      console.error('[AUTH API] Logout error:', error);
      // Continue logout even if API fails
    } finally {
      // Clear local storage
      await clearTokens();
      api.clearAuthToken();
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/user/profile');

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to get user');
  },

  // /**
  //  * Forgot password - Send reset email
  //  */
  // forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
  //   const response = await api.post('/auth/forgot-password', data);

  //   if (!response.success) {
  //     throw new Error(response.message || 'Forgot password failed');
  //   }
  // },

  // /**
  //  * Reset password with token
  //  */
  // resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
  //   const response = await api.post('/auth/reset-password', data);

  //   if (!response.success) {
  //     throw new Error(response.message || 'Reset password failed');
  //   }
  // },

  // /**
  //  * Change password (authenticated user)
  //  */
  // changePassword: async (data: ChangePasswordRequest): Promise<void> => {
  //   const response = await api.post('/auth/change-password', data);

  //   if (!response.success) {
  //     throw new Error(response.message || 'Change password failed');
  //   }
  // },

  // /**
  //  * Verify email with token
  //  */
  // verifyEmail: async (data: VerifyEmailRequest): Promise<void> => {
  //   const response = await api.post('/auth/verify-email', data);

  //   if (!response.success) {
  //     throw new Error(response.message || 'Email verification failed');
  //   }
  // },

  // /**
  //  * Resend verification email
  //  */
  // resendVerificationEmail: async (email: string): Promise<void> => {
  //   const response = await api.post('/auth/resend-verification', { email });

  //   if (!response.success) {
  //     throw new Error(response.message || 'Resend verification failed');
  //   }
  // },

  // /**
  //  * Refresh access token
  //  * Note: This is usually handled automatically by AxiosService interceptor
  //  */
  // refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  //   const response = await api.post<RefreshTokenResponse>('/auth/refresh-token', data);

  //   if (response.success && response.data) {
  //     return response.data;
  //   }

  //   throw new Error(response.message || 'Refresh token failed');
  // },

  // /**
  //  * Update user profile
  //  */
  // updateProfile: async (data: Partial<User>): Promise<User> => {
  //   const response = await api.put<User>('/auth/profile', data);

  //   if (response.success && response.data) {
  //     return response.data;
  //   }

  //   throw new Error(response.message || 'Update profile failed');
  // },

  // /**
  //  * Delete account
  //  */
  // deleteAccount: async (password: string): Promise<void> => {
  //   const response = await api.delete('/auth/account', {
  //     data: { password },
  //   });

  //   if (!response.success) {
  //     throw new Error(response.message || 'Delete account failed');
  //   }

  //   await clearTokens();
  //   api.clearAuthToken();
  // },
};

export default authApi;