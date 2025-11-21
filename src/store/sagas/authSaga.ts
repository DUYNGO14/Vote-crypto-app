import authApi from '@/api/auth.api';
import {
  forgotPasswordAction,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  getUserInfoAction,
  getUserInfoFailure,
  getUserInfoSuccess,
  logoutAction,
  logoutSuccess,
  registerAction,
  registerFailure,
  registerSuccess,
  resendOtpAction,
  resendOtpFailure,
  resendOtpSuccess,
  resetPasswordAction,
  resetPasswordFailure,
  resetPasswordSuccess,
  signinAction,
  signinFailure,
  signinSuccess,
  verifyEmailAction,
  verifyEmailFailure,
  verifyEmailSuccess,
} from '@/store/reducers/authSlice';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResendOtpRequest,
  User,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '@/types/auth.types';
import {clearTokens, saveUserData} from '@/utils/token';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';

// ==================== LOGIN SAGA ====================
function* loginSaga(action: PayloadAction<LoginRequest>) {
  try {
    // Step 1: Authenticate and get tokens
    const response: LoginResponse = yield call(authApi.login, action.payload);
    console.log('[SAGA] Login tokens received', response);
    // Step 2: Save tokens to storage
    yield put(signinSuccess(response));
    const user: User = yield call(authApi.getCurrentUser);
    console.log('[SAGA] User info received:', user);
    yield call(saveUserData, user);
    yield put(getUserInfoSuccess(user));
    console.log('[SAGA] Login flow completed successfully');
  } catch (error: any) {
    console.error('[SAGA] Login error:', error);
    // console.error('[SAGA] Error response:', error.response.data.message.message);
    const message =
      error?.response?.data?.message || error?.message || error?.data?.error || 'Login failed';
    console.log('[SAGA] Error message:', message.message || message);
    yield put(signinFailure(message.message || message));
    yield call(clearTokens);
  }
}

function* registerSaga(action: PayloadAction<RegisterRequest>) {
  try {
    const response: RegisterResponse = yield call(authApi.register, action.payload);
    console.log('[SAGA] Register response:', response);
    yield put(registerSuccess(response));
  } catch (error: any) {
    console.error('[SAGA] Register error:', error);
    const message = error?.response?.data?.message || error?.message || 'Register failed';
    yield put(registerFailure(message));
  }
}

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
    console.log('[SAGA] Logout completed (cleared local state)', message);
  }
}

function* verifyOTPSaga(action: PayloadAction<VerifyOtpRequest>) {
  try {
    const response: VerifyOtpResponse = yield call(authApi.verifyOtp, action.payload);
    console.log('[SAGA] Verify OTP response:', response);
    yield put(verifyEmailSuccess(response));
  } catch (error: any) {
    console.error('[SAGA] Verify OTP error:', error);
    const message = error?.response?.data?.message || error?.message || 'Verify OTP failed';
    yield put(verifyEmailFailure(message));
  }
}

function* resendOTPSaga(action: PayloadAction<ResendOtpRequest>) {
  try {
    const response: VerifyOtpResponse = yield call(authApi.resendOtp, action.payload);
    console.log('[SAGA] Resend OTP response:', response);
    yield put(resendOtpSuccess(response));
  } catch (error: any) {
    console.error('[SAGA] Resend OTP error:', error);
    const message = error?.response?.data?.message || error?.message || 'Resend OTP failed';
    yield put(resendOtpFailure(message));
  }
}

function* forgotPasswordSaga(action: PayloadAction<ForgotPasswordRequest>) {
  try {
    const response: VerifyOtpResponse = yield call(authApi.forgotPassword, action.payload);
    console.log('[SAGA] Resend OTP response:', response);
    yield put(forgotPasswordSuccess(response));
  } catch (error: any) {
    console.error('[SAGA] Resend OTP error:', error);
    const message = error?.response?.data?.message || error?.message || 'Resend OTP failed';
    yield put(forgotPasswordFailure(message));
  }
}

function* resetPasswordSaga(action: PayloadAction<ChangePasswordRequest>) {
  try {
    const response: ChangePasswordResponse = yield call(authApi.resetPassword, action.payload);
    console.log('[SAGA] Resend OTP response:', response);
    yield put(resetPasswordSuccess(response));
  } catch (error: any) {
    console.error('[SAGA] Resend OTP error:', error);
    const message = error?.response?.data?.message || error?.message || 'Resend OTP failed';
    yield put(resetPasswordFailure(message));
  }
}

// ==================== ROOT AUTH SAGA ====================
export function* authSaga() {
  yield takeLatest(signinAction.type, loginSaga);
  yield takeLatest(registerAction.type, registerSaga);
  yield takeLatest(getUserInfoAction.type, getUserInfoSaga);
  yield takeLatest(logoutAction.type, logoutSaga);
  yield takeLatest(verifyEmailAction.type, verifyOTPSaga);
  yield takeLatest(resendOtpAction.type, resendOTPSaga);
  yield takeLatest(forgotPasswordAction.type, forgotPasswordSaga);
  yield takeLatest(resetPasswordAction.type, resetPasswordSaga);
}
