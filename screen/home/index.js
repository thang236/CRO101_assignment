import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import avatar1 from '../../assets/avt.jpeg'
import { Ionicons } from '@expo/vector-icons';

import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';






const Home = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerLeft: () => null,
    });


  }, [navigation]);
  return (
   

      <KeyboardAvoidingView
      style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
        
      >
         <ScrollView style={styles.innerContainer}>
          <View style={{marginHorizontal:20}}>
        <View style={styles.flexRow}>
          <View style={styles.item1}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            >
              <Image style={styles.avt} source={avatar1} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}> Hello name </Text>
          </View>

          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("Cart")
          }}
           style={styles.touchableOpacity}>
            <Ionicons name="cart" size={30} color="#055E38" style={styles.cartIcons} />
          </TouchableOpacity>
        </View>

        <View style={styles.search}>
          <TextInput
            placeholder='Search coffee'
            style={styles.input}></TextInput>
          {/* <TouchableOpacity
          onPress={()=>{}}>
              <Ionicons name="search" size={20} color="#555" style={styles.searchIcon} />
          </TouchableOpacity> */}
        </View>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Category</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          <View style={styles.boxCategoryChoose}>
            <Text>Cappuccino</Text>
          </View>

          <View style={styles.boxCategory}>
            <Text>Cold Brew</Text>
          </View>

          <View style={styles.boxCategory}>
            <Text>Espresso</Text>
          </View>
        </ScrollView>

        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          <View style={styles.boxProduct}>
            <TouchableOpacity
              onPress={() => {
                console.log('product button pressed');
                navigation.navigate('Product', {
                  data: img2,
                  namePro: 'Cappuccino',
                  withwhere: 'with chocolate',
                  money: '$4,4'
                })
              }}>
              <Image style={styles.imgProduct} source={img2} />

            </TouchableOpacity>
            <View style={styles.addCart}>
              <View style={styles.productInf}>
                <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>Cappuccino</Text>
                <Text style={{ fontSize: 10, marginTop: 7, marginStart: 13 }}>with chocolate</Text>
                <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>$4,4</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  alert('add cart complete', 'Notification');
                }}
              >
                <View style={styles.iconAdd}>
                  <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxProduct}>
            <TouchableOpacity
              onPress={() => {
                console.log('product button pressed');
                navigation.navigate('Product', {
                  data: img3,
                  namePro: 'Cappuccino',
                  withwhere: 'with Cacao',
                  money: '$4,1'
                })
              }}>
              <Image style={styles.imgProduct} source={img3} />

            </TouchableOpacity>
            <View style={styles.addCart}>
              <View style={styles.productInf}>
                <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>Cappuccino</Text>
                <Text style={{ fontSize: 10, marginTop: 7, marginStart: 13 }}>with Cacao</Text>
                <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>$4,1</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  alert('add cart complete', 'Notification');
                }}
              >
                <View style={styles.iconAdd}>
                  <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxProduct}>
            <TouchableOpacity
              onPress={() => {
                console.log('product button pressed');
                navigation.navigate('Product', {
                  data: img4,
                  namePro: 'Cappuccino',
                  withwhere: 'with black beans',
                  money: '$8,4'
                })
              }}>
              <Image style={styles.imgProduct} source={img4} />

            </TouchableOpacity>
            <View style={styles.addCart}>
              <View style={styles.productInf}>
                <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>Cappuccino</Text>
                <Text style={{ fontSize: 10, marginTop: 7, marginStart: 13 }}>with black beans</Text>
                <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>$8,4</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  alert('add cart complete', 'Notification');
                }}
              >
                <View style={styles.iconAdd}>
                  <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        <Text style={styles.content}>Special offer</Text>

        <View style={styles.boxOffer}>
          <Image style={styles.imgOffer} source={img4} />
          <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', flexWrap: 'wrap', width: 200 }}>A refreshing cup of black coffee</Text>
        </View>

        <View style={styles.boxOffer}>
          <Image style={styles.imgOffer} source={img4} />
          <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', flexWrap: 'wrap', width: 200 }}>A refreshing cup of black coffee</Text>
        </View>



        </View>
        </ScrollView>
      </KeyboardAvoidingView>


  )
}

export default Home;



