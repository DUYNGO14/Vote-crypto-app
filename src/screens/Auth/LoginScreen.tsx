// LoginScreen.tsx
import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { useAppStyle } from '@/hooks/useAppStyles';
import { AuthStackParamList } from '@/navigation/types';
import { AuthFooter } from '@/screens/Auth/components/AuthFooter';
import GroupButtonSocial from '@/screens/Auth/components/GroupButtonSocial';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { RootState } from '@/store';
import { signinAction } from '@/store/reducers/authSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { colors, textStyles } = useAppStyle();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { status, error, data, params } = useSelector((state: RootState) => state.auth.signin);
  console.log('Signin state:', { status, error, data, params });
  useEffect(() => {
    if (status === 'error' && error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  }, [status, error]);

  const handleLogin = () => {
    let hasError = false;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Please enter your username';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Login:', { username, password });
      dispatch(signinAction({ username, password }));
    }
  };

  return (
    <AuthLayout >
      <HeaderAuth title="Welcome Back!" subtitle="Login to your account" />
      {/* Form Card */}
      <View className="p-2">
        <CommonInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors({ ...errors, username: '' });
          }}
          isRequired={true}
          error={errors.username}
          autoCapitalize="none"
        />

        <CommonInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          error={errors.password}
          isRequired={true}
          isPassword
          autoCapitalize="none"
        />

        {/* Remember Me & Forgot Password */}
        <View className="mb-6 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? colors.primary : undefined}
              style={{ width: 20, height: 20 }}
            />
            <Text
              className="ml-2"
              style={{ color: isChecked ? colors.primary : colors.text }}
            >
              Remember Me
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              className="font-medium"
              style={{ color: colors.link }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button - Using CommonButton with Gradient */}
        <CommonButton
          title="Login"
          onPress={handleLogin}
          variant="gradient"
          size="large"
          loading={status === 'loading'}
          disabled={status === 'loading'}
          className="mb-6"
        // ✅ Có thể custom gradient colors nếu muốn
        // gradientColors={['#FF6B6B', '#FF8E53', '#FF6B6B'] as const}
        />

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center">
          <Text style={{ color: colors.textSecondary }}>
            Don&apos;t have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterEmail')}>
            <Text
              className="font-bold"
              style={{ color: colors.link }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-4 my-6">
          <View
            className="flex-1 h-px"
            style={{ backgroundColor: colors.border }}
          />
          <Text
            className="text-sm"
            style={{ color: colors.textLight }}
          >
            Or
          </Text>
          <View
            className="flex-1 h-px"
            style={{ backgroundColor: colors.border }}
          />
        </View>

        {/* Social Login Buttons - Using CommonButton với custom colors */}
        {/* <View className="flex-col gap-3 mb-6">
          <CommonButton
            title="Sign in with Google"
            onPress={handleGoogleLogin}
            variant="outline"
            size="medium"
            leftIcon={<Icons.IcGoogle width={24} height={24} />}
            // ✅ Custom colors cho outline button
            borderColor={colors.border}
            textColor={colors.text}
          />

          <CommonButton
            title="Sign in with Apple"
            onPress={handleFacebookLogin}
            variant="outline"
            size="medium"
            leftIcon={<Icons.IcApple width={24} height={24} color={colors.text} />}
            borderColor={colors.border}
            textColor={colors.text}
          />
        </View> */}
        <GroupButtonSocial />
      </View>

      {/* Footer Links */}
    </AuthLayout>
  );
}