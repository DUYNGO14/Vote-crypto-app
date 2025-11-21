// CommonToolTip.tsx
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, Text, Animated, ViewStyle } from 'react-native';

interface CommonToolTipProps {
  children: React.ReactNode;
  tooltip: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  delayLongPress?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const CommonToolTip: React.FC<CommonToolTipProps> = ({
  children,
  tooltip,
  tooltipPosition = 'bottom',
  backgroundColor = '#333',
  textColor = '#fff',
  delayLongPress = 300,
  onPress,
  onLongPress,
  disabled = false,
  style,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showTooltipWithAnimation = () => {
    setShowTooltip(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowTooltip(false));
    }, 2000);
  };

  const handleLongPress = () => {
    showTooltipWithAnimation();
    onLongPress?.();
  };

  const getTooltipPositionClass = () => {
    switch (tooltipPosition) {
      case 'top':
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      default:
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <View className="relative" style={style}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={handleLongPress}
        delayLongPress={delayLongPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>

      {showTooltip && (
        <Animated.View
          className={`absolute px-2.5 py-1.5 rounded-md z-10 min-w-[100px] ${getTooltipPositionClass()}`}
          style={{
            backgroundColor,
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text 
            className="text-xs text-center" 
            style={{ color: textColor }} 
            numberOfLines={1}
          >
            {tooltip}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};