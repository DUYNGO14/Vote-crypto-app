// CommonInput.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Icons } from '@utils/icons';
import { useAppStyle } from '@/hooks/useAppStyles';

interface CommonInputProps {
  label?: string;
  error?: string;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  [key: string]: any;
}

export const CommonInput: React.FC<CommonInputProps> = ({
  label,
  error,
  leftIcon,
  isRequired = false,
  rightIcon,
  isPassword = false,
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(isPassword);
  const { colors, textStyles } = useAppStyle();

  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-1 gap-1">
        {label && (
          <Text
            className="text-base font-medium mb-2"
            style={{ color: error ? colors.error : colors.text }}
          >
            {label}
          </Text>
        )}

        {isRequired && (
          <Text
            className="text-base font-medium mb-2"
            style={{ color: colors.error }}
          >
            *
          </Text>
        )}
      </View>
      <View
        className="flex-row items-center gap-3 px-4 h-14 rounded-xl border"
        style={{
          backgroundColor: colors.inputBackground,
          borderColor: error ? colors.error : colors.border,
        }}
      >
        {leftIcon && (
          <View>{leftIcon}</View>
        )}

        <TextInput
          className="flex-1"
          style={{ color: error ? colors.error : colors.text }}
          placeholderTextColor={colors.textLight}
          secureTextEntry={isSecure}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            {isSecure ? (
              <Icons.IcEyeOpen width={24} height={24} color={colors.textLight} />
            ) : (
              <Icons.IcEyeClose width={24} height={24} color={colors.textLight} />
            )}
          </TouchableOpacity>
        )}

        {!isPassword && rightIcon && (
          <View>{rightIcon}</View>
        )}
      </View>

      {error && (
        <Text
          className="text-sm mt-1"
          style={{ color: colors.error }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};