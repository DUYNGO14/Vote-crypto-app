import { BaseApiResponse, BasePagination } from "@stores/types";

export const TREASURE_STATUS = {
  CLAIMED: "CLAIMED",
  CLAIMABLE: "CLAIMABLE",
};

interface Reward {
  kind: string;
  amount: number;
  label: string;
  iconUrl: string;
}

export interface TreasureItem {
  id: string;
  questTemplateId: string;
  questInstanceId: string;
  questName: string;
  rewards: Reward[];
  status: (typeof TREASURE_STATUS)[keyof typeof TREASURE_STATUS];
  createdAt: string;
  canClaim: boolean;
}

export interface TreasureResponse {
  data: TreasureItem[];
  meta: BasePagination;
}

export type TreasureApiResponse = BaseApiResponse<TreasureResponse>;
