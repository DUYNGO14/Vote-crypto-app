import { CommonButton } from '@/components/common/CommonButton';
import { CommonInput } from '@/components/common/CommonInput';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { useAppStyle } from '@/hooks/useAppStyles';
import { isEmailOrPhone } from '@/hooks/validate';
import { AuthStackParamList } from '@/navigation/types';
import { AuthFooter } from '@/screens/Auth/components/AuthFooter';
import GroupButtonSocial from '@/screens/Auth/components/GroupButtonSocial';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, textStyles } = useAppStyle();
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ username: '' });
  const dispatch = useDispatch();

  const handleForgotPassword = () => {
    let hasError = false;
    const newErrors = { username: '' };

    if (!username.trim()) {
      newErrors.username = 'Please enter your email or phone number';
      hasError = true;
    } else {
      const inputType = isEmailOrPhone(username.trim());
      
      if (inputType === 'invalid') {
        newErrors.username = 'Please enter a valid email or phone number';
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (!hasError) {
      const inputType = isEmailOrPhone(username.trim());
      console.log('Forgot Password:', { 
        username, 
        type: inputType 
      });
      
    }
  };

  // Helper text hiển thị gợi ý
  const getHelperText = () => {
    if (!username.trim()) return null;
    
    const inputType = isEmailOrPhone(username.trim());
    
    switch (inputType) {
      case 'email':
        return { text: '✓ Valid email format', color: colors.success };
      case 'phone':
        return { text: '✓ Valid phone format', color: colors.success };
      case 'invalid':
        return { text: 'Please enter a valid email or phone number', color: colors.error };
      default:
        return null;
    }
  };

  const helperText = getHelperText();

  return (
    <AuthLayout>
      <HeaderAuth 
        title="Forgot Password!" 
        subtitle="Let's reset your password quickly" 
      />
      
      {/* Form Card */}
      <View className="p-2">
        <CommonInput
          label="Email or Phone Number"
          placeholder="Enter your email or phone number"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors({ ...errors, username: '' });
          }}
          isRequired={true}
          error={errors.username}
          helperText={helperText?.text}
          helperTextColor={helperText?.color}
          autoCapitalize="none"
          keyboardType="email-address" // Sử dụng email-address để hiển thị bàn phím phù hợp
        />

        {/* Info Text */}
        <View className="mb-6 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <Text 
            className="text-sm"
            style={{ color: colors.textSecondary }}
          >
            We will send a verification code to your email or phone to reset your password.
          </Text>
        </View>

        {/* Send Button */}
        <CommonButton
          title="Send Verification Code"
          onPress={handleForgotPassword}
          variant="gradient"
          size="large"
          // loading={status === 'loading'}
          // disabled={status === 'loading'}
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

        {/* Social Login Buttons */}
        <GroupButtonSocial />
      </View>
    </AuthLayout>
  );
}