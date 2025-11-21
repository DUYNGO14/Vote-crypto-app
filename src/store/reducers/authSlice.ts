import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
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
import {LOADING_STATUS} from '@/constants/status';
import {RootState} from '@/store';

export interface AuthState {
  signin: {
    status: string;
    data: LoginResponse | null;
    error: string | null;
    params: LoginRequest | null;
  };
  register: {
    status: string;
    data: RegisterResponse | null;
    error: string | null;
    params: RegisterRequest | null;
  };
  verifyOtp: {
    status: string;
    data: VerifyOtpResponse | null;
    error: string | null;
    params: VerifyOtpRequest | null;
  };
  userInfo: {
    status: string;
    data: User | null;
    error: string | null;
    params: any;
  };
  logout: {
    status: string;
    error: string | null;
  };
  resendOtp: {
    status: string;
    data: VerifyOtpResponse | null;
    error: string | null;
    params: ResendOtpRequest | null;
  };
  forgotPassword: {
    status: string;
    data: VerifyOtpResponse | null;
    error: string | null;
    params: ForgotPasswordRequest | null;
  };
  resetPassword: {
    status: string;
    data: VerifyOtpResponse | null;
    error: string | null;
    params: ChangePasswordRequest | null;
  };
}

const initialState: AuthState = {
  signin: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: null,
  },
  register: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: null,
  },
  verifyOtp: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: null,
  },
  userInfo: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: null,
  },
  logout: {
    status: LOADING_STATUS.IDLE,
    error: null,
  },
  resendOtp: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: null,
  },
  forgotPassword: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: null,
  },
  resetPassword: {
    status: LOADING_STATUS.IDLE,
    data: null,
    error: null,
    params: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ==================== LOGIN ====================
    signinAction: (state, action: PayloadAction<LoginRequest>) => {
      state.signin.status = LOADING_STATUS.LOADING;
      state.signin.error = null;
      state.signin.params = action.payload;
    },
    signinSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.signin.status = LOADING_STATUS.SUCCESS;
      state.signin.data = action.payload;
      state.signin.error = null;
    },
    signinFailure: (state, action: PayloadAction<string>) => {
      state.signin.status = LOADING_STATUS.ERROR;
      state.signin.error = action.payload;
      state.signin.data = null;
    },
    resetSignin: state => {
      state.signin = initialState.signin;
    },

    // ==================== REGISTER ====================
    registerAction: (state, action: PayloadAction<RegisterRequest>) => {
      state.register.status = LOADING_STATUS.LOADING;
      state.register.error = null;
      state.register.params = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<RegisterResponse>) => {
      state.register.status = LOADING_STATUS.SUCCESS;
      state.register.data = action.payload;
      state.register.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.register.status = LOADING_STATUS.ERROR;
      state.register.error = action.payload;
      state.register.data = null;
    },
    resetRegister: state => {
      state.register = initialState.register;
    },

    // ==================== USER INFO ====================
    getUserInfoAction: state => {
      state.userInfo.status = LOADING_STATUS.LOADING;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action: PayloadAction<User>) => {
      state.userInfo.status = LOADING_STATUS.SUCCESS;
      state.userInfo.data = action.payload;
      state.userInfo.error = null;
    },
    getUserInfoFailure: (state, action: PayloadAction<string>) => {
      state.userInfo.status = LOADING_STATUS.ERROR;
      state.userInfo.error = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.userInfo.data) {
        state.userInfo.data = {
          ...state.userInfo.data,
          ...action.payload,
        };
      }
    },

    // ==================== LOGOUT ====================
    logoutAction: state => {
      state.logout.status = LOADING_STATUS.LOADING;
      state.logout.error = null;
    },
    logoutSuccess: state => {
      state.logout.status = LOADING_STATUS.SUCCESS;
      // Clear all auth data
      state.signin.data = null;
      state.userInfo.data = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.logout.status = LOADING_STATUS.ERROR;
      state.logout.error = action.payload;
    },
    resetLogout: state => {
      state.logout = initialState.logout;
    },
    // ==================== VERIFY EMAIL ====================
    verifyEmailAction: (state, action: PayloadAction<VerifyOtpRequest>) => {
      state.verifyOtp.status = LOADING_STATUS.LOADING;
      state.verifyOtp.error = null;
      state.verifyOtp.params = action.payload;
    },
    verifyEmailSuccess: (state, action: PayloadAction<VerifyOtpResponse>) => {
      state.verifyOtp.status = LOADING_STATUS.SUCCESS;
      state.verifyOtp.data = action.payload;
      state.verifyOtp.error = null;
    },
    verifyEmailFailure: (state, action: PayloadAction<string>) => {
      state.verifyOtp.status = LOADING_STATUS.ERROR;
      state.verifyOtp.error = action.payload;
      state.verifyOtp.data = null;
    },
    resetVerifyEmail: state => {
      state.verifyOtp = initialState.verifyOtp;
    },
    // ==================== RESEND OTP ====================
    resendOtpAction: (state, action: PayloadAction<ResendOtpRequest>) => {
      state.resendOtp.status = LOADING_STATUS.LOADING;
      state.resendOtp.error = null;
      state.resendOtp.params = action.payload;
    },
    resendOtpSuccess: (state, action: PayloadAction<VerifyOtpResponse>) => {
      state.resendOtp.status = LOADING_STATUS.SUCCESS;
      state.resendOtp.data = action.payload;
      state.resendOtp.error = null;
    },
    resendOtpFailure: (state, action: PayloadAction<string>) => {
      state.resendOtp.status = LOADING_STATUS.ERROR;
      state.resendOtp.error = action.payload;
      state.resendOtp.data = null;
    },
    resetResendOtp: state => {
      state.resendOtp = initialState.resendOtp;
    },
    // ==================== FORGOT PASSWORD ====================
    forgotPasswordAction: (state, action: PayloadAction<ForgotPasswordRequest>) => {
      state.forgotPassword.status = LOADING_STATUS.LOADING;
      state.forgotPassword.error = null;
      state.forgotPassword.params = action.payload;
    },
    forgotPasswordSuccess: (state, action: PayloadAction<VerifyOtpResponse>) => {
      state.forgotPassword.status = LOADING_STATUS.SUCCESS;
      state.forgotPassword.data = action.payload;
      state.forgotPassword.error = null;
    },
    forgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.forgotPassword.status = LOADING_STATUS.ERROR;
      state.forgotPassword.error = action.payload;
      state.forgotPassword.data = null;
    },
    resetForgotPassword: state => {
      state.forgotPassword = initialState.forgotPassword;
    },
    // ==================== RESET PASSWORD ====================
    resetPasswordAction: (state, action: PayloadAction<ChangePasswordRequest>) => {
      state.resetPassword.status = LOADING_STATUS.LOADING;
      state.resetPassword.error = null;
      state.resetPassword.params = action.payload;
    },
    resetPasswordSuccess: (state, action: PayloadAction<ChangePasswordResponse>) => {
      state.resetPassword.status = LOADING_STATUS.SUCCESS;
      state.resetPassword.data = action.payload;
      state.resetPassword.error = null;
    },
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.resetPassword.status = LOADING_STATUS.ERROR;
      state.resetPassword.error = action.payload;
      state.resetPassword.data = null;
    },
    resetResetPassword: state => {
      state.resetPassword = initialState.resetPassword;
    },
  },
});

