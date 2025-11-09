import { AuthStackParamList } from '@/navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={React.lazy(() => import('@/screens/Auth/LoginScreen'))} />
      <Stack.Screen name="RegisterPassword" component={React.lazy(() => import('@/screens/Auth/RegisterPasswordScreen'))} />
      <Stack.Screen name="RegisterEmail" component={React.lazy(() => import('@/screens/Auth/RegisterEmailScreen'))} />
      <Stack.Screen name="VerifyOtp" component={React.lazy(() => import('@/screens/Auth/VerifyOtpScreen'))} />
      <Stack.Screen name="WebView" component={React.lazy(() => import('@/screens/Auth/WebViewScreen'))} />
      <Stack.Screen name="ForgotPassword" component={React.lazy(() => import('@/screens/Auth/ForgotPasswordScreen'))} />
    </Stack.Navigator>
  )
}
