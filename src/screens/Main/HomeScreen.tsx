import { useAppStyle } from '@/hooks/useAppStyles';
import { useTheme } from '@/providers/ThemeProvider';
import Icons from '@assets/icons/ic-vote.svg';
import React from 'react';
import { Button, Text, View } from 'react-native';

const HomeScreen = () => {
  const { toggleTheme } = useTheme();
  const { colors, textStyles: typography } = useAppStyle();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} className="items-center justify-center p-4">
      <Text style={typography.H05} className="mb-4">Home Screen</Text>
      <Button title="Toggle Theme" color={colors.primary} onPress={toggleTheme} />
      <Text style={typography.H01} className="mt-4 text-center">
        Welcome to the Home Screen! Use the button above to switch between Light and Dark themes.
      </Text>
      <Icons width={100} height={100} fill={colors.text} className="mt-4" />
    </View>
  );
};

export default HomeScreen;
