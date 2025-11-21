import { BaseApiResponse } from "@stores/types";

// API Response types
export interface RankingItem {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  fullname: string;
  nickname: string;
  displayName: string;
  totalMining: number;
}

export type RankingApiResponse = BaseApiResponse<RankingItem[]>;
