import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';

import { MiningStackNavigation, SettingStackNavigation, VoteStackNavigation, WalletStackNavigation } from './Stack';

import { useTheme } from '@/providers/ThemeProvider';
import { Icons } from '@utils/icons';

const Tab = createBottomTabNavigator();
const HEIGHT_TAB_BAR = 70;

function EmptyScreen() {
  return null;
}

export default function TabNavigator() {
  const { colors } = useTheme();

  // Memoize tab bar button để tránh re-render không cần thiết
  const CenterTabButton = useCallback(() => (
    <View style={{ width: 60, height: 60 }} />
  ), []);

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
          // Tắt animation để cải thiện performance
          tabBarHideOnKeyboard: true,
          // Lazy load screens
          lazy: true,
          // Tối ưu cho Android
          ...(Platform.OS === 'android' && {
            tabBarStyle: {
              backgroundColor: colors.tabBarBackground,
              borderTopColor: colors.border,
              height: HEIGHT_TAB_BAR,
              paddingBottom: 10,
              paddingTop: 5,
              borderTopWidth: 0.6,
              elevation: 0, // Giảm shadow trên Android
            },
          }),
        }}
        // Thêm detachInactiveScreens để unmount screens không active
        detachInactiveScreens={true}
      >
        <Tab.Screen
          name="Mining"
          component={MiningStackNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcMining width={size} height={size} color={color} />
            ),
            // Thêm tabBarButton tùy chỉnh với hitSlop
            tabBarButton: (props) => {
              const { children, onPress, onLongPress, accessibilityRole, style, ...rest } = props;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  accessibilityRole={accessibilityRole}
                  style={style}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {children}
                </TouchableOpacity>
              );
            },
          }}
        />
        <Tab.Screen
          name="Vote"
          component={VoteStackNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcVote width={size} height={size} color={color} />
            ),
            tabBarButton: (props) => {
              const { children, onPress, onLongPress, accessibilityRole, style } = props;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  accessibilityRole={accessibilityRole}
                  style={style}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {children}
                </TouchableOpacity>
              );
            },
          }}
        />
        <Tab.Screen
          name="Center"
          component={EmptyScreen}
          options={{
            tabBarButton: CenterTabButton,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Ngăn navigation
            },
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletStackNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcWallet width={size} height={size} color={color} />
            ),
            tabBarButton: (props) => {
              const { children, onPress, onLongPress, accessibilityRole, style } = props;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  accessibilityRole={accessibilityRole}
                  style={style}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {children}
                </TouchableOpacity>
              );
            },
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingStackNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.IcSetting width={size} height={size} color={color} />
            ),
            tabBarButton: (props) => {
              const { children, onPress, onLongPress, accessibilityRole, style } = props;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  accessibilityRole={accessibilityRole}
                  style={style}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {children}
                </TouchableOpacity>
              );
            },
          }}
        />
      </Tab.Navigator>

      {/* Center Logo */}
      <View
        className="absolute left-1/2 -ml-[30px]"
        style={{ bottom: HEIGHT_TAB_BAR / 2 }}
        pointerEvents="box-none" // Cho phép touch events đi qua
      >
        <TouchableOpacity
          className="w-[60px] h-[60px] rounded-full justify-center items-center"
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
            // navigation.navigate('CenterScreen');
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icons.IcLogoWhite width={40} height={40} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}