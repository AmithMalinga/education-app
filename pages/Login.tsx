import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      navigation.navigate('Home', { username });
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Login.png')}
      style={[styles.background, { width: screenWidth }]}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
  },
  container: {
    position: 'absolute',
    top: screenHeight / 2.8, // Align the form to the second half
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent overlay for readability
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
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loginButton: {
    backgroundColor: '#5667FD',
    padding: 13,
    borderRadius: 50,
    width: '40%',
    alignItems: 'center',
    marginBottom: 170,
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
