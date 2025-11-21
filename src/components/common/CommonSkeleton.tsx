// CommonSkeleton.tsx
import React, { useEffect } from 'react';
import { DimensionValue, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface CommonSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  backgroundColor?: string;
  highlightColor?: string;
  animationDuration?: number;
}

export const CommonSkeleton: React.FC<CommonSkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  backgroundColor = '#2A2A2A',
  highlightColor = '#3A3A3A',
  animationDuration = 1500,
}) => {
  const translateX = useSharedValue(-1);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, {
        duration: animationDuration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [animationDuration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 200, // Điều chỉnh khoảng cách di chuyển
        },
      ],
    };
  });

  return (
    <View
      style={[
        {
          width: width as DimensionValue,
          height,
          borderRadius,
          backgroundColor,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            position: 'absolute',
          },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={[backgroundColor, highlightColor, backgroundColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: '200%',
            height: '100%',
          }}
        />
      </Animated.View>
    </View>
  );
};

// Component để tạo nhiều skeleton lines
interface SkeletonLinesProps {
  lines?: number;
  lineHeight?: number;
  gap?: number;
  lastLineWidth?: string | number;
  style?: ViewStyle;
}

export const SkeletonLines: React.FC<SkeletonLinesProps> = ({
  lines = 3,
  lineHeight = 12,
  gap = 8,
  lastLineWidth = '60%',
  style,
}) => {
  return (
    <View style={style}>
      {Array.from({ length: lines }).map((_, index) => (
        <CommonSkeleton
          key={index}
          height={lineHeight}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          style={{ marginBottom: index < lines - 1 ? gap : 0 }}
        />
      ))}
    </View>
  );
};

// Component cho Card skeleton
interface SkeletonCardProps {
  imageHeight?: number;
  titleLines?: number;
  showButton?: boolean;
  style?: ViewStyle;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  imageHeight = 87,
  titleLines = 2,
  showButton = true,
  style,
}) => {
  return (
    <View className="w-[177px]" style={style}>
      {/* Image */}
      <CommonSkeleton height={imageHeight} borderRadius={12} />

      {/* Title */}
      <SkeletonLines
        lines={titleLines}
        lineHeight={12}
        gap={6}
        lastLineWidth="60%"
        style={{ marginTop: 10 }}
      />

      {/* Button */}
      {showButton && (
        <CommonSkeleton
          height={12}
          width={80}
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
};