// LoginScreen.tsx
import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { useAppStyle } from '@/hooks/useAppStyles';
import { AuthStackParamList } from '@/navigation/types';
import { useTheme } from '@/providers/ThemeProvider';
import { AuthFooter } from '@/screens/Auth/components/AuthFooter';
import GroupButtonSocial from '@/screens/Auth/components/GroupButtonSocial';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { RootState } from '@/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icons } from '@utils/icons';
import Checkbox from 'expo-checkbox';
import { set } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'RegisterEmail'>;

export default function RegisterEmailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, textStyles } = useAppStyle();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [nickname, setNickname] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState({ username: '', displayName: '', nickname: '', fullName: '' });
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

  const handleRegisterEmail = () => {
    let hasError = false;
    const newErrors = { username: '', displayName: '', nickname: '', fullName: '' };

    if (!displayName.trim()) {
      newErrors.displayName = 'Please enter your display name';
      hasError = true;
    }
    if (displayName.length < 4) {
      newErrors.displayName = 'Display name must be at least 4 characters';
      hasError = true;
    }

    if (!username.trim()) {
      newErrors.username = 'Please enter your username';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Login:', { username });
      navigation.navigate('RegisterPassword', { username, displayName, nickname, fullName });
    }
  };
  const { toggleTheme } = useTheme();
  return (
    <AuthLayout>
      <HeaderAuth title="Create an account!" subtitle="Sign up with your email" />
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
          label="Display Name"
          placeholder="Enter your display name"
          value={displayName}
          onChangeText={(text) => {
            setDisplayName(text);
            setErrors({ ...errors, displayName: '' });
          }}
          isRequired={true}
          error={errors.displayName}
          autoCapitalize="none"
        />
        <CommonInput
          label="Nickname"
          placeholder="Enter your nickname"
          value={nickname}
          onChangeText={(text) => {
            setNickname(text);
            setErrors({ ...errors, nickname: '' });
          }}
          error={errors.nickname}
          autoCapitalize="none"
        />
        <CommonInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            setErrors({ ...errors, fullName: '' });
          }}
          error={errors.fullName}
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
              style={{ color: colors.text }}
            >
              I agree to the{' '}
            </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('WebView', {
                url: 'https://votingcrypto.com/terms-of-use',
                title: 'Terms & Conditions',
              });
            }}>
              <Text
                className="font-bold"
                style={{ color: colors.link }}
              >
                terms and conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button - Using CommonButton with Gradient */}
        <CommonButton
          title="Next"
          onPress={handleRegisterEmail}
          variant="gradient"
          size="large"
          loading={status === 'loading'}
          disabled={status === 'loading'}
          className="mb-6"
        />
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
        <GroupButtonSocial />
      </View>
    </AuthLayout>
  );
}