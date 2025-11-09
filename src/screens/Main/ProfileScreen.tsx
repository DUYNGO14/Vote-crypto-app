import { useAppStyle } from '@/hooks/useAppStyles';
import { useTheme } from '@/providers/ThemeProvider';
import Icons from '@assets/icons/ic-vote.svg';
import React from 'react';
import { Button, Text, View } from 'react-native';

const ProfileScreen = () => {
  const { toggleTheme } = useTheme();
  const { colors, textStyles: typography } = useAppStyle();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} className="items-center justify-center p-4">
      <Text style={typography.H05} className="mb-4">Profile Screen</Text>
      <Button title="Toggle Theme" color={colors.primary} onPress={toggleTheme} />
      <Icons width={100} height={100} fill={colors.text} className="mt-4" />
    </View>
  );
};

export default ProfileScreen;
