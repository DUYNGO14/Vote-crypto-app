import { CommonButton } from '@/components/common/CommonButton';
import { showToast } from '@/components/common/CommonToast';
import { CommonToolTip } from '@/components/common/CommonToolTip';
import { LOADING_STATUS } from '@/constants/status';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useCountdown } from '@/hooks/useCountdown';
import { useFormatCoin } from '@/hooks/useFormatCoin';
import {
  claimMiningAction,
  getBalanceAction,
  getMiningInfoAction,
  makeSelectClaimMining,
  makeSelectStatusMining,
  resetClaimMining,
  statusMiningAction
} from '@/store/reducers/miningSlice';
import { Icons } from '@/utils/icons';
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function MiningClaimAction() {
  const dispatch = useDispatch();
  const { status, data } = useSelector(makeSelectStatusMining)
  const { status: statusClaim, data: dataClaim } = useSelector(makeSelectClaimMining)
  const { colors } = useAppStyle();
  const hasCalledEndActionRef = useRef(false);
  // Khi nhận claim mới từ API (mỗi lần claim thành công)
  useEffect(() => {
    if (statusClaim === LOADING_STATUS.SUCCESS) {
      dispatch(statusMiningAction());
      dispatch(getBalanceAction());
      dispatch(getMiningInfoAction()); // lấy claimRemaining mới
      dispatch(resetClaimMining());

      hasCalledEndActionRef.current = false; // 👈 Reset tại đây vì sẽ có countdown mới
    }
    if (statusClaim === LOADING_STATUS.ERROR) {
      showToast({
        type: 'error',
        title: 'Claim Mining failed!',
        message: 'Please claim mining again.',
      });
    }
  }, [statusClaim, dispatch]);

  // const [isMining, setIsMining] = useState(false);
  const { formatCoin } = useFormatCoin();

  useEffect(() => {
    if (status === LOADING_STATUS.SUCCESS && data) {
      if (data.claimRemaining > 0 && data.isMining) {
        hasCalledEndActionRef.current = false; // 👈 Reset để countdown mới có thể call API
        reset();
        start();
      } else {
        reset(); // hết phiên đào
      }
    }
  }, [status, data]);
  const { formattedTime, start, reset } = useCountdown({
    initialSeconds: data?.claimRemaining!,
    autoStart: false,
    onCountdownEnd: () => {
      if (hasCalledEndActionRef.current) return;
      hasCalledEndActionRef.current = true;

      dispatch(statusMiningAction());
      showToast({
        type: 'success',
        title: 'Claim Mining time ended!',
        message: 'Press button claim now.',
      });
    },
  });


  // Khi user nhấn claim
  const handleClaimMining = () => {
    hasCalledEndActionRef.current = false; // 👈 Chuẩn bị cho countdown sau khi claim mới
    dispatch(claimMiningAction());
  };
  return (
    <View className='rounded-2xl p-4' style={[{ backgroundColor: colors.cardDark }]}>
      <View className='flex-col justify-center rounded-2xl p-4 gap-3' style={[{ backgroundColor: colors.background, borderColor: colors.primary, borderWidth: 1 }]}>
        <View className='flex-row justify-between items-center w-full gap-2'>
          <View className='flex-row gap-1'>
            <Icons.IcCoin width={36} height={36} />
            <Text className="text-3xl font-bold text-center" style={{ color: colors.text }}>{formatCoin(data?.unclaimedBalance ?? 0)}</Text>
          </View>
          <CommonToolTip tooltip="View History" tooltipPosition="left" onPress={() => { }}>
            <Icons.IcHistory width={24} height={24} color={colors.iconColor} />
          </CommonToolTip>
        </View>

        <CommonButton
          title={data?.isMining && !data?.canClaim && data?.claimRemaining > 0 ? formattedTime : 'Claim'}
          variant={!data?.canClaim ? 'outline' : 'gradient'}
          leftIcon={<Icons.IcArrowRight width={20} height={20} color={!data?.canClaim ? colors.primary : colors.cardDark} />}
          backgroundColor={!data?.canClaim ? colors.cardDark : undefined}
          borderColor={!data?.canClaim ? colors.primary : undefined}
          onPress={data?.canClaim ? handleClaimMining : undefined}
          disabled={!data?.canClaim}
          forceOpacity
          isActive={!data?.canClaim && data?.isMining}
          progressDuration={data?.claimRemaining!}
        />
      </View>
    </View>
  )
}