import { CommonButton } from '@/components/common/CommonButton';
import { showToast } from '@/components/common/CommonToast';
import { AuthLayout } from '@/components/layouts/Auth/AuthLayout';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useCountdown } from '@/hooks/useCountdown';
import { AuthStackParamList } from '@/navigation/types';
import HeaderAuth from '@/screens/Auth/components/HeaderAuth';
import { resendOtpAction, selectResendOtp, selectVerifyEmail } from '@/store/reducers/authSlice';
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const { width: screenWidth } = Dimensions.get('window');
const OTP_LENGTH = 6;
const RESEND_OTP_TIME_LIMIT = 180;

type VerifyScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'VerifyOtp'
>;

export default function VerifyOtpScreen() {
  const { colors } = useAppStyle();
  const route = useRoute<RouteProp<AuthStackParamList, 'VerifyOtp'>>();
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { status: resendOtpStatus, error: resendOtpError, data: resendOtpData, params: resendOtpParams } = useSelector(selectResendOtp);
  const { status: verifyOtpStatus, error: verifyOtpError, data: verifyOtpData, params: verifyOtpParams } = useSelector(selectVerifyEmail);
  const { email, type } = route.params;
  useEffect(() => {
    if (resendOtpStatus === 'error') {
      showToast({ type: 'error', title: 'Resend OTP Error', message: resendOtpError || '' });
    }
    if (verifyOtpStatus === 'error') {
      showToast({ type: 'error', title: 'Verify OTP Error', message: verifyOtpError || '' });
    }

  }, [resendOtpStatus, verifyOtpStatus]);

  useEffect(() => {
    if (resendOtpStatus === 'success') {
      showToast({ type: 'success', title: 'Resend OTP Success', message: 'Resend OTP successfully' });
    }
    if (verifyOtpStatus === 'success') {
      showToast({ type: 'success', title: 'Verify OTP Success', message: 'Verify OTP successfully' });
      navigation.navigate('Login');
    }
  }, [resendOtpStatus, verifyOtpStatus]);
  // --- Hook countdown ---
  const {
    formattedTime,
    remainingSeconds,
    isActive,
    restart,
    pause
  } = useCountdown({
    initialSeconds: RESEND_OTP_TIME_LIMIT,
    autoStart: true,
    onCountdownEnd: () => {
      console.log('Countdown ended');
      showToast({
        type: 'warning',
        title: 'OTP expired',
        message: 'Please resend code to continue.'
      })
    }
  });

  // --- OTP state ---
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<(TextInput | null)[]>([]);

  // Khi rời khỏi screen -> dừng đếm
  useEffect(() => {
    if (!isFocused) pause();
  }, [isFocused, pause]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;
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

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (remainingSeconds === 0) {
      showToast({
        type: 'warning',
        title: 'OTP expired',
        message: 'Please resend code to continue.'
      })
      return;
    }

    if (otpCode === '123456') {
      showToast({
        type: 'success',
        title: 'Verification successful',
        message: 'You have successfully verified your OTP.'
      })
      navigation.navigate('Login');
    } else {
      showToast({
        type: 'error',
        title: 'Verification failed',
        message: 'The OTP you entered is incorrect. Please try again.'
      })
    }
  };

  const handleResetOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    inputsRef.current[0]?.focus();
  }

  const handleResendOtp = () => {
    if (remainingSeconds > 0) return;
    restart();
    setOtp(Array(OTP_LENGTH).fill(''));
    inputsRef.current[0]?.focus();
    console.log('Resending OTP...', { email, recaptcha: '', purpose: type });
    dispatch(resendOtpAction({ email, recaptcha: '', purpose: type }));
  };

  // Responsive input
  const otpInputSize = Math.min(60, (screenWidth - 80) / 6);

  return (
    <AuthLayout>
      <View className="flex-1 justify-between">
        <View className="flex-1 max-h-40">
          <HeaderAuth
            title="OTP Verification"
            subtitle="Enter the 6-digit code sent to your email/phone"
          />
        </View>

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
                      shadowOffset: { width: 0, height: 2 },
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

              {/* Timer */}
              <View className="items-center mb-2">
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 15,
                    fontWeight: '500',
                  }}
                >
                  Code expires in{' '}
                  <Text
                    style={{
                      color: remainingSeconds <= 10 ? colors.error : colors.primary,
                      fontWeight: '700',
                      fontSize: 16,
                    }}
                  >
                    {formattedTime}
                  </Text>
                </Text>
              </View>
            </View>

            {/* Verify Button */}
            <View className="mb-8 flex-col gap-4">
              <CommonButton
                title="Verify & Continue"
                onPress={handleVerify}
                variant="gradient"
                size="large"
                disabled={otp.some((digit) => !digit)}
                className="rounded-2xl"
              />
              <CommonButton
                title="Reset"
                onPress={handleResetOtp}
                variant="outline"
                size="large"
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
                disabled={remainingSeconds > 0}
                className={`py-3 px-6 rounded-2xl ${remainingSeconds <= 0 ? 'opacity-100' : 'opacity-60'
                  }`}
                style={{
                  backgroundColor:
                    remainingSeconds <= 0 ? colors.primary + '20' : 'transparent',
                  borderWidth: 1,
                  borderColor:
                    remainingSeconds <= 0 ? colors.primary : colors.border,
                }}
              >
                <Text
                  style={{
                    color: remainingSeconds <= 0 ? colors.primary : colors.textDisabled,
                    fontSize: 15,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  {remainingSeconds <= 0
                    ? 'Resend Code'
                    : `Resend available in ${formattedTime}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View className="h-8" />
      </View>
    </AuthLayout>
  );
}
