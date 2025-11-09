// CommonButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStyle } from '@/hooks/useAppStyles';

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'gradient' | 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gradientColors?: readonly ColorValue[];
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  variant = 'gradient',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  gradientColors,
  backgroundColor,
  textColor,
  borderColor,
  className = '',
}) => {
  const { colors } = useAppStyle();

  // Size configurations
  const sizeConfig = {
    small: {
      height: 'h-10',
      paddingX: 'px-4',
      textSize: 'text-sm',
      iconSize: 16,
    },
    medium: {
      height: 'h-14',
      paddingX: 'px-6',
      textSize: 'text-base',
      iconSize: 20,
    },
    large: {
      height: 'h-16',
      paddingX: 'px-8',
      textSize: 'text-lg',
      iconSize: 24,
    },
  };

  const config = sizeConfig[size];

  // ✅ Sửa lỗi type: Đảm bảo luôn trả về mảng có ít nhất 2 phần tử
  const getGradientColors = (): readonly [ColorValue, ColorValue, ...ColorValue[]] => {
    if (gradientColors && gradientColors.length >= 2) {
      return gradientColors as readonly [ColorValue, ColorValue, ...ColorValue[]];
    }

    switch (variant) {
      case 'gradient':
        return ['#FFD600', '#F8BF16', '#FF8000'];
      case 'primary':
        return [colors.primary, colors.primary];
      case 'secondary':
        return [colors.secondary, colors.secondary];
      default:
        return ['#FFD600', '#F8BF16'];
    }
  };

  // ✅ Hàm lấy background color với ưu tiên custom
  const getBackgroundColor = (): string => {
    if (backgroundColor) return backgroundColor;
    
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      default:
        return colors.primary;
    }
  };

  // ✅ Hàm lấy text color với ưu tiên custom
  const getTextColor = (): string => {
    if (textColor) return textColor;
    
    if (disabled) return colors.textDisabled;
    
    if (variant === 'outline') {
      return borderColor || backgroundColor || colors.primary;
    }
    
    return colors.onPrimary;
  };

  // ✅ Hàm lấy border color với ưu tiên custom
  const getBorderColor = (): string => {
    if (borderColor) return borderColor;
    
    if (disabled) return colors.border;
    
    return backgroundColor || colors.primary;
  };

  const isOutline = variant === 'outline';
  const isGradient = variant === 'gradient';

  // ✅ Render button content với dynamic colors
  const ButtonContent = () => (
    <View className={`flex-row items-center justify-center gap-2 ${config.paddingX}`}>
      {loading ? (
        <ActivityIndicator 
          color={getTextColor()} 
          size={config.iconSize} 
        />
      ) : (
        <>
          {leftIcon}
          <Text
            className={`${config.textSize} font-bold`}
            style={{ color: getTextColor() }}
          >
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </View>
  );

  // ✅ Outline variant với custom colors
  if (isOutline) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={`${config.height} rounded-xl border-2 justify-center ${className}`}
        style={{
          borderColor: getBorderColor(),
          backgroundColor: 'transparent',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <ButtonContent />
      </TouchableOpacity>
    );
  }

  // ✅ Gradient variant - ĐÃ SỬA LỖI TYPE
  if (isGradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={className}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <View style={{ borderRadius: 12, overflow: 'hidden' }}>
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className={`${config.height} justify-center shadow-lg`}
          >
            <ButtonContent />
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }

  // ✅ Solid variants (primary, secondary) với custom background
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`${config.height} rounded-xl justify-center shadow-lg ${className}`}
      style={{
        backgroundColor: getBackgroundColor(),
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};