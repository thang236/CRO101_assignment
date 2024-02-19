import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const ProfileForm = ({ navigation }) => {
  const route = useRoute();
  const idSend = route.params?.idSends || '';

  const [name, setName] = useState('Thăng Hoàng');
  const [email, setEmail] = useState('thanghtph31577@fpt.edu.vn');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [userData, setUserData] = useState({});
  const url_API = 'http://192.168.1.6:3000/users/' + idSend;

  useEffect(() => {
    getUserFromAPI();
  }, [])
  const getUserFromAPI = () => {
    fetch(url_API)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setEmail(data.email);
        setName(data.name);
        setPhoneNumber(data.phone);
      })

  }

  const handleSave = () => {

    let updateUserData = { ...userData, name: name, email: email, phone: phoneNumber };
    setUserData(updateUserData);


    fetch(url_API, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(updateUserData),
    })
      .then((res) => {

        if (res.status == 200) {
          Alert.alert('Notification', "Successfully Edit Profile");
          getUserFromAPI
        }
      }).catch((ex) => console.log(ex))
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginTop: 50 }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <Image style={styles.avatar} source={require('../../assets/avt.jpeg')} />

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  heading: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
    color: '#000',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileForm;
