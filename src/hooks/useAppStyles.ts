
import { useTheme } from '@/providers/ThemeProvider';
import { Typography } from '@/utils/Typography';

export const useAppStyle = () => {
  const { colors } = useTheme();

  const textStyles = {
    H05: { ...Typography.H05, color: colors.text },
    H04: { ...Typography.H04, color: colors.text },
    H03: { ...Typography.H03, color: colors.text },
    H02: { ...Typography.H02, color: colors.text },
    H02Bold: { ...Typography.H02Bold, color: colors.text },
    H01: { ...Typography.H01, color: colors.text },
    H01Bold: { ...Typography.H01Bold, color: colors.text },
    Text: { ...Typography.Text, color: colors.text },
    Note: { ...Typography.Note, color: colors.text },
    NoteBold: { ...Typography.NoteBold, color: colors.text },
  };

  return {
    textStyles,
    colors,
  };
};
