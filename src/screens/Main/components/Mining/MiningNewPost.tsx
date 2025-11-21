/* eslint-disable react-native/no-inline-styles */
import { SkeletonCard } from '@/components/common/CommonSkeleton';
import { LOADING_STATUS } from '@/constants/status';
import { useAppStyle } from '@/hooks/useAppStyles';
import CardPost from '@/screens/Main/components/Mining/CardPost';
import { makeSelectNewsList, newsListAction } from '@/store/reducers/newsSlice';
import React, { useCallback, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const ItemSeparator = () => <View style={{ width: 12 }} />;
const EmptyList = ({ message }: { message: string }) => (
  <Text style={{ color: '#aaa', fontSize: 14 }}>{message}</Text>
);
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <View className="bg-red-50 p-3 rounded-lg border border-red-200 my-2">
    <Text className="text-red-700 text-sm">{message}</Text>
    <TouchableOpacity
      onPress={onRetry}
      className="mt-2 self-start"
    >
      <Text className="text-red-600 font-bold">Retry</Text>
    </TouchableOpacity>
  </View>
);
export default function MiningNewPost() {
  const { colors, textStyles } = useAppStyle();
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(makeSelectNewsList);
  console.log("[MINING NEW POST] STATUS", status);
  console.log("[MINING NEW POST] DATA", data);
  console.log("[MINING NEW POST] ERROR", error);
  useEffect(() => {
    dispatch(newsListAction({ page: 1, limit: 10 }));
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: any }) => <CardPost data={item} />,
    []
  );


  const renderSkeleton = () => (
    <FlatList
      data={[1, 2, 3, 4]}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.toString()}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={() => (
        <SkeletonCard />
      )}
      contentContainerStyle={{ marginTop: 8, paddingRight: 16 }}
    />
  );
  const handleRetry = useCallback(() => {
    dispatch(newsListAction({ page: 1, limit: 10 }));
  }, [dispatch]);
  return (
    <View className="flex-col justify-center gap-2 w-full px-4 my-6">
      <View className="flex-row items-center justify-between w-full">
        <Text style={textStyles.H01Bold} className="flex-1 pr-2">
          Getting started with Voting crypto
        </Text>
        <Text
          style={[textStyles.H01Bold, { color: colors.primary }]}
          className="shrink-0"
        >
          See all
        </Text>
      </View>

      {error ? (
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
        />
      ) : null}

      {status === LOADING_STATUS.LOADING ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={data?.items}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={
            error ? null : <EmptyList message="No posts available." />
          }
          contentContainerStyle={{ marginTop: 8 }}
        />
      )}
    </View>
  );
}

