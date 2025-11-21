// src/types/auth.types.ts
export interface User {
  fullname: string;
  username: string;
  email: string;
  is_active: number;
  role: string[];
  nickname: string;
  displayName: string;
  deletedAt: string | null;
  deletedBy: string | null;
  is_verify: boolean;
  ref_code: string;
  invited_by: string | null;
  user_agent: string;
  ip_address: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  birthdate: string;
  cover: string;
  gender: string;
  phone: string;
  id: string;
}
export interface LoginRequest {
  username: string;
  password: string;
  recaptcha?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  fullname?: string;
  username: string;
  displayName: string;
  nickname?: string;
  password: string;
  referralCode?: string;
  recaptcha: string;
}

export interface RegisterResponse {
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  purpose: string;
  recaptcha: string;
}

export interface VerifyOtpResponse {
  message?: string;
  email?: string;
}

export interface ResendOtpRequest {
  email: string;
  purpose: string;
  recaptcha: string;
}

export interface ForgotPasswordRequest {
  email: string;
  recaptcha: string;
}
export interface ChangePasswordRequest {
  email: string;
  newPassword: string;
  recaptcha: string;
}

export interface ChangePasswordResponse {
  message: string;
}
