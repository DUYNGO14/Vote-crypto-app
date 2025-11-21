import { BaseApiResponse, BasePagination } from "@stores/types";

// Daily Reward Interface
export interface DailyReward {
  day: number;
  kind: string;
  amount: number;
  label: string;
  iconUrl: string;
  isCompleted: boolean;
}

// Reward Interface
export interface QuestReward {
  kind: string;
  label?: string;
  iconUrl?: string;
  dailyRewards?: DailyReward[];
  amount?: number;
  milestone: number;
}

// Conditions Interface
export interface QuestConditions {
  kind: string;
  value: number;
  actionKey: string;
  operator: string;
  notes: string;
  currentProgress: number;
  isCompleted: boolean;
}

// Daily Attendance Record Interface
export interface DailyAttendanceRecord {
  date: string;
  isCompleted: boolean;
  completedAt: string;
  tokensReceived: number;
  notes: string;
}

// Progress Interface
export interface QuestProgress {
  continuousOnlineMaxMinutes: number;
  actionCounters: Record<string, any>;
  socialProofs: Record<string, any>;
  consecutiveDaysMap: Record<string, any>;
  lastActionDateMap: Record<string, any>;
  dailyAttendanceRecords: DailyAttendanceRecord[];
}

// Main Quest Item Interface
export interface QuestItem {
  id: string;
  name: string;
  description: string;
  conditions: QuestConditions[];
  rewards: QuestReward[];
  progress: QuestProgress;
  windowStart: string;
  windowEnd: string;
  completedAt: string | null;
  overallProgress: number;
  canStart: boolean;
  canClaim: boolean;
  timeRemaining: number;
  consecutiveDays: number;
  cycleCompletedCount: number;
  currentCycleStart: string;
  iconUrl: string;
  isClaim?: boolean;
}

// API Response Interface
export interface QuestsResponse {
  data: QuestItem[];
  meta: BasePagination;
}

// API Response Interface
export interface PerformQuestResponse {
  success: boolean;
  type: string;
  questInstanceId: string;
  attendanceDay: number;
  tokensReceived: number;
  currentStreak: number;
  totalDaysRequired: number;
  questCompleted: boolean;
  canAttendTomorrow: boolean;
  completedAt: string;
  message: string;
  data?: QuestItem;
}

// API Response Type
export type QuestsApiResponse = BaseApiResponse<QuestsResponse>;
export type PerformQuestApiResponse = BaseApiResponse<PerformQuestResponse>;
