import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

import styles from './style';

import logo from '../../assets/logo.png';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   const removeTabBar = navigation.addListener('focus', () => {
  //     navigation.setOptions({

  //     });
  //   });

  //   // Hiển thị thanh tab navigation khi rời khỏi màn hình đăng nhập
  //   const showTabBar = navigation.addListener('blur', () => {
  //     navigation.setOptions({
  //       tabBarVisible: true,
  //     });
  //   });

  //   return () => {
  //     removeTabBar();
  //     showTabBar();
  //   };
  // }, [navigation]);

  const handleLogin = () => {
    // Replace 'ABC' and '123' with your actual credentials
    if (username === 'ABC' && password === '123') {
      console.log('Login successful');
      navigation.navigate('main');
      setUsername('');
      setPassword('');
      setErrorMessage('');
    } else {
      console.log('Invalid credentials');
      setErrorMessage('Username or password wrong. Try again!');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Image style={styles.anh} source={logo} />
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to Coffee shope</Text>
          <Text style={{ fontSize: 19, marginTop: 10, marginBottom: 30 }}>Login to continue</Text>

          <TextInput
            placeholder='Username'
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            placeholder='Password'
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />

          {errorMessage !== '' && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 100 }}
            onPress={() => {
              navigation.navigate('Register');
              setUsername('');
              setPassword('');
              setErrorMessage('');
            }}
          >
            <Text>If you don't have an account?  </Text>
            <Text style={{ color: '#35C2C1' }}>Register now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text>Forgot Password?</Text>
            <Text style={{ color: '#35C2C1' }}> Click to reset Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
