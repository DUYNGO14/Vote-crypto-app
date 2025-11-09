// components/layout/AuthFooter.tsx - Version tối ưu
import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppNavigation } from '@/hooks/useNavigation';

interface AuthFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({
  children,
  className = '',
}) => {
  const { colors, textStyles } = useAppStyle();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const navigation = useAppNavigation();
  const onTermsPress = () => {
    navigation.navigate('WebView', {
      url: 'https://votingcrypto.com/terms-of-use',
      title: 'Terms & Conditions',
    });
  }
  const onPrivacyPress = () => {
    navigation.navigate('WebView', {
      url: 'https://votingcrypto.com/privacy-policy',
      title: 'Privacy Policy',
    });
  }
  const onLegalPress = () => {
    // Xử lý khi nhấn Legal Notices
  }

  const defaultFooter = (
    <View className="flex-row justify-center items-center flex-wrap">
      {/* Terms & Conditions */}
      <TouchableOpacity onPress={onTermsPress} className="mx-2 my-1">
        <Text 
          style={[
            { color: colors.textSecondary }, 
            textStyles.Text,
            { fontSize: isSmallScreen ? 12 : 14 }
          ]}
        >
          Terms & Conditions
        </Text>
      </TouchableOpacity>

      {/* Separator 1 */}
      {!isSmallScreen && (
        <View className="h-4 w-px mx-1" style={{ backgroundColor: colors.border }} />
      )}

      {/* Privacy Policy */}
      <TouchableOpacity onPress={onPrivacyPress} className="mx-2 my-1">
        <Text 
          style={[
            { color: colors.textSecondary }, 
            textStyles.Text,
            { fontSize: isSmallScreen ? 12 : 14 }
          ]}
        >
          Privacy Policy
        </Text>
      </TouchableOpacity>

      {/* Separator 2 */}
      {!isSmallScreen && (
        <View className="h-4 w-px mx-1" style={{ backgroundColor: colors.border }} />
      )}

      {/* Legal Notices */}
      <TouchableOpacity onPress={onLegalPress} className="mx-2 my-1">
        <Text 
          style={[
            { color: colors.textSecondary }, 
            textStyles.Text,
            { fontSize: isSmallScreen ? 12 : 14 }
          ]}
        >
          Legal Notices
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className={`${className}`}>
      {children || defaultFooter}
    </View>
  );
};