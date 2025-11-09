import { useTheme } from '@/providers/ThemeProvider';
import { StyleSheet, TextStyle } from 'react-native';

export const Typography = StyleSheet.create({
  H05: { fontFamily: 'Roboto-Bold', fontWeight: '600', fontSize: 43 },
  H04: { fontFamily: 'Roboto-SemiBold', fontWeight: '600', fontSize: 34 },
  H03: { fontFamily: 'Roboto-SemiBold', fontWeight: '600', fontSize: 27 },
  H02: { fontFamily: 'Roboto-SemiBold', fontWeight: '600', fontSize: 22 },
  H01: { fontFamily: 'Roboto-Medium', fontWeight: '600', fontSize: 16 },
  H01Bold: { fontFamily: 'Roboto-Bold', fontWeight: '600', fontSize: 16 },
  Text: { fontFamily: 'Roboto-Regular', fontWeight: '400', fontSize: 14 },
  Note: { fontFamily: 'Roboto-Regular', fontWeight: '400', fontSize: 10 },
  NoteBold: { fontFamily: 'Roboto-Bold', fontWeight: '600', fontSize: 10 },
});

export const FontWeights = StyleSheet.create({
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semiBold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
});

// =======================
// Hook tối ưu
// =======================
export function useThemedTypography() {
  const { colors } = useTheme();

  const colorMap: Record<string, string> = {
    Primary: colors.text,
    Secondary: colors.textSecondary,
    Accent: colors.primary,
    Success: colors.success,
    Warning: colors.warning,
    Error: colors.error,
  };

  const themedTypography: Record<string, TextStyle[]> = {};

  Object.entries(Typography).forEach(([key, style]) => {
    Object.entries(colorMap).forEach(([suffix, color]) => {
      themedTypography[`${key}_${suffix}`] = [style, { color }];
    });
  });

  return { ...Typography, ...FontWeights, ...themedTypography };
}
