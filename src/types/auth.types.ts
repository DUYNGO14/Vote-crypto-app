// src/types/auth.types.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  deletedAt: string;
  deletedBy: string;
  invited_by: string;
  fullname: string;
  username: string;
  role: any;
  createdAt: string;
  updatedAt: string;
  is_verify: true;
  avatar: string;
  birthdate: string;
  cover: string;
  email: string;
  gender: string;
  phone: string;
  ref_code: string;
  is_active: number;
  id: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
