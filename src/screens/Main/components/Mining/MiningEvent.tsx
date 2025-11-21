import { useAppStyle } from '@/hooks/useAppStyles';
import { Icons } from '@/utils/icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MiningEvent() {
  const { colors } = useAppStyle();

  const handleInvite = () => {
    // Navigate to invite screen
    console.log('Navigate to invite');
  };

  return (
    <View className="rounded-2xl p-4" style={{ backgroundColor: colors.cardDark }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleInvite}
      >
        <View
          className="flex-row justify-between items-center rounded-2xl p-4 gap-3"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.primary,
            borderWidth: 1,
          }}
        >
          {/* --- Left section --- */}
          <View className="flex-row items-center gap-2 flex-1">
            <Icons.IcAccount_Check width={26} height={26} color={colors.primary} />
            <Text
              style={{ color: colors.text }}
              className="text-base font-bold flex-1"
              numberOfLines={2}
            >
              1 More Friend = 28% bonus rate, uncaped!
            </Text>
          </View>

          {/* --- Right section --- */}
          <View className="flex-row items-center gap-2 flex-shrink-0">
            <Text style={{ color: colors.primary }} className="text-base font-bold">
              Invite now
            </Text>
            <Icons.IcChevronRight width={26} height={26} color={colors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}