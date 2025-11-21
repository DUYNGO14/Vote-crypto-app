// navigators/HomeStackNavigator.tsx
import WalletScreen from '@/screens/Main/WalletScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


export type WalletStackParamList = {
  WalletScreen: undefined;
};

const Stack = createStackNavigator<WalletStackParamList>();

export default function WalletStackNavigation() {
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
    </Stack.Navigator>
  );
}
