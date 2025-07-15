 // import SignUpCard from '@/components/ui/signup_card';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const login = () => {
  return (
    <View>
      <Text>login</Text>
    </View>
  )
}


const Login = ({ navigation }) => {

const { showSignUpCard } = useLocalSearchParams();
const [showSignUp, setShowSignUp] = useState(false);

const router = useRouter();

useEffect(() => {
 if (showSignUpCard === 'true') {
 setShowSignUp(true);
          }
      }, [showSignUpCard]);

      const handleRedirect = () => {
          router.push('/survey/survey_screen')
      }

      return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/BansAI Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <TextInput
                placeholder="Username"
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#888"
            />

            <View style={styles.optionsRow}>
                <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxLabel}>Remember me</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={() => {router.push('../home')}}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={20} color="white" style={styles.icon} />
                <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={20} color="white" style={styles.icon} />
                <Text style={styles.socialText}>Continue with Facebook</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => setShowSignUp(true)}>
                <Text style={{ color: '#2563eb' }}>Sign up</Text>
            </TouchableOpacity>
            </View>

            <SignUpCard
                visible={showSignUp}
                onClose={() => setShowSignUp(false)}
                handlePress={handleRedirect}
            />

        </SafeAreaView>
          )
  };

  export default Login;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 38,
      justifyContent: 'center',
    },
    logo: {
      width: 160,
      height: 40,
      alignSelf: 'center',
      marginBottom: 54,
    },
    logoAccent: {
      color: '#6C63FF',
    },
    input: {
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginBottom: 16,
      fontSize: 14,
     
    },
    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 16,
      height: 16,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#444',
      marginRight: 6,
    },
    checkboxLabel: {
      fontSize: 12,
      color: '#444',
    },
    forgotText: {
      fontSize: 12,
      color: '#2563eb',
    },
    loginButton: {
      backgroundColor: '#1E1B4B',
      borderRadius: 25,
      paddingVertical: 14,
      alignItems: 'center',
      marginBottom: 24,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
     
    },
    loginText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    orText: {
      textAlign: 'center',
      color: '#aaa',
      marginBottom: 12,
    },
    socialButton: {
      flexDirection: 'row',
      backgroundColor: '#6C63FF',
      borderRadius: 25,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    icon: {
      marginRight: 8,
    },
    socialText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'semibold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 24,
    },
    footerText: {
      fontSize: 12,
      color: '#444',
    },
    signupText: {
      color: '#2563eb',
      fontWeight: 'bold',
    },
  });


