import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY } from '@/constants/token';
import { User } from '@/types/auth.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}
export async function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
}
export async function saveAccessToken(token: string) {
  return AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}
export async function saveRefreshToken(token: string) {
  return AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
}
export async function clearTokens() {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY]);
}

// Thêm hàm mới để lưu và đọc user data
export const saveUserData = async (userData: User) => {
  await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

export const getUserData = async () => {
  const userData = await AsyncStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};