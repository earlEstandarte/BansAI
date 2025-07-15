import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Feather from '@expo/vector-icons/Feather';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: 'absolute',
              },
              default: {},
            }),
          }}>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="fun"
            options={{
              title: 'Fun',
              tabBarIcon: ({ color }) => <Entypo name="code" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="assist"
            options={{
              title: 'Assist',
              tabBarIcon: ({ color }) => (
                <Image 
                  source={require('../../assets/images/BansAI Logo.png')}
                  style={{ width: 60, height:60}}
                  resizeMode='contain'
                />
              )
            }}
          />
          <Tabs.Screen
            name="learn"
            options={{
              title: 'Learn',
              tabBarIcon: ({ color }) => <Feather name="book-open" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
            }}
          />
        </Tabs>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
