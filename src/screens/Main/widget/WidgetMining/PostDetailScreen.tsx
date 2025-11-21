import CommonAppBar from "@/components/common/CommonAppBar";
import { useAppStyle } from "@/hooks/useAppStyles";
import { makeSelectNewsDetail, newsDetailAction } from "@/store/reducers/newsSlice";
import { Icons } from "@/utils/icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, ActivityIndicator, Dimensions, TouchableOpacity, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from '@/constants/status';
import { format, parseISO, isValid } from "date-fns";
import { Config } from "@/config/env";
import RenderHtml from 'react-native-render-html';

interface RouteParams {
  postId: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'dd-MM-yyyy') : '';
  } catch (error) {
    return '';
  }
};

export default function PostDetailScreen() {
  const route = useRoute();
  const { postId } = route.params as RouteParams;
  console.log('postId:', postId);
  const dispatch = useDispatch();
  const newsDetail = useSelector(makeSelectNewsDetail);
  console.log('newsDetail:', newsDetail.data);
  const { colors, textStyles } = useAppStyle();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  useEffect(() => {
    dispatch(newsDetailAction({ newsId: postId }));
  }, [dispatch, postId]);

  if (newsDetail.status === LOADING_STATUS.LOADING) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <CommonAppBar
          showBack
          onBack={() => navigation.goBack()}
          right={<Icons.IcShareVariant width={20} height={20} color={colors.iconColor} />}
        />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CommonAppBar
        showBack
        onBack={() => navigation.goBack()}
        right={<Icons.IcShareVariant width={20} height={20} color={colors.iconColor} />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      >
        {/* Hero Image */}
        <View className="w-full px-2" style={{ height: width }}>
          <View className="w-full h-full rounded-2xl overflow-hidden">
            <Image
              source={{ uri: `${Config.domain_media}${newsDetail.data?.cover?.path}` }}
              className="w-full h-full"
              resizeMode="cover"
              style={{ borderRadius: 16 }}
            />
          </View>
        </View>

        {/* Content Container */}
        <View className="px-5 py-6">
          {/* Title */}
          <Text
            className="text-2xl font-bold mb-4"
            style={{ color: colors.text, lineHeight: 32 }}
          >
            {newsDetail.data?.title}
          </Text>

          {/* Meta Info */}
          <View className="flex-row items-center justify-between mb-6 pb-4 border-b" style={{ borderBottomColor: colors.border }}>
            <View className="flex-row items-center">
              <View
                className="w-10 h-10 rounded-full justify-center items-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                  {"Admin".charAt(0)}
                </Text>
              </View>
              <View>
                <View className="flex-row items-center">
                  <Text className="text-sm font-semibold mb-1" style={{ color: colors.text }}>
                    Admin
                  </Text>
                  <Text className="text-xs ml-2" style={{ color: colors.textSecondary }}>
                    • {formatDate(newsDetail.data?.publishAt)}
                    {!newsDetail.data?.isHot && (
                      <Text className="ml-2 text-red-500">• HOT</Text>
                    )}
                    <Text className="ml-2">• {newsDetail.data?.lang?.toUpperCase()}</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row items-center">
              <Icons.IcEyeOpen width={16} height={16} color={colors.iconColor} />
              <Text className="text-lg ml-1" style={{ color: colors.textSecondary }}>{newsDetail.data?.viewCount || 0}</Text>
            </View>

          </View>
          {/* Tags */}
          <View className="flex-row flex-wrap mb-6">
            {newsDetail.data?.hashTags?.map((tag, index) => (
              <View
                key={index}
                className="px-3 py-2 rounded-full mr-2 mb-2"
                style={{ backgroundColor: colors.primary + '15' }}
              >
                <Text className="text-xs font-medium" style={{ color: colors.primary }}>
                  #{tag}
                </Text>
              </View>
            ))}
          </View>
          {/* Content */}
          <View className="mb-6">
            {newsDetail.data?.content && (
              <RenderHtml
                contentWidth={width - 40} // 40 = 20px padding on each side
                source={{ html: newsDetail.data.content }}
                baseStyle={{
                  color: colors.text,
                  fontSize: 16,
                  lineHeight: 24,
                }}
                tagsStyles={{
                  p: {
                    marginBottom: 16,
                  },
                  a: {
                    color: colors.primary,
                    textDecorationLine: 'none',
                  },
                  h1: { fontSize: 28, fontWeight: 'bold', marginVertical: 16 },
                  h2: { fontSize: 24, fontWeight: 'bold', marginVertical: 14 },
                  h3: { fontSize: 20, fontWeight: 'bold', marginVertical: 12 },
                  h4: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
                  h5: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
                  h6: { fontSize: 14, fontWeight: 'bold', marginVertical: 6 },
                  // img: {
                  //   maxWidth: '100%',
                  //   height: undefined,
                  //   aspectRatio: 1,
                  //   marginVertical: 16,
                  // },
                }}
              />
            )}
          </View>

          {/* Action Buttons */}
          {/* <View className="flex-row items-center justify-between py-4 border-t" style={{ borderTopColor: colors.border }}>
            <View className="flex-row items-center">

              <TouchableOpacity
                className="flex-row items-center mr-6"
                onPress={handleLike}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icons.IcHeart
                  width={26}
                  height={26}
                  fill={liked ? colors.primary : colors.iconColor}
                />
                <Text
                  className="text-sm ml-2 font-medium"
                  style={{ color: liked ? colors.primary : colors.textSecondary }}
                >
                  {likeCount}
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                className="flex-row items-center"
                onPress={handleComment}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icons.IcComment
                  width={26}
                  height={26}
                  fill={colors.iconColor}
                />
                <Text className="text-sm ml-2 font-medium" style={{ color: colors.textSecondary }}>
                  32
                </Text>
              </TouchableOpacity>
            </View>


            <TouchableOpacity
              className="flex-row items-center"
              onPress={handleBookmark}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icons.IcBookmark
                width={26}
                height={26}
                fill={bookmarked ? colors.primary : colors.iconColor}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}