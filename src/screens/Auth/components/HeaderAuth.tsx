// screens/Auth/components/HeaderAuth.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Icons } from '@utils/icons';
import { useAppStyle } from '@/hooks/useAppStyles';

interface HeaderAuthProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

const HeaderAuth: React.FC<HeaderAuthProps> = ({
  title,
  subtitle,
  showLogo = true,
  className = '',
}) => {
  const { colors } = useAppStyle();

  return (
    <View className={`items-center mb-4 ${className}`}>
      {showLogo && (
        <Icons.IcLogo width={80} height={80} fill={colors.primary} className="mb-4" />
      )}
      <Text
        className="text-3xl font-bold text-center mb-2"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          className="text-base text-center"
          style={{ color: colors.textSecondary }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default HeaderAuth;