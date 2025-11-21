import CommonAppBar from '@/components/common/CommonAppBar';
import { useAppStyle } from '@/hooks/useAppStyles';
import React from 'react';
import { Text, View } from 'react-native';

const SettingScreen = () => {
  const { colors, textStyles: typography } = useAppStyle();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CommonAppBar title="Setting" showBack={false} />
      
    </View>
  );
};

export default SettingScreen;
