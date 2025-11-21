// navigators/HomeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MiningScreen from '@/screens/Main/MiningScreen';
import { FriendsScreen, PostDetailScreen, RankingScreen, TreasureScreen } from '@/screens/Main/widget/WidgetMining';
import QuestScreen from '@/screens/Main/widget/WidgetMining/QuestScreen';

export type MiningStackParamList = {
  MiningScreen: undefined;
  TreasureScreen: undefined;
  FriendsScreen: undefined;
  RankingScreen: undefined;
  QuestScreen: undefined;
  HashPower: undefined;
  PostDetailScreen: { postId: string } | undefined;
  HashPowerScreen: undefined;
  HistoryMiningScreen: undefined;
};

const Stack = createStackNavigator<MiningStackParamList>();

export default function MiningStackNavigation() {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      detachPreviousScreen: false,
    }}>
      <Stack.Screen name="MiningScreen" component={MiningScreen} />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
      <Stack.Screen name="TreasureScreen" component={TreasureScreen} />

      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="RankingScreen" component={RankingScreen} />
      <Stack.Screen name="QuestScreen" component={QuestScreen} />
      {/* <Stack.Screen
       name="HashPower" 
       component={HashPowerStack} 
       options={{ 
        headerShown: false,
        }}
        />
      
      <Stack.Screen name="HistoryMiningScreen" component={HistoryMiningScreen} /> */}
    </Stack.Navigator>
  );
}
