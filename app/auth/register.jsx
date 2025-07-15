import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
  const router = useRouter();

  const handleSignInWithGoogle = () => {
    router.push('/home')
  };

  return (
    <SafeAreaView style={landingStyles.container}>
      <TouchableOpacity style={landingStyles.skip} onPress={() => router.push('/home')} />

      <View style={landingStyles.header}>
        <Image source={require('../../assets/images/BansAI Logo.png')} style={landingStyles.logo} />
        <Text style={landingStyles.tagline}>Learn the Filipino way!</Text>
      </View>

      <Text style={landingStyles.secureText}>Secure your progress by signing in</Text>
      <Image source={require('../../assets/images/landingpage_image.png')} style={landingStyles.illustration} />

      <Text style={landingStyles.signInText}>One Tap Sign In</Text>

      <TouchableOpacity style={landingStyles.googleButton} onPress={handleSignInWithGoogle}>
        <Image source={require('../../assets/images/googleFingerprint.png')} style={landingStyles.googleIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push({ pathname: 'auth/login', params: { showSignUpCard: 'true' } })}>
        <Text style={landingStyles.emailText}>
          Sign Up with <Text style={{ color: '#2563eb' }}>Email</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('auth/login')}>
        <Text style={landingStyles.loginText}>
          Already have an account? <Text style={{ color: '#2563eb' }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
};

export default Register;

const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  skip: {
    position: 'absolute',
    top: 40,
    right: 24,
    zIndex: 2,
    padding: 8,
  },
  header: {
    marginTop: 80,
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  secureText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 16,
    textAlign: 'center',
  },
  illustration: {
    width: 280,
    height: 220,
    alignContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 32,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 16,
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  emailText: {
    fontSize: 15,
    color: '#444',
    marginTop: 10,
    marginBottom: 14,
    textAlign: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 114,
  },
});



