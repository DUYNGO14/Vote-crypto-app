import { Config } from '@/config/env';
import React from 'react';
import { View, Image, Text } from 'react-native';

interface Props {
  avatar?: string;
  fullname?: string;
  size?: number;
  backgroundColor?: string;
  className?: string;
}

export default function CommonAvatar({
  avatar,
  fullname = '',
  size = 48,
  backgroundColor = '#E5E7EB', // gray-200
  className = '',
}: Props) {
  const initials = fullname
    ? fullname
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  const sizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  };

  return (
    <View
      className={`items-center justify-center overflow-hidden ${className}`}
      style={sizeStyle}
    >
      {avatar ? (
        <Image
          source={{ uri: `${Config.domain_media}${avatar}` }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <Text
          className="text-white font-semibold"
          style={{ fontSize: size / 2 }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}
