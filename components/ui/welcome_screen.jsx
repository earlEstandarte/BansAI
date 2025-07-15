import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = ({ onPress }) => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Bot Background Image */}
      <Image
        source={require('../../assets/images/BansAI bg.png')}
        style={styles.botImage}
        resizeMode="contain"
      />

      {/* Foreground Content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/BansAI Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Turn your phone into a learning partner with Bans.ai—your AI guide to mastering digital skills and coding.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    overflow: 'visible', // 👈 ensure image is not clipped
  },
  botImage: {
    position: 'absolute', 
    width: 800,
    height: 800,
    top: -80,
    zIndex: 0,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    top: 200,
    zIndex: 1,
  },
  logo: {
    width: 120,
    height: 50,
    marginBottom: 12,
    alignSelf: 'start'
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'start',
    color: '#4A5568',
  },
  button: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center'
  },
});
