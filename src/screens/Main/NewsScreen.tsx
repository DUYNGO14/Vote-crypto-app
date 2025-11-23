
import CommonAppBar from '@/components/common/CommonAppBar';
import { LOADING_STATUS } from '@/constants/status';
import { useAppStyle } from '@/hooks/useAppStyles';
import { EmptyList, ErrorMessage } from '@/screens/Main/components/Mining/MiningNewPost';
import { makeSelectNewsList, newsListAction } from '@/store/reducers/newsSlice';
import { NewsItem } from '@/types/new.types';
import { Icons } from '@/utils/icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list'; // More performant than FlatList for large lists
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommonSkeleton } from '@/components/common/CommonSkeleton';
const POSTS_PER_PAGE = 5;

export default function NewsScreen() {
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(makeSelectNewsList);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation<any>();
  const { colors, textStyles } = useAppStyle();
  const hasMore = data ? (data.meta.page * data.meta.limit) < data.meta.total : false;
  const loadPosts = useCallback((pageNum: number, isLoadMore = false) => {
    dispatch(newsListAction({
      page: pageNum,
      limit: POSTS_PER_PAGE,
      isLoadMore
    }));
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadPosts(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasMore && status !== LOADING_STATUS.LOADING) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPosts(nextPage, true);  // Pass true for isLoadMore
    }
  }, [hasMore, status, page, loadPosts]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    loadPosts(1, false);  // Pass false for isLoadMore
  }, [loadPosts]);

  // Skeleton component for loading state
  const renderSkeletonItem = useCallback(() => (
    <View style={[styles.postContainer, { backgroundColor: colors.card }]}>
      <CommonSkeleton height={200} width="100%" borderRadius={8} />
      <View style={{ padding: 12 }}>
        <CommonSkeleton height={24} width="80%" style={{ marginBottom: 8 }} />
        <CommonSkeleton height={16} width="60%" style={{ marginBottom: 12 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CommonSkeleton height={16} width={100} />
          <CommonSkeleton height={16} width={60} />
        </View>
      </View>
    </View>
  ), []);

  const renderPost = useCallback(({ item }: { item: NewsItem }) => (
    <View style={[styles.postContainer, { backgroundColor: colors.card }]}>
      {item.cover?.url && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.cover.url }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={styles.viewCountContainer}>
            <Icons.IcEyeOpen width={16} height={16} color={colors.primary} />
            <Text style={[textStyles.H01Bold, { color: colors.primary }]}>
              {item.viewCount || 0}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <Text style={[styles.postTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.postTime, { color: colors.textSecondary }]}>
            {formatPostTime(item.publishAt || item.createdAt)}
          </Text>
        </View>
        {item.isHot && (
          <View style={[styles.hotBadge, { backgroundColor: colors.error }]}>
            <Text style={styles.hotText}>HOT</Text>
          </View>
        )}
      </View>
      <Text style={[styles.postContent, { color: colors.text }]}>
        {item.shortDesc}
      </Text>
      <View style={styles.actionButton}>
        {item.hashTags?.length > 0 && (
          <View style={styles.tagsContainer}>
            {item.hashTags.map((tag, index) => (
              <Text key={index} style={[styles.tag, { color: colors.primary }]}>
                #{tag}
              </Text>
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('PostDetailScreen', { postId: item.id })}
          style={[styles.readMoreButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[textStyles.H01Bold]}>Read more</Text>
          <Icons.IcChevronRight width={20} height={20} color={colors.iconColor} />
        </TouchableOpacity>
      </View>

    </View>
  ), [colors]);

  const renderFooter = () => {
    if (status === LOADING_STATUS.LOADING && page > 1) {
      return <ActivityIndicator size="small" color={colors.primary} style={styles.loading} />;
    }
    return null;
  };

  if (status === LOADING_STATUS.LOADING && page === 1) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CommonAppBar
          showBack
          title="News"
          onBack={() => navigation.goBack()}
        />
        <View style={{ padding: 16 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              {renderSkeletonItem()}
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CommonAppBar
          showBack
          onBack={() => navigation.goBack()}
        />
        <ErrorMessage
          message={error || 'Failed to load posts'}
          onRetry={() => loadPosts(1, true)}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CommonAppBar
        showBack
        title="News"
        onBack={() => navigation.goBack()}
      />
      {status === LOADING_STATUS.LOADING && !data?.items?.length ? (
        <View style={{ padding: 16 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              {renderSkeletonItem()}
            </View>
          ))}
        </View>
      ) : (
        <FlashList
          data={data?.items || []}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={status === LOADING_STATUS.IDLE ? <EmptyList message="No posts available." /> : null}
          ListFooterComponent={
            status === LOADING_STATUS.LOADING && page > 1 ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 16 }} />
            ) : null
          }
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          // estimatedListSize={200}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 12,
  },
  postContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hotBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  hotText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    marginRight: 8,
    fontSize: 12,
    marginBottom: 4,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  viewCountContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewCountText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 12,
  },
  separator: {
    height: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginVertical: 16,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 6,
    marginLeft: 'auto',
  },
});

// Helper function to format post time
function formatPostTime(timestamp: string): string {
  // Implement your time formatting logic here
  return new Date(timestamp).toLocaleDateString();
}