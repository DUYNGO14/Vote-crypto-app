// navigators/HomeStackNavigator.tsx
import SettingScreen from '@/screens/Main/SettingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


export type SettingStackParamList = {
  SettingScreen: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

export default function SettingStackNavigation() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
}
