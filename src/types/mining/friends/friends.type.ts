import { BaseApiResponse, BasePagination } from "@stores/types";

export type FriendsItem = {
  id: string;
  username: string;
  fullname: string;
  displayName: string;
  balance: {
    currentBalance: number;
    totalClaimed: number;
    totalUnclaimed: number;
  };
};

export interface FriendsResponse {
  data: FriendsItem[];
  meta: BasePagination;
}

export type FriendsApiResponse = BaseApiResponse<FriendsResponse>;

// Friend Requests

export interface ReferralItem {
  userInfo: {
    id: string;
    fullname: string;
    nickname: string;
    displayName: string;
    username: string;
    is_active: number;
    is_verify: boolean;
  };
  tokenReward: number;
  completedDate: string;
}

export interface FriendRequestItem {
  totalReferrals: number;
  totalTokenReward: number;
  referrals: ReferralItem[];
}

export interface FriendRequestsResponse {
  data: FriendRequestItem[];
  meta: BasePagination;
}

export type FriendRequestsApiResponse = BaseApiResponse<FriendRequestsResponse>;
