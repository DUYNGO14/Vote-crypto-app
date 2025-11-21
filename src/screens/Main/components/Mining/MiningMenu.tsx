import { useAppStyle } from '@/hooks/useAppStyles';
import { MiningStackParamList } from '@/navigation/Stack/MiningStackNavigation';
import { Icons } from '@/utils/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  params?: any;
}
type MiningScreenNavigationProp = StackNavigationProp<
  MiningStackParamList,
  'MiningScreen'
>;
export default function MiningMenu() {
  const { colors } = useAppStyle();
  const navigation = useNavigation<MiningScreenNavigationProp>();

  const items = useMemo(() => [
    { label: 'Treasure', icon: <Icons.IcGold width={32} height={32} color={colors.primary} />, onPress: () => navigation.navigate('TreasureScreen') },
    { label: 'Friends', icon: <Icons.IcFriends width={32} height={32} color={colors.primary} />, onPress: () => navigation.navigate('FriendsScreen') },
    { label: 'Quest', icon: <Icons.IcQuests width={32} height={32} color={colors.primary} />, onPress: () => navigation.navigate('QuestScreen') },
    { label: 'Ranking', icon: <Icons.IcRanking width={32} height={32} color={colors.primary} />, onPress: () => navigation.navigate('RankingScreen') },
  ], [colors.primary, navigation]);


  return (
    <View className="rounded-2xl p-4" style={{ backgroundColor: colors.cardDark }}>
      <View className="flex-row justify-between">
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 mx-1"
            onPress={() => item.onPress?.()}
            activeOpacity={0.7}
          >
            {/* Square Container with Icon and Text */}
            <View
              className="aspect-square rounded-2xl justify-center items-center p-3"
              style={{
                backgroundColor: colors.background,
              }}
            >
              {/* Icon */}
              <View style={{ width: 32, height: 32, marginBottom: 8 }}>
                {item.icon}
              </View>

              {/* Label */}
              <Text
                className="text-xs font-medium text-center"
                style={{ color: colors.text }}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}