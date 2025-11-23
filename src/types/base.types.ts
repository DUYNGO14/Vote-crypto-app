export interface BaseApiResponse<T = any, P = any> {
  message?: string;
  status?: string;
  code?: number;
  data?: T;
  meta?: BasePagination<P>;
}

export type BasePagination<P = Record<string, never>> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
} & P;

export interface BasePaginationParams {
  page: number;
  limit: number;
  isLoadMore: boolean;
}

export interface BaseInitState<T = any> {
  status: string;
  data: T | null;
  error: string | null;
  params?: BasePaginationParams | {newsId: string}
}
