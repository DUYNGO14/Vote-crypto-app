import CommonAppBar from '@/components/common/CommonAppBar';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

export default function RankingScreen() {
  const { colors } = useAppStyle();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CommonAppBar
        title="Ranking"
        showBack
        onBack={() => navigation.goBack()}
      />

    </View>
  )
}
