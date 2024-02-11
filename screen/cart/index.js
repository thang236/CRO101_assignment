import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QuantitySelector from '../quantitySelector';
import img2 from '../../assets/img2.jpeg'
import img3 from '../../assets/img3.jpeg'

const Cart = ({ navigation }) => {
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(2);

  const [items1, setItems1] = useState(4.4);
  const [items2, setItems2] = useState(4.1);
  const [total, setTotal] = useState(0);

  const handleQuantityChange1 = (newQuantity) => {
    setQuantity1(newQuantity);
  };

  const handleQuantityChange2 = (newQuantity) => {
    setQuantity2(newQuantity);
  };

  useEffect(() => {
    if (quantity1 && quantity2 && items1 && items2) {
      const newTotal = (quantity1 * items1 + quantity2 * items2);
      setTotal(newTotal);
      const newTotalQuantity = quantity1+quantity2;
      setTotalQuantity(newTotalQuantity);
    }
  }, [quantity1, quantity2, items1, items2]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>My Cart</Text>
      </View>
      <View style={styles.boxText}>
        <Ionicons name="bag-check" size={20} color="#FF7B33" style={styles.cartIcons} />
        <Text style={{ color: '#FF7B33', fontSize: 16, fontWeight: '500' }}>You have {totalQuantity} items in your cart</Text>
      </View>

      <ScrollView>
        <View style={styles.itemContainer}>
          <Image style={styles.productImage} source={img2} />
          <View style={styles.infoItem}>
            <Text style={styles.titleSmall}>Cappuccino</Text>
            <Text>with chocolate</Text>
            <Text style={styles.price}>$ {items1}</Text>
            <QuantitySelector initialValue={quantity1} onQuantityChange={handleQuantityChange1} />
          </View>
        </View>
        <View style={styles.line} />

        <View style={styles.itemContainer}>
          <Image style={styles.productImage} source={img3} />
          <View style={styles.infoItem}>
            <Text style={styles.titleSmall}>Cappuccino</Text>
            <Text>with Cacao</Text>
            <Text style={styles.price}>$ {items2}</Text>
            <QuantitySelector initialValue={quantity2} onQuantityChange={handleQuantityChange2} />
          </View>
        </View>
        <View style={styles.line} />
      </ScrollView>

      <View style={styles.total}>
        <View style={styles.flexRowTotal}>
          <Text style={styles.textDescription}>Items</Text>
          <Text style={styles.textMoney}>$ {total}</Text>
        </View>
        <View style={styles.flexRowTotal}>
          <Text style={styles.textDescription}>Discount</Text>
          <Text style={styles.textMoney}>$ 0.1</Text>
        </View>
        <View style={[styles.line, { marginBottom: 20 }]} />

        <View style={styles.flexRowTotal}>
          <Text style={styles.textDescription}>Total</Text>
          <Text style={styles.textMoney}>$ {total - 0.1}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Payments',{money:(total-0.1)})} style={styles.btnPay}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  backIcon: {
    position: 'absolute',
    left: 15,
  },
  boxText: {
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    height: 50,
    width: '80%',
    backgroundColor: '#FFF4EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cartIcons: {
    marginRight: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginStart: 25,
    marginTop: 30,
  },
  productImage: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  infoItem: {
    marginStart: 20,
  },
  titleSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 15,
  },
  line: {
    width: '90%',
    height: 1,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 25,
    borderColor: '#E5E5E5',
  },
  total: {
    bottom: 50,
    width: '100%',
    height: 170,
  },
  flexRowTotal: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 25,
    justifyContent: 'space-between',
  },
  textDescription: {
    color: '#B3B5B5',
    fontSize: 17,
  },
  textMoney: {
    fontSize: 17,
    color: 'red',
  },
  btnPay: {
    backgroundColor: '#1F1F1F',
    height: 40,
    width: '70%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
});

export default Cart;
