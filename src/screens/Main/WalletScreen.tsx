import CommonAppBar from '@/components/common/CommonAppBar';
import { useAppStyle } from '@/hooks/useAppStyles';
import React from 'react';
import { View } from 'react-native';

export default function WalletScreen() {
  const { colors, textStyles } = useAppStyle();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CommonAppBar title="Wallet" showBack={false} />

    </View>
  );
}
