import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import WelcomeScreen from '@/components/ui/welcome_screen';

const Landing = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showWelcome, setShowWelcome] = useState(false);

  const handleStart = () => {
    router.push('/auth/register')
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
       setShowWelcome(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
  <SafeAreaView style={{ flex: 1 }}>
    {!showWelcome ? (
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Image
          source={require('../assets/images/BansAI Bot Circle.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Image 
          source={require('../assets/images/BansAI Logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    ) : (
      <WelcomeScreen 
        onPress={handleStart}
      />
    )}
  </SafeAreaView>
);
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});
