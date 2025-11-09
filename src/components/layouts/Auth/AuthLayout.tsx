// components/layout/AuthLayout.tsx
import React from 'react';
import { ScrollView, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStyle } from '@/hooks/useAppStyles';
import { AuthFooter } from '@/screens/Auth/components/AuthFooter';

interface AuthLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  backgroundColor?: string;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  scrollable = true,
  backgroundColor,
  className = '',
}) => {
  const { colors } = useAppStyle();

  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable ? {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 },
  } : {};

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SafeAreaView
        className={`flex-1 ${className}`}
        style={{ backgroundColor: backgroundColor || colors.background }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={backgroundColor || colors.background}
        />
        <Container
          className="flex-1"
          {...containerProps}
        >
          {/* Nội dung chính chiếm không gian có sẵn */}
          <View className="flex-1 px-4 pt-6">
            {children}
          </View>

          {/* Footer luôn nằm sát đáy */}
          <View className="px-4 pb-6">
            <AuthFooter />
          </View>
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};