import miningApi from '@/api/mining.api';
import {
  claimMiningAction,
  claimMiningFailure,
  claimMiningSuccess,
  getBalanceAction,
  getBalanceFailure,
  getBalanceSuccess,
  getMiningInfoAction,
  getMiningInfoFailure,
  getMiningInfoSuccess,
  startMiningAction,
  startMiningFailure,
  startMiningSuccess,
  statusMiningAction,
  statusMiningFailure,
  statusMiningSuccess
} from '@/store/reducers/miningSlice';
import { BaseApiResponse } from '@/types/base.types';
import {
  CheckBalanceResponse,
  CheckMiningResponse,
  ClaimMiningResponse,
  LevelInfoResponse,
  StartMiningResponse,
} from '@/types/mining/mining.types';
import { call, put, takeLatest } from 'redux-saga/effects';
function* getBalanceSaga(): Generator<unknown, void, BaseApiResponse<CheckBalanceResponse>> {
  try {
    const response: BaseApiResponse<CheckBalanceResponse> = yield call(miningApi.getBalance);
    if (response.code == 200) {
      yield put(getBalanceSuccess(response.data!));
    } else {
      yield put(getBalanceFailure(response.message!));
    }
  } catch (error: any) {
    console.error('[SAGA] Get user info error:', error);
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch user info';
    yield put(getBalanceFailure(message));
  }
}

function* getMiningInfoSaga(): Generator<unknown, void, BaseApiResponse<LevelInfoResponse>> {
  try {
    const response: BaseApiResponse<LevelInfoResponse> = yield call(miningApi.getMiningInfo);
    if (response.code == 200) {
      yield put(getMiningInfoSuccess(response.data!));
    } else {
      yield put(getMiningInfoFailure(response.message!));
    }
  } catch (error: any) {
    console.error('[SAGA] Get user info error:', error);
    const message =
      error?.response?.data?.message || error?.message || 'Failed to fetch mining info';
    yield put(getMiningInfoFailure(message));
  }
}

// function* checkMiningSaga(): Generator<unknown, void, BaseApiResponse<CheckMiningResponse>> {
//   try {
//     const response: BaseApiResponse<CheckMiningResponse> = yield call(miningApi.checkMining);
//     if (response.code == 200) {
//       yield put(checkMiningSuccess(response.data!));
//     } else {
//       yield put(checkMiningFailure(response.message!));
//     }
//   } catch (error: any) {
//     console.error('[SAGA] Get check mining error:', error);
//     const message =
//       error?.response?.data?.message || error?.message || 'Failed to fetch check mining';
//     yield put(checkMiningFailure(message));
//   }
// }

function* statusMiningSaga(): Generator<unknown, void, BaseApiResponse<CheckMiningResponse>> {
  try {
    const response: BaseApiResponse<CheckMiningResponse> = yield call(miningApi.statusMining);
    console.log("[SAGA] STATUS MINING", response)
    if (response.code == 200) {
      yield put(statusMiningSuccess(response.data!));
    } else {
      yield put(statusMiningFailure(response.message!));
    }
  } catch (error: any) {
    console.error('[SAGA] Get user info error:', error);
    const message =
      error?.response?.data?.message || error?.message || 'Failed to fetch status mining';
    yield put(statusMiningFailure(message));
  }
}
function* startMiningSaga(): Generator<unknown, void, BaseApiResponse<StartMiningResponse>> {
  try {
    const response: BaseApiResponse<StartMiningResponse> = yield call(miningApi.startMining);
    console.log('[SAGA]RESPONSE SAGA START MINING', response);
    if (response.code == 200) {
      yield put(startMiningSuccess(response.data!));
    } else {
      yield put(startMiningFailure(response.message!));
    }
  } catch (error: any) {
    console.error('[SAGA] Post start mining error:', error);
    const message =
      error?.response?.data?.message || error?.message || 'Failed to fetch start mining';
    yield put(startMiningFailure(message));
  }
}

function* claimMiningSaga(): Generator<unknown, void, BaseApiResponse<ClaimMiningResponse>> {
  try {
    const response: BaseApiResponse<ClaimMiningResponse> = yield call(miningApi.claimMining);
    console.log('[SAGA]RESPONSE SAGA CLAIM MINING', response);
    if (response.code == 200) {
      yield put(claimMiningSuccess(response.data!));
    } else {
      yield put(claimMiningFailure(response.message!));
    }
  } catch (error: any) {
    console.error('[SAGA] Post claim mining error:', error);
    const message =
      error?.response?.data?.message || error?.message || 'Failed to fetch claim mining';
    yield put(claimMiningFailure(message));
  }
}

export function* miningSaga() {
  yield takeLatest(getBalanceAction, getBalanceSaga);
  yield takeLatest(getMiningInfoAction, getMiningInfoSaga);
  // yield takeLatest(checkMiningAction, checkMiningSaga);
  yield takeLatest(startMiningAction, startMiningSaga);
  yield takeLatest(claimMiningAction, claimMiningSaga);
  yield takeLatest(statusMiningAction, statusMiningSaga);
}
