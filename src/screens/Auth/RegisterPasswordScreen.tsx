// LoginScreen.tsx
import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { AuthStackParamList } from '@/navigation/types';
import { AuthFooter } from '@/screens/Auth/components/AuthFooter';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  View
} from 'react-native';
import { useDispatch } from 'react-redux';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'RegisterPassword'>;
type RouteProps = RouteProp<AuthStackParamList, 'RegisterPassword'>;
export default function RegisterPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps >();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [errors, setErrors] = useState({ password: '', confirmPassword: '', referralCode: '' });
  const dispatch = useDispatch();

  const handleRegister = () => {
    let hasError = false;
    const newErrors = { password: '', confirmPassword: '', referralCode: '' };

    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
      hasError = true;
    }
    if(password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please enter your confirm password';
      hasError = true;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Register:', { password, referralCode, ...route.params });
      navigation.navigate('VerifyOtp', { email: route.params.username });
    }
  };
  return (
    <AuthLayout>
      <HeaderAuth title="Create an account!" subtitle="Sign up with your email" />

      {/* Form Card */}
      <View className="p-2">
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
         <CommonInput
          label="Confirm Password"
          placeholder="Enter your confirm password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors({ ...errors, confirmPassword: '' });
          }}
          error={errors.confirmPassword}
          isRequired={true}
          isPassword
          autoCapitalize="none"
        />
         <CommonInput
          label="Referral Code (Optional)"
          placeholder="Enter your referral code"
          value={referralCode}
          onChangeText={(text) => {
            setReferralCode(text);
            setErrors({ ...errors, referralCode: '' });
          }}
          isPassword
          autoCapitalize="none"
        />
        {/* Login Button - Using CommonButton with Gradient */}
        <CommonButton
          title="Next"
          onPress={handleRegister}
          variant="gradient"
          size="large"
          // loading={status === 'loading'}
          // disabled={status === 'loading'}
          className="mb-6"
        />
      </View>
    </AuthLayout>
  );
}