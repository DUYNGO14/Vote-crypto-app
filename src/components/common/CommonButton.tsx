// CommonButton.tsx
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, ColorValue, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing, withRepeat } from 'react-native-reanimated';
import { useAppStyle } from '@/hooks/useAppStyles';

interface CommonButtonProps {
  title: string;
  onPress?: () => void;
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
  forceOpacity?: boolean;
  progressDuration?: number; // ms
  isActive?: boolean;
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
  forceOpacity = false,
  progressDuration,
  isActive,
}) => {
  const { colors } = useAppStyle();

  const sizeConfig = {
    small: { height: 'h-10', paddingX: 'px-4', textSize: 'text-sm', iconSize: 16 },
    medium: { height: 'h-14', paddingX: 'px-6', textSize: 'text-base', iconSize: 20 },
    large: { height: 'h-16', paddingX: 'px-8', textSize: 'text-lg', iconSize: 24 },
  };
  const config = sizeConfig[size];

  const isOutline = variant === 'outline';
  const isGradient = variant === 'gradient';

  const getGradientColors = (): readonly [ColorValue, ColorValue, ...ColorValue[]] => {
    if (gradientColors && gradientColors.length >= 2)
      return gradientColors as readonly [ColorValue, ColorValue, ...ColorValue[]];
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

  const getTextColor = (): string => {
    if (textColor) return textColor;
    if (disabled && variant !== 'outline') return colors.textDisabled;
    if (variant === 'outline') return borderColor || backgroundColor || colors.primary;
    return colors.onPrimary;
  };

  const getBorderColor = (): string => {
    if (borderColor) return borderColor;
    if (disabled) return colors.border;
    return backgroundColor || colors.primary;
  };

  const finalOpacity = forceOpacity ? 1 : disabled ? 0.5 : 1;

  // --- Reanimated progress ---
  const progress = useSharedValue(0);
  const stripesAnim = useSharedValue(0);

  // chạy từ 0 → 100%
  useEffect(() => {
    if (!progressDuration || !isActive) {
      progress.value = 0;
      stripesAnim.value = 0;
      return;
    }
    
    // Animation progress bar
    progress.value = withTiming(1, { 
      duration: progressDuration, 
      easing: Easing.linear 
    });
    
    // Animation cho các vạch chéo (loop vô hạn)
    stripesAnim.value = withRepeat(
      withTiming(1, { 
        duration: 1500, 
        easing: Easing.linear 
      }),
      -1, // repeat infinitely
      false // don't reverse
    );

    return () => {
      stripesAnim.value = 0;
    };
  }, [progressDuration, isActive]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const stripesStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: stripesAnim.value * 20 }],
  }));

  const handlePress = () => {
    if (disabled || loading) return;
    onPress?.();
  };

  // Tạo các vạch chéo
  const renderStripes = () => {
    const stripes = [];
    const numberOfStripes = 50;
    const stripeWidth = 10;
    const gapWidth = 10;
    const patternWidth = stripeWidth + gapWidth;

    for (let i = 0; i < numberOfStripes; i++) {
      stripes.push(
        <View
          key={i}
          style={{
            position: 'absolute',
            left: i * patternWidth,
            width: stripeWidth,
            height: '300%',
            top: '-100%',
            transform: [{ rotate: '-45deg' }],
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
          }}
        />
      );
    }
    return stripes;
  };

  const renderProgressBar = () => {
    if (!progressDuration || !isActive) return null;
    
    // Lấy borderRadius dựa trên variant
    const radius = isOutline ? 10 : 10; // outline có border-2, nên trừ đi 2px
    
    return (
      <>
        {/* Progress background */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            progressStyle,
            { 
              overflow: 'hidden', 
              zIndex: 0, 
              borderTopLeftRadius: radius,
              borderBottomLeftRadius: radius,
            },
          ]}
        >
          <LinearGradient
            colors={['#F8BF16', '#F8BF16']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>

        {/* Animated stripes */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            progressStyle,
            { 
              overflow: 'hidden', 
              zIndex: 1, 
              borderTopLeftRadius: radius,
              borderBottomLeftRadius: radius,
            },
          ]}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: -15,
                top: 0,
                bottom: 0,
                width: 1000,
                flexDirection: 'row',
              },
              stripesStyle,
            ]}
          >
            {renderStripes()}
          </Animated.View>
        </Animated.View>
      </>
    );
  };

  const ButtonContent = () => (
    <View className={`flex-row items-center justify-center gap-2 ${config.paddingX}`} style={{ zIndex: 2 }}>
      {loading ? (
        <ActivityIndicator color={getTextColor()} size={config.iconSize} />
      ) : (
        <>
          {leftIcon}
          <Text className={`${config.textSize} font-bold`} style={{ color: getTextColor() }}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </View>
  );

  // --- Render ---
  if (isOutline) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={`${config.height} justify-center ${className}`}
        style={{
          borderRadius: 12,
          borderWidth: 2,
          borderColor: getBorderColor(),
          backgroundColor: 'transparent',
          opacity: finalOpacity,
          overflow: 'hidden',
        }}
      >
        {renderProgressBar()}
        <ButtonContent />
      </TouchableOpacity>
    );
  }

  if (isGradient) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={className}
        style={{ opacity: finalOpacity }}
      >
        <View style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
          {renderProgressBar()}
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

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`${config.height} justify-center shadow-lg ${className}`}
      style={{ 
        borderRadius: 12,
        backgroundColor: getBackgroundColor(), 
        opacity: finalOpacity, 
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {renderProgressBar()}
      <ButtonContent />
    </TouchableOpacity>
  );
};