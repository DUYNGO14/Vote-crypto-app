export interface ImageResponse {
  fileName: string;
  mimeType: string;
  originalName: string;
  path: string;
  source: string;
  size: number;
  url: string;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
}
export interface NewsItem {
  cover: ImageResponse;
  hashTags: string[];
  owner: string;
  viewCount: number;
  isHot: boolean;
  status: string;
  publishAt: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  lang: string;
  title: string;
  slug: string;
  shortDesc: string;
  content: string;
}

export interface NewsResponse {
  items: NewsItem[];
  page: number;
  total: number;
  limit: number;
}
