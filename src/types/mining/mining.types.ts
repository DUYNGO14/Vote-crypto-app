export interface CheckMiningResponse {
  isMining: boolean;
  sessionStartTime: string | null;
  canClaim: boolean;
  claimIntervalHours: number;
  claimRemaining: number;
  currentSessionClaims: number;
  currentSessionTokens: number;
  sessionTokensEarnable: number;
  remainingCycles: number;
  lastClaimAmount: number;
  lastClaimTime: string | null;
  maxClaimsPerSession: number;
  maxCyclesPerDay: number;
  minClaimAmount: number;
  nextClaimTime: string | null;
  dailyMiningSessions: number;
  sessionEndTime: string | null;
  sessionDurationHours: number | null;
  timeElapsed: number | null;
  timeRemaining: number | null;
  progress: number;
  speedLevel: number;
  speedBonusPercentage: number;
  speedMultiplier: number;
  durationLevel: number;
  unclaimedBalance: number;
  id_src: string;
  totalUnclaimedBalance: number;
  id: number | null;
  tokensPerSecond: number;
}

export interface CheckBalanceResponse {
  currentBalance: number;
  totalEarned: number;
  totalClaimed: number;
  lastClaimTime: string;
  lastMiningTime: string;
  totalUnclaimed: number;
  amount: number;
}

export interface MiningHistoryResponse {
  miningHistory: MiningHistoryItem[];
}

export interface MiningHistoryItem {
  id: string;
  claimTime: string;
  dailyMiningSessions: number;
  cyclesPerDay: number;
  durationLevel: number;
  durationHours: number;
  tokensEarned: number;
  claimsPerSession: number;
  speedLevel: number;
  speedBonusPercentage: number;
  speedMultiplier: number;
  isClaimed: boolean;
  claimsInSession: number;
  lastClaimAmount: number;
  lastClaimTime: string;
  totalClaimedInSession: number;
  sessionCompletedAt: string;
  totalSessionTokens: number;
  amount: number;
  type: string;
}

export interface Package {
  activationFee: number;
  benefits: null;
  code: number;
  durationDays: number;
  expiresAt: string;
  hpBonus: number;
  hpFromThis: number;
  id: string;
  multiplier: number;
  name: string;
  transactionId: string;
  type: string;
}

export interface LevelInfoResponse {
  userId: string;
  isMining: boolean;
  unclaimedBalance: number;
  lastClaimTime: string;
  balance: CheckBalanceResponse;
  currentSession: number;
  dailyLimit: {
    currentSession: number;
    maxSessions: number;
    remainingSessions: number;
    lastMiningDate: string;
  };
  boosts: {
    speed: {
      current: number;
      hpBonus: number;
      multiplier: number;
      upgradeCost: number;
      code: string;
      expiresAt: string | null;
      next: {
        level: number;
        hpBonus: number;
        multiplier: number;
        upgradeCost: number;
        code: string;
      };
    };
  };
  membershipPackages: {
    packages: Package[];
  };
  totalHashpower: {
    total: number;
    breakdown: {
      baseHP: number;
      boostHP: number;
      nftMembershipHP: number;
    };
  };
}

export interface LevelItemResponse {
  level: number;
  speedBonusPercentage: number;
  multiplier: number;
  upgradeCost: number;
  countdownDuration: number;
}

export interface UpgradeLevelResponse {
  oldLevel: number;
  newLevel: number;
  upgradeCost: number;
  remainingBalance: number;
  newSpeedBonusPercentage: number;
  newSpeedMultiplier: number;
  effectiveFromNextSession: number;
  transactionId: string;
  activityLogId: string;
}

export type NFTMembershipCode = 'COPPER' | 'SILVER' | 'GOLD' | 'DIAMOND';

export interface NFTMembershipResponse {
  id: string;
  name: string;
  activationFee: number;
  hpBonus: number;
  code: NFTMembershipCode | number;
  type: string;
  durationDays?: number;
  benefits?: string[];
  isOwned?: boolean;
  expiresAt?: string | null;
  multiplier?: number | null;
  discountedPrice: number;
  discountPercent: number;
  currency?: string;
}

export interface StartMiningResponse {
  dailyMiningSessions: number;
  durationLevel: number;
  id: string;
  isMining: boolean;
  maxCyclesPerDay: number;
  refBoostPercentage: number;
  remainingCycles: number;
  sessionDurationHours: number;
  sessionStartTime: string;
  sessionTokensEarnable: number;
  speedBonusPercentage: number;
  speedMultiplier: number;
  activePackages: ActivePackages[]
}

export interface ActivePackages {
  expireAt: string;
  hpBonus: number;
  packageCode: number;
  packageType: string;
  transactionId: string;
  txnCode: string;
}


export interface ClaimMiningResponse {
  breakdown: {
    fromCurrentSession: number;
    fromPreviousSessions: number;
  };
  claimTime: string;
  claimedAmount: number;
  currentBalance: number;
  sessionCount: number;
  totalClaimed: number;
  totalMining: number;
  totalUnclaimed: number;
  unclaimedBalance: number;
}