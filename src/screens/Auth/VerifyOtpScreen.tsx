import { CommonButton } from '@/components/common/CommonButton';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { useAppStyle } from '@/hooks/useAppStyles';
import { AuthStackParamList } from '@/navigation/types';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');
const OTP_LENGTH = 6;
const RESEND_OTP_TIME_LIMIT = 15; // 60 giây
type VerifyScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'VerifyOtp'
>;

export default function VerifyOtpScreen() {
  const { colors, textStyles: typography } = useAppStyle();
  const route = useRoute<RouteProp<AuthStackParamList, 'VerifyOtp'>>();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timeLeft, setTimeLeft] = useState(RESEND_OTP_TIME_LIMIT); // 60 giây
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) return;
    if (timeLeft <= 0) {
      setIsResendEnabled(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isFocused]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // chỉ cho phép số
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  console.log("Time left:", timeLeft);
  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('OTP entered:', otpCode, route.params.email);
    if (timeLeft === 0) {

      Toast.show({
        type: 'error',
        text1: 'Code expired.',
        text2: 'Please check your OTP and try again.'
      })
    } else {
      if (otpCode === '123456' && timeLeft > 0) {

        Toast.show({
          type: 'success',
          text1: 'Verification successful!',
          text2: 'You can now access your account and start using the app.'
        })
        navigation.navigate('Login')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Verification failed.',
          text2: 'Please check your OTP and try again.'
        })
      }
    }
  }

  const handleResendOtp = () => {
    if (!isResendEnabled) return;

    // Reset timer
    setTimeLeft(RESEND_OTP_TIME_LIMIT);
    setIsResendEnabled(false);

    // Clear OTP fields
    setOtp(['', '', '', '', '', '']);

    // Focus vào ô đầu tiên
    inputsRef.current[0]?.focus();

    // TODO: gọi API gửi lại OTP
    console.log('Resending OTP...');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Tính toán kích thước OTP input cho responsive
  const otpInputSize = Math.min(60, (screenWidth - 80) / 6);

  return (
    <AuthLayout>
      <View className="flex-1 justify-between">
        {/* Header Section */}
        <View className="flex-1 max-h-40">
          <HeaderAuth
            title="OTP Verification"
            subtitle="Enter the 6-digit code sent to your email/phone"
          />
        </View>

        {/* Main Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center"
        >
          <View className="px-6">
            {/* OTP Inputs */}
            <View className="items-center mb-8">
              <View className="flex-row justify-between mb-6" style={{ gap: 12 }}>
                {otp.map((digit, index) => (
                  <View
                    key={index}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 3,
                    }}
                  >
                    <TextInput
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      value={digit}
                      onChangeText={(text) => handleChange(text, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        borderWidth: 2,
                        borderColor: digit ? colors.primary : colors.border,
                        borderRadius: 16,
                        width: otpInputSize,
                        height: otpInputSize,
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '700',
                        color: colors.text,
                        backgroundColor: colors.cardDark,
                      }}
                      selectionColor={colors.primary}
                    />
                  </View>
                ))}
              </View>

              {/* Timer Section */}
              <View className="items-center mb-2">
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 15,
                    fontWeight: '500',
                  }}
                  className="text-center"
                >
                  Code expires in {' '}
                  <Text
                    style={{
                      color: timeLeft <= 10 ? colors.error : colors.primary,
                      fontWeight: '700',
                      fontSize: 16,
                    }}
                  >
                    {formatTime(timeLeft)}
                  </Text>
                </Text>
              </View>
            </View>

            {/* Verify Button */}
            <View className="mb-8">
              <CommonButton
                title="Verify & Continue"
                onPress={handleVerify}
                variant="gradient"
                size="large"
                // loading={status === 'loading'}
                disabled={otp.some(digit => !digit)}
                className="rounded-2xl"
              />
            </View>

            {/* Resend Section */}
            <View className="items-center">
              <View className="flex-row items-center mb-4">
                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                  className="mx-4"
                >
                  Didn't receive code?
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              </View>

              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={!isResendEnabled}
                className={`py-3 px-6 rounded-2xl ${isResendEnabled ? 'opacity-100' : 'opacity-60'
                  }`}
                style={{
                  backgroundColor: isResendEnabled ? colors.primary + '20' : 'transparent',
                  borderWidth: 1,
                  borderColor: isResendEnabled ? colors.primary : colors.border,
                }}
              >
                <Text
                  style={{
                    color: isResendEnabled ? colors.primary : colors.textDisabled,
                    fontSize: 15,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  {isResendEnabled ? 'Resend Code' : `Resend available in ${formatTime(timeLeft)}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Footer Spacing */}
        <View className="h-8" />
      </View>
    </AuthLayout>
  );
}