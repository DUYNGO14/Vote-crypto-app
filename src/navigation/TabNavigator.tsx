import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/providers/ThemeProvider';
import { Icons } from '@utils/icons';
import HomeScreen from '@/screens/Main/HomeScreen';
import ProfileScreen from '@/screens/Main/ProfileScreen';

const Tab = createBottomTabNavigator();
const HEIGHT_TAB_BAR = 70;

export default function TabNavigator() {
  const { colors } = useTheme();

  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.tabBarBackground,
            borderTopColor: colors.border,
            height: HEIGHT_TAB_BAR,
            paddingBottom: 10,
            paddingTop: 5,
            borderTopWidth: 0.6,
          },
          tabBarActiveTintColor: colors.tabBarActive,
          tabBarInactiveTintColor: colors.tabBarInactive,
        }}
      >
        <Tab.Screen
          name="Mining"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcMining width={size} height={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Vote"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcVote width={size} height={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Center"
          component={View}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' },
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcWallet width={size} height={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcSetting width={size} height={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Logo ở giữa, nằm trên border */}
      <View 
        className="absolute left-1/2 -ml-[30px]"
        style={{ bottom: HEIGHT_TAB_BAR / 2 }}
      >
        <TouchableOpacity
          className="w-[60px] h-[60px] rounded-full justify-center items-center shadow-lg"
          style={{ 
            backgroundColor: colors.tabBarActive,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => {
            console.log('Center logo pressed');
          }}
          activeOpacity={0.8}
        >
          <Icons.IcLogoWhite width={40} height={40} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}