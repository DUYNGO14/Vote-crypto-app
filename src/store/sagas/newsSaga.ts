import newsApi from '@/api/news.api';
import { newsDetailAction, newsDetailFailure, newsDetailSuccess, newsListAction, newsListFailure, newsListSuccess } from '@/store/reducers/newsSlice';
import { BaseApiResponse, BasePaginationParams } from '@/types/base.types';
import { NewsItem } from '@/types/new.types';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getNewsListSaga(
  action: PayloadAction<BasePaginationParams>,
): Generator<unknown, void, BaseApiResponse<NewsItem[]>> {
  const { page, limit } = action.payload;
  
  try {
    const response = (yield call(
      newsApi.getNewsList,
      page,
      limit
    )) as BaseApiResponse<NewsItem[]>;

    if (response.code === 200 && response.data) {
      yield put(newsListSuccess({
        items: response.data,
        page: Number(page),
        limit: Number(limit),
        total: response.meta?.total || 0
      }));
    } else {
      throw new Error(response.message || 'Failed to fetch news list');
    }
  } catch (error: any) {
    console.error('[SAGA] Get news list error:', error);
    const message = error?.response?.data?.message || 
                   error?.message || 
                   'Failed to fetch news list. Please try again later.';
    yield put(newsListFailure(message));
  }
}

function* getNewsDetailSaga(
  action: PayloadAction<{newsId: string}>,
): Generator<unknown, void, BaseApiResponse<NewsItem>> {
  const { newsId } = action.payload;
  
  try {
    const response = (yield call(
      newsApi.getNewsDetail,
      newsId
    )) as BaseApiResponse<NewsItem>;

    if (response.code === 200 && response.data) {
      yield put(newsDetailSuccess(response.data));
    } else {
      throw new Error(response.message || 'Failed to fetch news detail');
    }
  } catch (error: any) {
    console.error('[SAGA] Get news detail error:', error);
    const message = error?.response?.data?.message || 
                   error?.message || 
                   'Failed to fetch news detail. Please try again later.';
    yield put(newsDetailFailure(message));
  }
}

export function* newsSaga() {
  yield takeLatest(newsListAction.type, getNewsListSaga);
  yield takeLatest(newsDetailAction.type, getNewsDetailSaga);
}