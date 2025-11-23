import {LOADING_STATUS} from '@/constants/status';
import {RootState} from '@/store';
import {BaseInitState, BasePagination, BasePaginationParams} from '@/types/base.types';
import {NewsItem, NewsResponse} from '@/types/new.types';
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NewsState {
  newsList: BaseInitState<{items: NewsItem[]; meta: BasePagination} | null>;
  newsDetail: BaseInitState<NewsItem | null>;
  viewerCount: BaseInitState<{success: boolean; message?: string} | null>;
}

const initialState: NewsState = {
  newsList: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: {page: 1, limit: 20, isLoadMore: false},
  },
  newsDetail: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: {newsId: ''},
  },
  viewerCount: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: {newsId: ''},
  },
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    newsListAction: (state, action: PayloadAction<BasePaginationParams>) => {
      state.newsList.status = LOADING_STATUS.LOADING;
      state.newsList.error = null;
      state.newsList.params = action.payload;
    },
    newsListSuccess: (state, action: PayloadAction<NewsResponse>) => {
      state.newsList.status = LOADING_STATUS.SUCCESS;
      state.newsList.error = null;

      const currentItems = state.newsList.data?.items || [];
      const newItems = action.payload.items || [];
      console.log("PARAM", state.newsList.params)
      // Type guard to check if params is BasePaginationParams
      const isPaginationParams = (params: any): params is BasePaginationParams => {
        return params && 'page' in params && 'limit' in params;
      };

      state.newsList.data = {
        items: (isPaginationParams(state.newsList.params) && state.newsList.params.isLoadMore)
          ? [...currentItems, ...newItems] // Append new items when loading more
          : newItems, // Replace items when refreshing or first load
        meta: {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: Math.ceil(action.payload.total / action.payload.limit),
        } as BasePagination,
      };
    },
    newsListFailure: (state, action: PayloadAction<string>) => {
      state.newsList.status = LOADING_STATUS.ERROR;
      state.newsList.error = action.payload;
      state.newsList.data = null;
    },
    newsDetailAction: (state, action: PayloadAction<{newsId: string}>) => {
      state.newsDetail.status = LOADING_STATUS.LOADING;
      state.newsDetail.error = null;
      state.newsDetail.params = action.payload;
    },
    newsDetailSuccess: (state, action: PayloadAction<NewsItem>) => {
      state.newsDetail.status = LOADING_STATUS.SUCCESS;
      state.newsDetail.error = null;
      state.newsDetail.data = action.payload;
    },
    newsDetailFailure: (state, action: PayloadAction<string>) => {
      state.newsDetail.status = LOADING_STATUS.ERROR;
      state.newsDetail.error = action.payload;
      state.newsDetail.data = null;
    },
    viewerCountAction: (state, action: PayloadAction<{newsId: string}>) => {
      state.viewerCount.status = LOADING_STATUS.LOADING;
      state.viewerCount.error = null;
      state.viewerCount.params = action.payload;
    },
    viewerCountSuccess: (state, action: PayloadAction<{success: boolean; message?: string}>) => {
      state.viewerCount.status = LOADING_STATUS.SUCCESS;
      state.viewerCount.error = null;
      state.viewerCount.data = action.payload;
    },
    viewerCountFailure: (state, action: PayloadAction<string>) => {
      state.viewerCount.status = LOADING_STATUS.ERROR;
      state.viewerCount.error = action.payload;
      state.viewerCount.data = null;
    },
  },
});

export const newsReducer = newsSlice.reducer;

export const {
  newsListAction,
  newsListSuccess,
  newsListFailure,
  newsDetailAction,
  newsDetailSuccess,
  newsDetailFailure,
  viewerCountAction,
  viewerCountSuccess,
  viewerCountFailure,
} = newsSlice.actions;

export const selectNews = (state: RootState) => state.news;
export const makeSelectNewsList = createSelector(selectNews, state => state.newsList);
export const makeSelectNewsDetail = createSelector(selectNews, state => state.newsDetail);
export const makeSelectViewerCount = createSelector(selectNews, state => state.viewerCount);
