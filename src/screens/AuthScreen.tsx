import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from '../services/authService';

type AuthStackParamList = {
  Home: undefined;
  Auth: undefined;
  ProfileDashboard: undefined;
};

type AuthScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Auth'>;
};

export default function AuthScreen({ navigation }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.login(email, password);

      if (data.success) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('ProfileDashboard');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter email');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.sendOTP(email);

      if (data.success) {
        setOtpSent(true);
        Alert.alert('Success', 'OTP sent to your email');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !contactNumber || !password || !confirmPassword || !otp) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.signUp({
        firstName,
        lastName,
        email,
        contactNumber,
        password,
        confirmPassword,
        otp,
      });

      if (data.success) {
        Alert.alert('Success', 'Account created successfully!');
        setIsLogin(true);
        resetSignupForm();
      } else {
        Alert.alert('Error', data.message || 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetSignupForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setContactNumber('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setOtpSent(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity style={styles.switchBtn} onPress={switchMode}>
            <Text style={styles.switchText}>{isLogin ? 'Signup' : 'Login'}</Text>
          </TouchableOpacity>

          <Image
            source={{
              uri: isLogin
                ? 'https://torned-site-fronthend.vercel.app/static/media/loginpicture.8d7b9d3626d9c4dbfaff.jpg'
                : 'https://torned-site-fronthend.vercel.app/static/media/16xc_gyq5_210901.def74a8e619c21ddd268.jpg',
            }}
            style={styles.image}
          />

          <Text style={styles.title}>
            {isLogin ? 'Welcome Back' : 'Join thousands of Students excelling'}
          </Text>
          {isLogin && (
            <Text style={styles.subtitle}>Build skills for today, tomorrow and beyond</Text>
          )}

          {isLogin ? (
            <>
              <TextInput
                placeholder="Email Address"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
              />

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="First Name"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Last Name"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Email Address"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />

              {!otpSent ? (
                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleSendOTP}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text style={styles.buttonText}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <>
                  <TextInput
                    placeholder="Enter OTP"
                    style={styles.input}
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={setOtp}
                    maxLength={6}
                    placeholderTextColor="#999"
                  />
                  <TextInput
                    placeholder="Contact Number"
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    placeholderTextColor="#999"
                  />
                  <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#999"
                  />
                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#999"
                  />

                  <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSignup}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#000" />
                    ) : (
                      <Text style={styles.buttonText}>Create Account</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1B3D',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  title: {
    color: '#F38B59',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#233B8B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: '#fff',
  },
  button: {
    backgroundColor: '#F38B59',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  switchBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F38B59',
  },
  switchText: {
    color: '#F38B59',
    fontWeight: 'bold',
  },
});
