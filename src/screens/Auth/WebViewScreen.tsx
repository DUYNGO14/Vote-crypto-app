import React from 'react';
import { View, StyleSheet } from 'react-native';
// import CommonAppBar from '../../common/CommonAppBar';
import { WebView } from 'react-native-webview';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigation/types';
import CommonAppBar from '@/components/common/CommonAppBar';

// Add this type to your navigation types if not present:
// type AuthStackParamList = {
//   ...
//   WebView: { url: string; title?: string };
// };

type WebViewScreenRouteProp = RouteProp<AuthStackParamList, 'WebView'>;

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'WebView'>;
};

export default function WebViewScreen({ navigation }: Props) {
  const route = useRoute<WebViewScreenRouteProp>();
  const { url, title } = route.params;

  return (
    
    <View style={styles.container}>
      <CommonAppBar
        title={title || ''}
        showBack
        onBack={() => navigation.goBack()}
      />
      <WebView source={{ uri: url }} startInLoadingState />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
