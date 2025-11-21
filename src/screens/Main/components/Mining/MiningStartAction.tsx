import { CommonButton } from '@/components/common/CommonButton';
import { showToast } from '@/components/common/CommonToast';
import { LOADING_STATUS } from '@/constants/status';
import { useAppStyle } from '@/hooks/useAppStyles';
import { useCountdown } from '@/hooks/useCountdown';
import { getBalanceAction, getMiningInfoAction, makeSelectStartMining, makeSelectStatusMining, resetStartMining, startMiningAction, statusMiningAction } from '@/store/reducers/miningSlice';
import { Icons } from '@/utils/icons';
import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';

export default function MiningStartAction() {
  const { colors } = useAppStyle();
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(makeSelectStartMining);
  const { data: dataCheck, status: statusCheck } = useSelector(makeSelectStatusMining);

  const [isMining, setIsMining] = useState(dataCheck?.isMining || false);

  const hasCalledEndActionRef = useRef(false);

  useEffect(() => {
    if (status === LOADING_STATUS.ERROR) {
      showToast({
        type: 'error',
        title: error || 'Start mining failed!',
        message: 'Please start mining again.',
      });
    }

    if (status === LOADING_STATUS.SUCCESS) {
      dispatch(statusMiningAction());
      dispatch(resetStartMining())
      dispatch(getBalanceAction())
      dispatch(getMiningInfoAction());
      showToast({
        type:"success",
        title:'Start mining point!',
      })
    }
  }, [status]);

  useEffect(() => {
    if (statusCheck === LOADING_STATUS.SUCCESS && dataCheck?.timeRemaining) {
      reset(); 
      start(); // Start countdown
    }

    if (statusCheck === LOADING_STATUS.ERROR) {
      showToast({
        type: 'error',
        title: error || 'Something went wrong!',
        message: 'Please reload app!',
      });
    }
  }, [statusCheck,dataCheck?.timeRemaining]);

  useEffect(() => {
    if (dataCheck?.isMining) {
      setIsMining(true);
    }
  }, [dataCheck]);

  const { formattedTime, start, reset} = useCountdown({
    initialSeconds: dataCheck?.timeRemaining!,
    autoStart: false,
    onCountdownEnd: () => {
      if (hasCalledEndActionRef.current) return;
      hasCalledEndActionRef.current = true;

      setIsMining(false);
      reset();
      dispatch(statusMiningAction());
      dispatch(getMiningInfoAction());
      showToast({
        type: 'success',
        title: 'Mining time ended!',
        message: 'Please start mining again.',
      });
    },
  });

  const handleStartMining = () => {
    hasCalledEndActionRef.current = false;
    dispatch(startMiningAction());
  };

  return (
    <View className="flex-row justify-between items-center w-full gap-2 px-4">
      {/* Start Mining button */}
      <View style={{ flex: 2 }}>
        <CommonButton
          title={isMining ? formattedTime : 'Start Mining'}
          variant={isMining ? 'outline' : 'gradient'}
          leftIcon={<Icons.IcMining width={20} height={20} color={isMining ? colors.primary : '#000'} />}
          backgroundColor={isMining ? '#000' : undefined}
          borderColor={isMining ? colors.primary : undefined}
          onPress={!isMining ? handleStartMining : undefined}
          disabled={isMining}
          forceOpacity
          // isActive={isMining}
          progressDuration={dataCheck?.timeRemaining!}
        />
      </View>

      {/* Boost HP button */}
      <View style={{ flex: 1 }}>
        <CommonButton
          title="Boost HP"
          variant="outline"
          leftIcon={<Icons.IcRocketYellow width={20} height={20} />}
          textColor={colors.text}
        />
      </View>
    </View>
  );
}
