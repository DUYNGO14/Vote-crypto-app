import React from 'react';
import { View, Text } from 'react-native';
import Toast, { BaseToastProps, ToastConfig } from 'react-native-toast-message';

// ⚙️ Custom giao diện bằng Tailwind
const toastConfig: ToastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View className="bg-green-500 px-4 py-3 rounded-2xl mx-4 mt-2 shadow-md flex-row items-center">
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{text1}</Text>
        {text2 ? <Text className="text-white text-sm mt-1">{text2}</Text> : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <View className="bg-red-500 px-4 py-3 rounded-2xl mx-4 mt-2 shadow-md flex-row items-center">
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{text1}</Text>
        {text2 ? <Text className="text-white text-sm mt-1">{text2}</Text> : null}
      </View>
    </View>
  ),

  info: ({ text1, text2 }: BaseToastProps) => (
    <View className="bg-blue-500 px-4 py-3 rounded-2xl mx-4 mt-2 shadow-md flex-row items-center">
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{text1}</Text>
        {text2 ? <Text className="text-white text-sm mt-1">{text2}</Text> : null}
      </View>
    </View>
  ),

  warning: ({ text1, text2 }: BaseToastProps) => (
    <View className="bg-yellow-500 px-4 py-3 rounded-2xl mx-4 mt-2 shadow-md flex-row items-center">
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{text1}</Text>
        {text2 ? <Text className="text-white text-sm mt-1">{text2}</Text> : null}
      </View>
    </View>
  ),
};

// 🧩 Component Toast chính (dùng trong App.tsx)
export const CommonToast = () => <Toast config={toastConfig} />;

// 🚀 Hàm gọi toast nhanh ở bất kỳ đâu
export const showToast = ({
  type,
  title,
  message,
}: {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    topOffset: 60,
    visibilityTime: 2500,
  });
};
