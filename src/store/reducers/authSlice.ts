import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginRequest, LoginResponse, User} from '@/types/auth.types';
import {LOADING_STATUS} from '@/constants/status';
import {RootState} from '@/store';

export interface AuthState {
  signin: {
    status: string;
    data: LoginResponse | null;
    error: string | null;
    params: LoginRequest | null;
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
}

const initialState: AuthState = {
  signin: {
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
  },
});

export const {
  signinAction,
  signinSuccess,
  signinFailure,
  resetSignin,
  getUserInfoAction,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUserInfo,
  logoutAction,
  logoutSuccess,
  logoutFailure,
  resetLogout,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

// ==================== SELECTORS ====================
const selectState = (state: RootState) => state.auth;

export const makeSelectSignin = createSelector(
  selectState,
  state => state.signin
);

export const selectIsAuthenticated = createSelector(
  selectState,
  state => !!state.signin.data?.accessToken && !!state.userInfo.data
);

export const selectCurrentUser = createSelector(
  selectState,
  state => state.userInfo
);

export const userLogoutSelector = createSelector(
  selectState,
  state => state.logout
);

export const selectAuthLoading = createSelector(
  selectState,
  state => 
    state.signin.status === LOADING_STATUS.LOADING ||
    state.userInfo.status === LOADING_STATUS.LOADING
);
