// navigators/HomeStackNavigator.tsx
import { NewsScreen } from '@/screens/Main';
import { PostDetailScreen } from '@/screens/Main/widget/WidgetMining';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


export type NewsStackParamList = {
  PostDetailScreen: undefined;
  NewsScreen: undefined;
};

const Stack = createStackNavigator<NewsStackParamList>();

export default function NewsStackNavigation() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="NewsScreen">
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
    </Stack.Navigator>
  );
}
