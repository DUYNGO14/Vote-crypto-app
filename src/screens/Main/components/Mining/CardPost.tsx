import { Config } from '@/config/env';
import { useAppStyle } from '@/hooks/useAppStyles';
import { MiningStackParamList } from '@/navigation/Stack/MiningStackNavigation';
import { NewsItem } from '@/types/new.types';
import { Icons } from '@/utils/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns'
interface CardPostProps {
  data: NewsItem;
}

type NavigationProp = StackNavigationProp<MiningStackParamList, 'PostDetailScreen'>;

export default function CardPost({ data }: CardPostProps) {
  const navigation = useNavigation<NavigationProp>();
  const { colors, textStyles } = useAppStyle();


  const handlePress = () => {
    navigation.navigate('PostDetailScreen', { postId: data.id })
    console.log('Navigate to post:', data.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="bg-[#1E1E1E] w-[177px] h-[240px] rounded-2xl p-2 gap-2 justify-between"
        style={{ backgroundColor: colors.cardDark }}>
        {/* Thumbnail */}
        <Image
          source={{ uri: `${Config.domain_media}${data.cover.path}` }}
          className="w-full h-[120px] rounded-lg overflow-hidden bg-[#F5F5F5]"
          style={{ resizeMode: 'cover' }}
        />

        {/* Title */}
        <Text
          className="text-sm font-bold h-12"
          style={{ color: colors.text }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {data.title || 'Untitled'}
        </Text>
        <View className="flex-row items-center justify-between gap-1">
          <View className="flex-row items-center justify-start gap-1">
            <Text style={[textStyles.Text]}>{data.viewCount}</Text>
            <Icons.IcEyeOpen width={16} height={16} color={colors.primary} />
          </View>
          <Text style={[textStyles.Text]}>{format(data.publishAt, 'dd/MM/yyyy')}</Text>
        </View>
        {/* Read more indicator */}
        <View className="flex-row items-center justify-end gap-1">
          <Text style={[textStyles.Text, { color: colors.primary }]}>Read more</Text>
          <Icons.IcChevronRight width={20} height={20} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}