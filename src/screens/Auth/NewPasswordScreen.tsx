import { useAppStyle } from '@/hooks/useAppStyles';
import { useTheme } from '@/providers/ThemeProvider';
import { Icons } from '@/utils/icons';
import React from 'react'
import { Button } from 'react-native';
import { Text, View } from 'react-native';

export default function NewPasswordScreen() {
  const { toggleTheme } = useTheme();
  const { colors, textStyles: typography } = useAppStyle();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} className="items-center justify-center p-4">
      <Text style={typography.H05} className="mb-4">New Password</Text>
      <Button title="Toggle Theme" color={colors.primary} onPress={toggleTheme} />
      <Icons.IcLogo width={100} height={100} fill={colors.text} className="mt-4" />
    </View>
  );
}

