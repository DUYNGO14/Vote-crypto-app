import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import authApi from '@/api/auth.api';
import {LoginRequest, LoginResponse, User} from '@/types/auth.types';
import { getUserInfoAction, getUserInfoFailure, getUserInfoSuccess, logoutAction, logoutSuccess, signinAction, signinFailure, signinSuccess } from '@/store/reducers/authSlice';

// ==================== LOGIN SAGA ====================
function* loginSaga(action: PayloadAction<LoginRequest>) {
  try {
    // Step 1: Authenticate and get tokens
    const response: LoginResponse = yield call(authApi.login, action.payload);
    console.log('[SAGA] Login tokens received');
    
    yield put(signinSuccess(response));
    
    // Step 2: Fetch user info
    const user: User = yield call(authApi.getCurrentUser);
    console.log('[SAGA] User info received:', user);
    
    yield put(getUserInfoSuccess(user));
    console.log('[SAGA] Login flow completed successfully');
  } catch (error: any) {
    console.error('[SAGA] Login error:', error);
    const message = error?.response?.data?.message || error?.message || 'Login failed';
    yield put(signinFailure(message));
  }
}

// ==================== GET USER INFO SAGA ====================
function* getUserInfoSaga() {
  try {
    const user: User = yield call(authApi.getCurrentUser);
    yield put(getUserInfoSuccess(user));
    console.log('[SAGA] User info fetched successfully');
  } catch (error: any) {
    console.error('[SAGA] Get user info error:', error);
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch user info';
    yield put(getUserInfoFailure(message));
  }
}

// ==================== LOGOUT SAGA ====================
function* logoutSaga() {
  try {
    yield call(authApi.logout);
    yield put(logoutSuccess());
    console.log('[SAGA] Logout successful');
  } catch (error: any) {
    console.error('[SAGA] Logout error:', error);
    const message = error?.response?.data?.message || error?.message || 'Logout failed';
    
    // Clear state even if API fails (important for user experience)
    yield put(logoutSuccess());
    console.log('[SAGA] Logout completed (cleared local state)');
  }
}

// ==================== ROOT AUTH SAGA ====================
export function* authSaga() {
  yield takeLatest(signinAction.type, loginSaga);
  yield takeLatest(getUserInfoAction.type, getUserInfoSaga);
  yield takeLatest(logoutAction.type, logoutSaga);
}