import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "./global.css";

import { CommonToast } from "@/components/common/CommonToast";
import AppNavigator from '@/navigation/AppNavigator';
import ReduxProviders from '@/providers/ReduxProviders';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import { View } from "react-native";
const queryClient = new QueryClient();

const AppContent = () => {
  const { colors, isDark } = useTheme();

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View
      style={{ backgroundColor: colors.background || (isDark ? '#000' : '#fff'), flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <AppNavigator />
    </View>
  );
};
export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('@assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('@assets/fonts/Roboto-Bold.ttf'),
  });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady || !fontsLoaded) return null;

  return (
    <ReduxProviders>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SafeAreaProvider>
            <AppContent />
            <CommonToast />
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProviders>
  );
}