export const {
  signinAction,
  signinSuccess,
  signinFailure,
  resetSignin,
  registerAction,
  registerSuccess,
  registerFailure,
  resetRegister,
  getUserInfoAction,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUserInfo,
  logoutAction,
  logoutSuccess,
  logoutFailure,
  resetLogout,
  verifyEmailAction,
  verifyEmailSuccess,
  verifyEmailFailure,
  resetVerifyEmail,
  resendOtpAction,
  resendOtpSuccess,
  resendOtpFailure,
  resetResendOtp,
  forgotPasswordAction,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetForgotPassword,
  resetPasswordAction,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetResetPassword,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

// ==================== SELECTORS ====================
const selectState = (state: RootState) => state.auth;

export const makeSelectSignin = createSelector(selectState, state => state.signin);

export const makeSelectRegister = createSelector(selectState, state => state.register);

export const selectCurrentUser = createSelector(selectState, state => state.userInfo);

export const userLogoutSelector = createSelector(selectState, state => state.logout);

export const selectAuthLoading = createSelector(
  selectState,
  state =>
    state.signin.status === LOADING_STATUS.LOADING ||
    state.userInfo.status === LOADING_STATUS.LOADING,
);

export const selectVerifyEmail = createSelector(selectState, state => state.verifyOtp);

export const selectResendOtp = createSelector(selectState, state => state.resendOtp);

export const selectForgotPassword = createSelector(selectState, state => state.forgotPassword);

export const selectResetPassword = createSelector(selectState, state => state.resetPassword);