

import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';



export default function Header({ title = 'BansAI', right = null, left = null, backgroundColor = '#fff', textColor = '#222', onLayout }) {
  const { width } = useWindowDimensions();
  const statusBarHeight = Platform.select({
    ios: 44,
    android: StatusBar.currentHeight || 24,
    default: 0,
  });
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor }}>
      <View style={styles.safe}>
        <View
          style={[
            styles.container,
            {
              width,
              backgroundColor,
              paddingTop: 4,
              paddingBottom: 4,
            },
          ]}
          onLayout={onLayout}
        >
          <View style={styles.side}><Feather name="menu" size={24} color="black" /></View>
          <TouchableOpacity onPress={() => router.push('/survey/survey_screen')}>
            <Image
              source={require('@/assets/images/BansAI Logo.png')}
              style={{ width: 85, height: 40 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <View style={styles.side}>{right}</View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 2,
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
