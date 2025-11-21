// LoginScreen.tsx
import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { showToast } from '@/components/common/CommonToast';
import { PasswordStrengthMeter } from '@/components/common/PasswordStrengthMeter';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { VERIFICATION } from '@/constants/purpose';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { AuthStackParamList } from '@/navigation/types';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { makeSelectRegister } from '@/store/reducers/authSlice';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'RegisterPassword'>;
type RouteProps = RouteProp<AuthStackParamList, 'RegisterPassword'>;

export default function RegisterPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [errors, setErrors] = useState({ password: '', confirmPassword: '', referralCode: '' });
  const dispatch = useDispatch();
  const { status, error, data, params } = useSelector(makeSelectRegister);

  // Sử dụng hook kiểm tra độ mạnh mật khẩu
  const {
    password,
    setPassword,
    strength,
    feedback,
    isValid: isPasswordValid
  } = usePasswordStrength();

  console.log("REGISTER PASSWORD", status, error, data, params);

  useEffect(() => {
    if (status === 'success') {
      navigation.navigate('VerifyOtp', { email: route.params.username , type: VERIFICATION });
    }
    if (status === 'error') {
     showToast({ type: 'error', title: 'Error', message: error || '' });
    }
  }, [status, dispatch]);

  const handleRegister = () => {
    let hasError = false;
    const newErrors = { password: '', confirmPassword: '', referralCode: '' };

    // Kiểm tra mật khẩu
    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
      hasError = true;
    } else if (!isPasswordValid) {
      newErrors.password = 'Password is too weak. Please strengthen your password.';
      hasError = true;
    }

    // Kiểm tra confirm password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please enter your confirm password';
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Register:', { password, referralCode, ...route.params });
       navigation.navigate('VerifyOtp', { email: route.params.username, type: 'register' });
      // dispatch(registerAction({ password, referralCode, ...route.params, recaptcha: '' }));
    }
  };
  console.log('Register:', { password, referralCode, ...route.params });
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrors({ ...errors, password: '' });
  };

  const handleReset =()=>{
    setPassword('');
    setConfirmPassword('');
    setReferralCode('');
    setErrors({ password: '', confirmPassword: '', referralCode: '' });
  }

  return (
    <AuthLayout>
      <HeaderAuth title="Create an account!" subtitle="Sign up with your email" />

      {/* Form Card */}
      <View className="p-2">
        <CommonInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
          error={errors.password}
          isRequired={true}
          isPassword
          autoCapitalize="none"
        />

        {/* Hiển thị độ mạnh mật khẩu */}
        {password.length > 0 && (
          <PasswordStrengthMeter
            strength={strength}
            feedback={feedback}
          />
        )}

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
          autoCapitalize="none"
        />

        {/* Login Button */}
        <CommonButton
          title="Next"
          onPress={handleRegister}
          variant="gradient"
          size="large"
          // loading={status === 'loading'}
          // disabled={status === 'loading'}
          className="mb-6"
        />
        <CommonButton
          title="Reset"
          onPress={handleReset}
          variant="outline"
          size="large"
          className="mb-6"
        />
      </View>
    </AuthLayout>
  );
}