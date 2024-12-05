import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Hardcoded credentials
const HARDCODED_USERNAME = 'Amith';
const HARDCODED_PASSWORD = 'Amith@123';

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      navigation.navigate('Home', { username });
    } else {
      alert('Invalid username or password (Developer Note : Please use Credentials mentioned in the palceholders)');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Login.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username (Use Amith)"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password (Use Amith@123)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  container: {
    top: screenHeight / 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: '10%',
    fontWeight: '600',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    width: '80%',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loginButton: {
    backgroundColor: '#5667FD',
    padding: 13,
    borderRadius: 50,
    width: '40%',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginVertical: 16,
    marginTop: 160,
  },
  registerText: {
    fontSize: 14,
    color: '#000',
  },
  registerLink: {
    color: '#5667FD',
    fontWeight: 'bold',
  },
});
