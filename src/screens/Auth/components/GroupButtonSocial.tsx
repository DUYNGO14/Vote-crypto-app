import { CommonButton } from '@/components/common/CommonButton';
import { showToast } from '@/components/common/CommonToast';
import { useAppStyle } from '@/hooks/useAppStyles';
import { Icons } from '@/utils/icons';
import React from 'react';
import { View } from 'react-native';

export default function GroupButtonSocial() {
  const { colors, textStyles: typography } = useAppStyle();
  const handleGoogleLogin = () => {
    showToast({
      type: 'success',
      title: 'Login with Google',
      message: 'This is some something 👋'
    })
  };

  const handleFacebookLogin = () => {
    showToast({
      type: 'success',
      title: 'Login with Facebook',
      message: 'This is some something 👋'
    })
  };
  return (
    <View className="flex-col gap-3 mb-6">
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
    </View>
  )
}
