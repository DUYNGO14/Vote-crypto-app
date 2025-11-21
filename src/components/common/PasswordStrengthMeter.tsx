// components/common/PasswordStrengthMeter.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { PasswordStrength } from '@/hooks/usePasswordStrength';

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
  feedback: string[];
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  strength,
  feedback
}) => {
  const getStrengthColor = (): string => {
    switch (strength) {
      case 'very-strong':
        return 'bg-green-500';
      case 'strong':
        return 'bg-blue-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'weak':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthText = (): string => {
    switch (strength) {
      case 'very-strong':
        return 'Very Strong';
      case 'strong':
        return 'Strong';
      case 'medium':
        return 'Medium';
      case 'weak':
        return 'Weak';
      default:
        return 'Weak';
    }
  };

  const getStrengthWidth = (): string => {
    switch (strength) {
      case 'very-strong':
        return 'w-full';
      case 'strong':
        return 'w-3/4';
      case 'medium':
        return 'w-1/2';
      case 'weak':
        return 'w-1/4';
      default:
        return 'w-0';
    }
  };

  if (!strength) return null;

  return (
    <View className="mt-2">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-sm text-gray-600">Password Strength:</Text>
        <Text className={`text-sm font-medium ${
          strength === 'very-strong' ? 'text-green-600' :
          strength === 'strong' ? 'text-blue-600' :
          strength === 'medium' ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {getStrengthText()}
        </Text>
      </View>
      
      {/* Progress bar */}
      <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <View 
          className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()} ${getStrengthWidth()}`}
        />
      </View>

      {/* Feedback */}
      {feedback.length > 0 && (
        <View className="mt-2">
          <Text className="text-xs text-gray-500 mb-1">To improve your password:</Text>
          {feedback.map((item, index) => (
            <Text key={index} className="text-xs text-red-500">
              • {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};