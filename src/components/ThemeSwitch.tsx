import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useTheme } from '@/providers/ThemeProvider';
import { Icons } from '@/utils/icons';

export const ThemeSwitch = () => {
  const { isDark, toggleTheme } = useTheme();
  const { colors } = useAppStyle();

  const anim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFD700', '#2C2C2C'],
  });

  return (
    <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
      <Animated.View
        className="w-[50px] h-[26px] rounded-full p-[2px] justify-center"
        style={{ backgroundColor }}
      >
        <Animated.View
          className="w-[22px] h-[22px] rounded-full items-center justify-center shadow-md"
          style={{
            transform: [{ translateX }],
            backgroundColor: colors.background,
          }}
        >
          {isDark ? (
            <Icons.IcMoon width={24} height={24} color="#FFD700" />
          ) : (
            <Icons.IcSun width={24} height={24} color="#FFA500" />
          )}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};
