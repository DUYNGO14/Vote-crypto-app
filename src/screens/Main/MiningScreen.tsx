import CommonAppBar from '@/components/common/CommonAppBar';
import CommonAvatar from '@/components/common/CommonAvatar';
import { CommonToolTip } from '@/components/common/CommonToolTip';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useAppStyle } from '@/hooks/useAppStyles';
import { MiningClaimAction, MiningEvent, MiningHeader, MiningLogo, MiningMenu, MiningNewPost, MiningStartAction } from '@/screens/Main/components/Mining';
import { RootState } from '@/store';
import { selectCurrentUser } from '@/store/reducers/authSlice';
import { getBalanceAction, getMiningInfoAction, makeSelectStatusMining, statusMiningAction } from '@/store/reducers/miningSlice';
import { Icons } from '@/utils/icons';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const MiningScreen = () => {
  const dispatch = useDispatch();
  const { colors, textStyles: typography } = useAppStyle();
  const { data: user } = useSelector(selectCurrentUser);
  const { data: statusMining } = useSelector(makeSelectStatusMining);
  useEffect(() => {
    dispatch(getBalanceAction());
    dispatch(getMiningInfoAction());
    dispatch(statusMiningAction());
  },[dispatch]);
  const unreadCount = 105;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* APP BAR */}
      <CommonAppBar
        left={
          <View className="items-center flex-row gap-2">
            <CommonAvatar
              avatar={user?.avatar}
              fullname={user?.displayName}
              size={30}
              backgroundColor={colors.primary}
            />
            <Text
              style={[typography.H01Bold]}
              numberOfLines={1}
            >
              {user?.displayName || 'Anonymous'}
            </Text>
            <CommonToolTip tooltip="Tutorial" tooltipPosition="right" onPress={() => { }}>
              <Icons.IcTutorial width={20} height={20} />
            </CommonToolTip>
          </View>
        }
        right={
          <View className='flex-row gap-2 justify-center items-center'>
            <ThemeSwitch />
            <TouchableOpacity>
              <View className="relative">
                <Icons.IcNotification width={24} height={24} color={colors.text} />
                {unreadCount > 0 && (
                  <View
                    className="absolute -top-1.5 -right-1.5 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: 'red',
                      minWidth: 18,
                      height: 18,
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      allowFontScaling={false}
                    >
                      {unreadCount > 99 ? '0' : unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
      >
        <MiningHeader />
        {/* LOGO */}
        <MiningLogo isMining />
        {/* Action start */}
        <MiningStartAction />
        {/* Action claim */}
        <MiningClaimAction />
        {/* Event */}
        <MiningEvent />
        {/* Menu */}
        <MiningMenu />
        {/* Post */}
        <MiningNewPost />
      </ScrollView>
    </View>
  );
};

export default MiningScreen;