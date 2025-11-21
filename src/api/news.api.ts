import api from '@/api/axiosInstance';
import {NewsItem, NewsResponse} from '@/types/new.types';
import {BaseApiResponse} from '@/types/base.types';
import {newsEndpoint} from '../endpoint';
const newsApi = {
  getNewsList: async (page: string|number, limit: string|number): Promise<BaseApiResponse<NewsResponse[]>> => {
    const response = await api.get(newsEndpoint.CORE_NEWS_LIST_ENDPOINT, {
      params: {
        page,
        limit,
      },
    });
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Get news list failed');
  },
  getNewsDetail: async (newsId: string): Promise<BaseApiResponse<NewsItem>> => {
    const response = await api.get(`${newsEndpoint.CORE_NEWS_DETAIL_ENDPOINT}?newsId=${newsId}`);
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Get news detail failed');
  },
  viewNews: async (
    newsId: string,
  ): Promise<BaseApiResponse<{success: boolean; message?: string}>> => {
    const response = await api.post(
      `${newsEndpoint.CORE_NEWS_COUNT_VIEW_ENDPOINT}?newsId=${newsId}`,
    );
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'View news failed');
  },
};
export default newsApi;
