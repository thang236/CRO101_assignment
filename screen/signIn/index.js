import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

import logo from '../../assets/logo.png';

const Register = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    // Validate and handle registration logic here
    if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
      setErrorMessage('Please fill in all required fields.');
    } else {
      // Perform registration logic (e.g., send data to server)
      console.log('Registration successful');
      navigation.navigate('Home');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Image style={styles.logo} source={logo} />
          <Text style={{ fontSize: 25, fontWeight: 'bold',marginBottom:30 }}>Create an Account</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Fullname'
              style={styles.input}
              onChangeText={(text) => setFullname(text)}
              value={fullname}
            />
            <TextInput
              placeholder='Email'
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType='email-address'
            />
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
            <TextInput
              placeholder='Phone'
              style={styles.input}
              onChangeText={(text) => setPhone(text)}
              value={phone}
              keyboardType='phone-pad'
            />
            <TextInput
              placeholder='Address'
              style={styles.input}
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
          </View>

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInLink} onPress={() => navigation.navigate('Login')}>
            <Text>Already have an account? </Text>
            <Text style={styles.linkText}>Login now</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 350,
    borderRadius:10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop:10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#35C2C1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInLink: {
    flexDirection: 'row',
    marginTop: 60,
  },
  linkText: {
    color: '#35C2C1',
  },
});

export default Register;
