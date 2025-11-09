// hooks/useNavigation.ts
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigation/types';

export const useAppNavigation = () => {
  return useNavigation<StackNavigationProp<AuthStackParamList>>();
};