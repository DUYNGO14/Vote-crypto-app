import {LOADING_STATUS} from '@/constants/status';
import {RootState} from '@/store';
import {
  CheckBalanceResponse,
  CheckMiningResponse,
  LevelInfoResponse,
  StartMiningResponse,
} from '@/types/mining/mining.types';
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface MiningState {
  balance: {
    status: string;
    data: CheckBalanceResponse | null | undefined;
    error: string | null;
  };
  miningInfo: {
    status: string;
    data: LevelInfoResponse | null;
    error: string | null;
  };
  checkMining: {
    status: string;
    data: CheckMiningResponse | null;
    error: string | null;
  };
  startMining: {
    status: string;
    data: StartMiningResponse | null;
    error: string | null;
  };
  claimMining: {
    status: string;
    data: any;
    error: string | null;
  };
  statusMining: {
    status: string;
    data: CheckMiningResponse | null;
    error: string | null;
  };
}

const initialState: MiningState = {
  balance: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
  },
  miningInfo: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
  },
  checkMining: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
  },
  startMining: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
  },
  claimMining: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
  },
  statusMining: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
  },
};

export const miningSlice = createSlice({
  name: 'mining',
  initialState,
  reducers: {
    getBalanceAction: state => {
      state.balance.status = LOADING_STATUS.LOADING;
      state.balance.error = null;
    },
    getBalanceSuccess: (state, action: PayloadAction<CheckBalanceResponse>) => {
      state.balance.status = LOADING_STATUS.SUCCESS;
      state.balance.data = action.payload;
      state.balance.error = null;
    },
    getBalanceFailure: (state, action: PayloadAction<string>) => {
      state.balance.status = LOADING_STATUS.ERROR;
      state.balance.error = action.payload;
      state.balance.data = null;
    },
    resetBalance: state => {
      state.balance.status = LOADING_STATUS.IDLE;
      state.balance.data = null;
      state.balance.error = null;
    },
    getMiningInfoAction: state => {
      state.miningInfo.status = LOADING_STATUS.LOADING;
      state.miningInfo.error = null;
    },
    getMiningInfoSuccess: (state, action: PayloadAction<LevelInfoResponse>) => {
      state.miningInfo.status = LOADING_STATUS.SUCCESS;
      state.miningInfo.data = action.payload;
      state.miningInfo.error = null;
    },
    getMiningInfoFailure: (state, action: PayloadAction<string>) => {
      state.miningInfo.status = LOADING_STATUS.ERROR;
      state.miningInfo.error = action.payload;
      state.miningInfo.data = null;
    },
    resetMiningInfo: state => {
      state.miningInfo.status = LOADING_STATUS.IDLE;
      state.miningInfo.data = null;
      state.miningInfo.error = null;
    },
    checkMiningAction: state => {
      state.checkMining.status = LOADING_STATUS.LOADING;
      state.checkMining.error = null;
    },
    checkMiningSuccess: (state, action: PayloadAction<CheckMiningResponse>) => {
      state.checkMining.status = LOADING_STATUS.SUCCESS;
      state.checkMining.data = action.payload;
      state.checkMining.error = null;
    },
    checkMiningFailure: (state, action: PayloadAction<string>) => {
      state.checkMining.status = LOADING_STATUS.ERROR;
      state.checkMining.error = action.payload;
      state.checkMining.data = null;
    },
    resetCheckMining: state => {
      state.checkMining.status = LOADING_STATUS.IDLE;
      state.checkMining.data = null;
      state.checkMining.error = null;
    },
    statusMiningAction: state => {
      state.statusMining.status = LOADING_STATUS.LOADING;
      state.statusMining.error = null;
    },
    statusMiningSuccess: (state, action: PayloadAction<CheckMiningResponse>) => {
      state.statusMining.status = LOADING_STATUS.SUCCESS;
      state.statusMining.data = action.payload;
      state.statusMining.error = null;
    },
    statusMiningFailure: (state, action: PayloadAction<string>) => {
      state.statusMining.status = LOADING_STATUS.ERROR;
      state.statusMining.error = action.payload;
      state.statusMining.data = null;
    },
    resetStatusMining: state => {
      state.statusMining.status = LOADING_STATUS.IDLE;
      state.statusMining.data = null;
      state.statusMining.error = null;
    },
    startMiningAction: state => {
      state.startMining.status = LOADING_STATUS.LOADING;
      state.startMining.error = null;
    },
    startMiningSuccess: (state, action: PayloadAction<any>) => {
      state.startMining.status = LOADING_STATUS.SUCCESS;
      state.startMining.data = action.payload;
      state.startMining.error = null;
    },
    startMiningFailure: (state, action: PayloadAction<string>) => {
      state.startMining.status = LOADING_STATUS.ERROR;
      state.startMining.error = action.payload;
      state.startMining.data = null;
    },
    resetStartMining: state => {
      state.startMining.status = LOADING_STATUS.IDLE;
      state.startMining.data = null;
      state.startMining.error = null;
    },
    claimMiningAction: state => {
      state.claimMining.status = LOADING_STATUS.LOADING;
      state.claimMining.error = null;
    },
    claimMiningSuccess: (state, action: PayloadAction<any>) => {
      state.claimMining.status = LOADING_STATUS.SUCCESS;
      state.claimMining.data = action.payload;
      state.claimMining.error = null;
    },
    claimMiningFailure: (state, action: PayloadAction<string>) => {
      state.claimMining.status = LOADING_STATUS.ERROR;
      state.claimMining.error = action.payload;
      state.claimMining.data = null;
    },
    resetClaimMining: state => {
      state.claimMining.status = LOADING_STATUS.IDLE;
      state.claimMining.data = null;
      state.claimMining.error = null;
    },
  },
});

export const {
  getBalanceAction,
  getBalanceSuccess,
  getBalanceFailure,
  resetBalance,
  getMiningInfoAction,
  getMiningInfoSuccess,
  getMiningInfoFailure,
  resetMiningInfo,
  checkMiningAction,
  checkMiningSuccess,
  checkMiningFailure,
  resetCheckMining,
  startMiningAction,
  startMiningSuccess,
  startMiningFailure,
  resetStartMining,
  claimMiningAction,
  claimMiningSuccess,
  claimMiningFailure,
  resetClaimMining,
  statusMiningAction,
  statusMiningSuccess,
  statusMiningFailure,
  resetStatusMining,
} = miningSlice.actions;

export const miningReducer = miningSlice.reducer;

export const selectMining = (state: RootState) => state.mining;

export const makeSelectBalance = createSelector(selectMining, state => state.balance);

export const makeSelectMiningInfo = createSelector(selectMining, state => state.miningInfo);

export const makeSelectCheckMining = createSelector(selectMining, state => state.checkMining);

export const makeSelectStartMining = createSelector(selectMining, state => state.startMining);

export const makeSelectClaimMining = createSelector(selectMining, state => state.claimMining);

export const makeSelectStatusMining = createSelector(selectMining, state => state.statusMining);
