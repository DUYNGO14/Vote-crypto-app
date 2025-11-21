// screens/Auth/LoginScreen.tsx
import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { showToast } from '@/components/common/CommonToast';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { Config } from '@/config/env';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useRecaptchaV3 } from '@/hooks/useRecaptchaV3';
import { AuthStackParamList } from '@/navigation/types';
import GroupButtonSocial from '@/screens/Auth/components/GroupButtonSocial';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import RecaptchaV3 from '@/screens/Auth/components/RecaptchaV3';
import { makeSelectSignin, resetSignin, signinAction } from '@/store/reducers/authSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Checkbox from 'expo-checkbox';
import { set } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const MAX_WAIT_TIME = 5000; // 5 seconds
const WAIT_INTERVAL = 500; // 0.5 seconds

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { colors } = useAppStyle();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { status, error } = useSelector(makeSelectSignin);
  const { recaptchaRef, getToken, isReady, onRecaptchaLoad, onRecaptchaError } = useRecaptchaV3();
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Reset form state
        setUsername('');
        setPassword('');
        setErrors({ username: '', password: '' });
        setChecked(false);
        // Reset signin state
        dispatch(resetSignin());
      };
    }, [dispatch])
  )
  // Handle login errors from Redux
  useEffect(() => {
    if (status === 'error' && error) {
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: error
      })
    }
    if (status === 'success') {
      showToast({
        type: 'success',
        title: 'Login Success',
        message: 'Welcome back to your account!'
      })
    }
  }, [status, error]);

  // Handle reCAPTCHA errors
  // const handleRecaptchaError = (error: string) => {
  //   onRecaptchaError(error);
  //   showToast({
  //     type: 'error',
  //     title: 'reCAPTCHA Error',
  //     message: error
  //   })
  // };

  // Handle token expiration
  // const handleRecaptchaExpire = () => {
  //   showToast({
  //     type: 'info',
  //     title: 'Session Expired',
  //     message: 'Please try logging in again'
  //   })
  // };

  // Validate form
  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let hasError = false;

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
    return !hasError;
  };

  // Wait for reCAPTCHA to be ready
  const waitForRecaptcha = async (): Promise<boolean> => {
    const startTime = Date.now();

    while (!recaptchaRef.current?.isReady) {
      if (Date.now() - startTime > MAX_WAIT_TIME) {
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, WAIT_INTERVAL));
    }

    return true;
  };

  // Handle login
  const handleLogin = async () => {
    // Prevent multiple submissions
    if (isLoading || status === 'loading') return;

    // Validate form
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Wait for reCAPTCHA if not ready
      // if (!recaptchaRef.current?.isReady) {
      //   showToast({
      //     type: 'info',
      //     title: 'Security Service',
      //     message: 'Please wait for security service initialization',
      //   })

      //   const ready = await waitForRecaptcha();

      //   if (!ready) {
      //     throw new Error('Security service initialization timeout. Please try again.');
      //   }
      // }

      // Get reCAPTCHA token
      // const recaptchaToken = await getToken('login');
      // console.log('recaptchaToken', recaptchaToken);
      // Dispatch login action
      dispatch(signinAction({
        username: username.trim(),
        password: password.trim(),
        // recaptcha: recaptchaToken,
      }));

    } catch (error) {
      console.error('Login error:', error);

      showToast({
        type: 'error',
        title: 'Login Failed',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || status === 'loading';

  return (
    <AuthLayout>
      {/* reCAPTCHA Component */}
      {/* <RecaptchaV3
        ref={recaptchaRef}
        siteKey={Config.captcha_site_key}
        action={'login'}
        baseUrl={Config.domain_name}
        onLoad={onRecaptchaLoad}
        onError={handleRecaptchaError}
        onExpire={handleRecaptchaExpire}
        autoExecute={false}
      /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <HeaderAuth
            title="Welcome Back!"
            subtitle="Login to your account"
          />

          <View className="p-6 flex-1">
            {/* Username Input */}
            <CommonInput
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username) {
                  setErrors({ ...errors, username: '' });
                }
              }}
              isRequired
              error={errors.username}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            {/* Password Input */}
            <CommonInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: '' });
                }
              }}
              error={errors.password}
              isRequired
              isPassword
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            {/* Remember Me & Forgot Password */}
            <View className="mb-6 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? colors.primary : undefined}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
                <Text
                  className="ml-2 text-sm"
                  style={{ color: isChecked ? colors.primary : colors.text }}
                >
                  Remember Me
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text
                  className="font-medium text-sm"
                  style={{ color: colors.link }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <CommonButton
              title={
                isLoading || status === 'loading' ? "Signing In..." :
                  "Login"
              }
              onPress={handleLogin}
              variant="gradient"
              size="large"
              loading={isLoading || status === 'loading'}
              disabled={isButtonDisabled}
              className="mb-6"
            />

            {/* Debug Info (Development only) */}
            {/* {__DEV__ && (
              <View className="mb-4 p-3 bg-gray-100 rounded-lg">
                <Text className="text-xs text-center" style={{ color: colors.textLight }}>
                  reCAPTCHA: {isReady ? '✅ Ready' : '🔄 Loading...'}
                </Text>
              </View>
            )} */}

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mb-8">
              <Text style={{ color: colors.textSecondary }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterEmail')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text
                  className="font-bold"
                  style={{ color: colors.link }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Separator */}
            <View className="flex-row items-center gap-4 mb-6">
              <View
                className="flex-1 h-px"
                style={{ backgroundColor: colors.border }}
              />
              <Text
                className="text-sm font-medium"
                style={{ color: colors.textLight }}
              >
                Or
              </Text>
              <View
                className="flex-1 h-px"
                style={{ backgroundColor: colors.border }}
              />
            </View>

            {/* Social Login Buttons */}
            <GroupButtonSocial />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}