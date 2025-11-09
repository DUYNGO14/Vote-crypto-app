import { useAppStyle } from '@/hooks/useAppStyles';
import { Icons } from '@/utils/icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CommonAppBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  left?: ReactNode;
  style?: any;
  className?: string;
  titleAlign?: 'left' | 'center' | 'right';
}

export default function CommonAppBar({
  title,
  showBack = true,
  onBack,
  right,
  left,
  style,
  className = '',
  titleAlign = 'center',
}: CommonAppBarProps) {
  const nav = useNavigation();
  const { colors, textStyles } = useAppStyle();

  const handleBack = () => {
    if (onBack) return onBack();
    nav.goBack();
  };

  const getTitleAlignment = () => {
    switch (titleAlign) {
      case 'left': return 'items-start';
      case 'right': return 'items-end';
      default: return 'items-center';
    }
  };

  return (
    <SafeAreaView edges={['top']}>
      <View
        className={`flex-row items-center justify-between h-14 px-4 ${className}`}
        style={[{ backgroundColor:'#121212' }, style]}
      >
        {/* Left Section - Back Button or Custom Left Content */}
        <View className="flex-1 items-start">
          {left || (showBack && (
            <TouchableOpacity
              onPress={handleBack}
              className="w-8 h-8 items-center justify-center rounded-lg"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icons.IcBack width={24} height={24} color='#fff' />
            </TouchableOpacity>
          ))}
        </View>

        {/* Center Section - Title */}
        <View className={`flex-2 mx-2 ${getTitleAlignment()}`}>
          {title && (
            <Text
              className="text-lg font-semibold"
              style={{ color:'#fff' }}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
        </View>

        {/* Right Section - Custom Content */}
        <View className="flex-1 items-end">
          {right || <View className="w-8 h-8" />}
        </View>
      </View>
    </SafeAreaView>
  );
}