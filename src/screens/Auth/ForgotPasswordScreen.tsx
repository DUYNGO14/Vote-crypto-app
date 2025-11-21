import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { showToast } from '@/components/common/CommonToast';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { RESET_PASSWORD } from '@/constants/purpose';
import { useAppStyle } from '@/hooks/useAppStyles';
import { isValidEmail } from '@/hooks/validate';
import { AuthStackParamList } from '@/navigation/types';
import GroupButtonSocial from '@/screens/Auth/components/GroupButtonSocial';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { forgotPasswordAction, selectForgotPassword } from '@/store/reducers/authSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useAppStyle();
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ username: '' });
  const dispatch = useDispatch();
  const { status, error, data , params} = useSelector(selectForgotPassword);
  console.log('[FORGOT PASSWORD]', status, error, data, params);
  // 🧹 Khi rời khỏi màn hình => reset form
  useFocusEffect(
    useCallback(() => {
      return () => {
        setUsername('');
        setErrors({ username: '' });
      };
    }, [])
  );

  useEffect(() => {
    if (status === 'error' && error) {
      showToast({ type: 'error', title: 'Error', message: error });
    }

    if (status === 'success' && data) {
      showToast({ type: 'success', title: 'Success', message: data.message });
      navigation.navigate('VerifyOtp', { email: username, type: RESET_PASSWORD });
    }
  }, [status, error]);

  // 🧾 Reset thủ công khi bấm nút Reset
  const handleReset = () => {
    setUsername('');
    setErrors({ username: '' });
  };

  const handleForgotPassword = () => {
    let hasError = false;
    const newErrors = { username: '' };

    if (!username.trim()) {
      newErrors.username = 'Please enter your email.';
      hasError = true;
    } else if (!isValidEmail(username.trim())) {
      newErrors.username = 'Please enter a valid email.';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Forgot Password:', { username });
      // dispatch(forgotPasswordAction({
      //   email: username,
      //   recaptcha: '',
      // }));
      navigation.navigate('VerifyOtp', { email: username, type: RESET_PASSWORD });
    }
  };

  return (
    <AuthLayout>
      <HeaderAuth
        title="Forgot Password!"
        subtitle="Let's reset your password quickly"
      />

      <View className="p-2">
        {/* Email input */}
        <CommonInput
          label="Email"
          placeholder="Enter your email."
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors({ ...errors, username: '' });
          }}
          isRequired
          error={errors.username}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Info Text */}
        <View className="mb-6 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <Text
            className="text-sm"
            style={{ color: colors.textSecondary }}
          >
            We will send a verification code to your email to reset your password.
          </Text>
        </View>

        {/* Buttons */}
        <CommonButton
          title="Send Verification Code"
          onPress={handleForgotPassword}
          variant="gradient"
          size="large"
          className="mb-3"
        />

        <CommonButton
          title="Reset"
          onPress={handleReset}
          variant="outline"
          size="large"
          className="mb-6"
        />

        {/* Back to Login */}
        <View className="flex-row justify-center items-center mb-6">
          <Text style={{ color: colors.textSecondary }}>
            Remember your password?{' '}
          </Text>
          <Text
            className="font-bold underline"
            style={{ color: colors.primary }}
            onPress={() => navigation.navigate('Login')}
          >
            Back to Login
          </Text>
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

        {/* Social login */}
        <GroupButtonSocial  />
      </View>
    </AuthLayout>
  );
}
