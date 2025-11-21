import { CommonButton } from '@/components/common/CommonButton';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useFormatCoin } from '@/hooks/useFormatCoin';
import { Icons } from '@/utils/icons';
import React from 'react'
import { Text } from 'react-native';
import { View } from 'react-native';

interface CardTreasureProps {
  item: {
    id: string;
    title: string;
    description: string;
    point: number;
    isClaimed: boolean;
  }
}

export default function CardTreasure({ item }: CardTreasureProps) {
  const { colors, textStyles } = useAppStyle();
  const { formatCoin } = useFormatCoin();
  return (
    <View className="flex-row items-center rounded-2xl p-4 gap-2 mb-3" style={{ backgroundColor: colors.cardDark }}>
      <View className='p-2 rounded-xl' style={{ backgroundColor: colors.card }}>
        <Icons.IcCoin width={50} height={50} color={colors.primary} />
      </View>
      <View className="flex-col items-start gap-1 flex-1">
        <Text
          style={[textStyles.Text]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[textStyles.Text, { color: colors.textLight }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
      <View className='flex-col gap-1 items-center flex-shrink-0'>
        <View className="flex-row items-center gap-0">
          <Icons.IcCoin width={32} height={32} color={colors.primary} />
          <Text style={{ color: colors.text }}>{formatCoin(12345.60000)}</Text>
        </View>
        <CommonButton
          className='w-full'
          title={item.isClaimed ? 'Claimed' : 'Claim Now'}
          variant="primary"
          backgroundColor={item.isClaimed ? colors.textDisabled : colors.primary}
          textColor={colors.text}
          disabled={item.isClaimed}
          size='small'
        />
      </View>
    </View>
  )
}