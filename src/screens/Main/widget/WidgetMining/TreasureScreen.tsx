import CommonAppBar from '@/components/common/CommonAppBar';
import { CommonButton } from '@/components/common/CommonButton';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useFormatCoin } from '@/hooks/useFormatCoin';
import CardTreasure from '@/screens/Main/components/Treasure/CardTreasure';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function TreasureScreen() {
  const navigation = useNavigation();
  const { colors, textStyles } = useAppStyle();
  const { formatCoin } = useFormatCoin();

  const [activeTab, setActiveTab] = useState<'rewards' | 'milestones'>('rewards');
  const TreasureData = [
    {
      id: '1',
      point: 1000,
      title: 'Title',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
      isClaimed: false
    },
    {
      id: '2',
      point: 1000,
      title: 'Title',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
      isClaimed: false
    },
    {
      id: '3',
      point: 1000,
      title: 'Title',
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
      isClaimed: true
    },
  ]
  return (
    <View style={{ flex: 1, flexDirection: 'column', gap: 16, backgroundColor: colors.background }}>
      <CommonAppBar
        title="Treasure"
        showBack
        onBack={() => navigation.goBack()}
      />
      <View className="flex-row items-center justify-center gap-2">
        <CommonButton
          title="Rewards"
          variant={activeTab === 'rewards' ? 'primary' : 'outline'}
          textColor={colors.text}
          onPress={() => setActiveTab('rewards')}
        />
        <CommonButton
          title="Milestones"
          variant={activeTab === 'milestones' ? 'primary' : 'outline'}
          textColor={colors.text}
          onPress={() => setActiveTab('milestones')}
        />
      </View>
      <FlatList
        data={TreasureData}
        renderItem={({ item }) => (<CardTreasure item={item} />)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (<Text style={[textStyles.Text, { color: colors.textLight, textAlign: 'center' }]}>No data</Text>)}
      />
    </View>
  )
}
