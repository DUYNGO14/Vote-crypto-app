import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/token';
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
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}

// Thêm hàm mới để lưu và đọc user data
export const saveUserData = async (userData: any) => {
  await AsyncStorage.setItem('userData', JSON.stringify(userData));
};

export const getUserData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};