import api from '@/api/axiosInstance';
import { CheckBalanceResponse, ClaimMiningResponse, StartMiningResponse } from '@/types/mining/mining.types';
import { miningEndpoint } from '../endpoint';
import { CheckMiningResponse, LevelInfoResponse } from './../types/mining/mining.types';
import { BaseApiResponse } from '@/types/base.types';
const miningApi = {
  getBalance: async (): Promise<BaseApiResponse<CheckBalanceResponse>> => {
    const response = await api.get(
      miningEndpoint.CORE_MINING_BALANCE_ENDPOINT,
    );
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Get balance failed');
  },

  getMiningInfo: async (): Promise<BaseApiResponse<LevelInfoResponse>> => {
    const response = await api.get(
      miningEndpoint.CORE_MINING_INFO_ENDPOINT,
    );
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Get mining info failed');
  },
  checkMining: async (): Promise<BaseApiResponse<CheckMiningResponse>> => {
    const response = await api.get(
      miningEndpoint.CORE_MINING_CHECK_ENDPOINT,
    );
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Check mining failed');
  },
  startMining: async (): Promise<BaseApiResponse<StartMiningResponse>> => {
    const response = await api.post(
      miningEndpoint.CORE_MINING_START_ENDPOINT,
    );
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Start mining failed');
  },
  statusMining: async (): Promise<BaseApiResponse<CheckMiningResponse>> => {
    const response = await api.get(
      miningEndpoint.CORE_MINING_STATUS_ENDPOINT,
    );
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Start mining failed');
  },
  stopMining: async (): Promise<any> => {
    const response = await api.post<any>(
      miningEndpoint.CORE_MINING_STOP_ENDPOINT,
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Stop mining failed');
  },
  claimMining: async (): Promise<BaseApiResponse<ClaimMiningResponse>> => {
    const response = await api.post(
      miningEndpoint.CORE_MINING_CLAIM_ENDPOINT,
    );
    if (response.success && response.data) {
      return response;
    }
    throw new Error(response.message || 'Claim mining failed');
  },
  // getMiningHistory: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_HISTORY_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Get mining history failed');
  // },
  // getMiningStatus: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_STATUS_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Get mining status failed');
  // },
  // upgradeDuration: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_UPGRADE_DURATION_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Upgrade duration failed');
  // },
  // upgradeSpeed: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_UPGRADE_SPEED_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Upgrade speed failed');
  // },
  // getReferralReward: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_REFERRAL_REWARD_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Get referral reward failed');
  // },
  // getSpeedLevels: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_SPEED_LEVELS_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Get speed levels failed');
  // },
  // upgradeSpeedPackage: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_UPGRADE_SPEED_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Upgrade speed package failed');
  // },
  // getMemberships: async (): Promise<CheckMiningResponse> => {
  //   const response = await api.get<CheckMiningResponse>(
  //     miningEndpoint.CORE_MINING_MEMBERSHIPS_ENDPOINT,
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   }
  //   throw new Error(response.message || 'Get memberships failed');
  // },
};
export default miningApi;
