import { CommonButton } from '@/components/common/CommonButton'
import { useAppStyle } from '@/hooks/useAppStyles';
import { useFormatCoin } from '@/hooks/useFormatCoin';
import { makeSelectBalance, makeSelectCheckMining, makeSelectMiningInfo, makeSelectStatusMining } from '@/store/reducers/miningSlice';
import { Icons } from '@/utils/icons';
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux';

export default function MiningHeader() {
  const { colors } = useAppStyle();
  const { formatCoin } = useFormatCoin();
  const balance = useSelector(makeSelectBalance)
  const miningInfo = useSelector(makeSelectMiningInfo)
  const statusMining = useSelector(makeSelectStatusMining);
  console.log("Balance",balance)
  console.log("Mining info:",miningInfo)
  console.log("Status Mining:",statusMining)
  return (
    <View className="flex-col items-center justify-center gap-4 w-full">
      <View className="flex-row items-center gap-1">
        <Icons.IcCoin width={36} height={36}/>
        <Text className="text-3xl font-bold text-center" style={{ color: colors.text }}>{formatCoin(balance?.data?.currentBalance || 0)}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <CommonButton
          title={`${miningInfo?.data?.totalHashpower?.total || 0} HP`}
          variant="outline"
          textColor={colors.text}
          leftIcon={<Icons.IcRocketYellow width={20} height={20} />}
        />
        <CommonButton
          title={`${statusMining?.data?.tokensPerSecond || 0} FP/s`}
          variant="outline"
          textColor={colors.text}
          leftIcon={<Icons.IcHashPower width={20} height={20} />}
        />
      </View>
    </View>
  )
}
