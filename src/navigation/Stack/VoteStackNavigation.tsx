// navigators/HomeStackNavigator.tsx
import VoteScreen from '@/screens/Main/VoteScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


export type VoteStackParamList = {
  VoteScreen: undefined;
};

const Stack = createStackNavigator<VoteStackParamList>();

export default function VoteStackNavigation() {
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VoteScreen" component={VoteScreen} />
    </Stack.Navigator>
  );
}
