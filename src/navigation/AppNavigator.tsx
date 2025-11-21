import { useAppStyle } from '@/hooks/useAppStyles';
import AuthNavigator from '@/navigation/AuthNavigator';
import TabNavigator from '@/navigation/TabNavigator';
import { RootState } from '@/store';
import { getUserInfoAction, resetSignin, signinSuccess } from '@/store/reducers/authSlice';
import { getAccessToken, getRefreshToken } from '@/utils/token';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { colors } = useAppStyle();

  // null = đang kiểm tra token
  // true = có token → đã login trước đó
  // false = chưa login
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const refreshToken = await getRefreshToken();

        if (refreshToken) {
          setHasToken(true);

          // Đồng bộ Redux
          const accessToken = await getAccessToken();
          dispatch(
            signinSuccess({
              accessToken: accessToken || '',
              refreshToken,
            })
          );

          // Lấy user info
          dispatch(getUserInfoAction());
        } else {
          setHasToken(false);
          dispatch(resetSignin());
        }
      } catch (err) {
        console.log('Auth check error:', err);
        setHasToken(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Loading trong lúc check token
  if (hasToken === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {hasToken ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
