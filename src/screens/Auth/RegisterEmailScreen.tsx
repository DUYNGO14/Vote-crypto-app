// LoginScreen.tsx
import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { showToast } from '@/components/common/CommonToast';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { useAppStyle } from '@/hooks/useAppStyles';
import { isValidEmail } from '@/hooks/validate';
import { AuthStackParamList } from '@/navigation/types';
import GroupButtonSocial from '@/screens/Auth/components/GroupButtonSocial';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { RootState } from '@/store';
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
import { useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'RegisterEmail'>;

export default function RegisterEmailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, textStyles } = useAppStyle();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [nickname, setNickname] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState({ username: '', displayName: '', nickname: '', fullName: '', agree: '' });
  const [agree, setAgree] = useState(false);
  const { status, error, data, params } = useSelector((state: RootState) => state.auth.signin);

  console.log('Signin state:', { status, error, data, params });
  useEffect(() => {
    if (status === 'error' && error) {
      showToast({ type: 'error', title: 'Error', message: error });
    }
  }, [status, error]);

  const handleRegisterEmail = () => {
    let hasError = false;
    const newErrors = { username: '', displayName: '', nickname: '', fullName: '', agree: '' };

    if (!displayName.trim()) {
      newErrors.displayName = 'Please enter your display name';
      hasError = true;
    }
    if (displayName.length < 4 || displayName.length > 35) {
      newErrors.displayName = 'Display name must be between 4 and 35 characters';
      hasError = true;
    }

    if (!username.trim()) {
      newErrors.username = 'Please enter your email.';
      hasError = true;
    } else {
      const inputType = isValidEmail(username.trim());

      if (!inputType) {
        newErrors.username = 'Please enter a valid email.';
        hasError = true;
      }
    }

    if (!agree) {
      newErrors.agree = 'Please accept the terms and conditions';
      hasError = true;
    }

    if (nickname) {
      if (nickname.length < 4 || nickname.length > 35) {
        newErrors.nickname = 'Nickname must be between 4 and 35 characters';
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (!hasError) {
      console.log('Login:', { username });
      navigation.navigate('RegisterPassword', { username, displayName, nickname, fullName });
    }
  };
  return (
    <AuthLayout>
      <HeaderAuth title="Create an account!" subtitle="Sign up with your email" />
      {/* Form Card */}
      <View className="p-2">
        <CommonInput
          label="Username"
          placeholder="Enter your email"
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
        <View className="mb-6 flex-col">
          <View className="flex-row items-center">
            <Checkbox
              value={agree}
              onValueChange={setAgree}
              color={agree ? colors.primary : undefined}
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
          <View>
            {errors.agree && (
              <Text
                className="text-sm text-red-500"
                style={{ color: colors.error }}
              >
                {errors.agree}
              </Text>
            )}
          </View>
        </View>


        {/* Login Button - Using CommonButton with Gradient */}
        <CommonButton
          title="Next"
          onPress={handleRegisterEmail}
          variant="gradient"
          size="large"
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