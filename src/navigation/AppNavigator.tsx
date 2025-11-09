import { useAppStyle } from '@/hooks/useAppStyles';
import AuthNavigator from '@/navigation/AuthNavigator';
import TabNavigator from '@/navigation/TabNavigator';
import { getUserInfoAction, resetSignin, selectIsAuthenticated } from '@/store/reducers/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { colors } = useAppStyle();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // hoặc AsyncStorage nếu RN
        if (token) {
          // Nếu có token, gọi API lấy thông tin user
          await dispatch(getUserInfoAction());
        } else {
          // Nếu không có token, reset signin state
          dispatch(resetSignin());
        }
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (checkingAuth) {
   return <ActivityIndicator size="large" className="flex-1 items-center justify-center" color={colors.primary} />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
