import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type FormValues = {
  name: string;
  username: string;
  password: string;
};

export default function Register({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    alert('Registration successful! (Developer Note: Data will be available in the console log)');
    console.log('Form Data:', data);
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ImageBackground
        source={require('../assets/Register.png')} // Replace with your image
        style={[styles.background, { width: screenWidth, height: screenHeight }]}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters long' },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter Name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

            <Text style={styles.text}>Username</Text>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'Username is required',
                minLength: { value: 4, message: 'Username must be at least 4 characters long' },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter Username"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

            <Text style={styles.text}>Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                maxLength: { value: 12, message: 'Password must be at most 12 characters long' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
                  message:
                    'Password must include lowercase, uppercase, digit, and special character',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.divider} />
            <Text style={styles.registerText}>
              Already registered?{' '}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: screenHeight / 4,
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
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  registerButton: {
    backgroundColor: '#5667FD',
    padding: 13,
    borderRadius: 50,
    width: '40%',
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginVertical: 16,
    marginTop: 110,
  },
  registerText: {
    fontSize: 14,
    color: '#000',
  },
  registerLink: {
    color: '#5667FD',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
});
