import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, RefreshControl, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QuantitySelector from '../quantitySelector';
import { useFocusEffect } from '@react-navigation/native';
let url_del;


const url_cart = 'http://localhost:3000/carts';

const Cart = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);



  const handleConfirmDelete = () => {
    fetch(url_del, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status == 200) {
          console.log('Delete');
          getProdcutFromAPI();

        }
      }).catch((ex) => console.log(ex));
    setDeleteConfirmationVisible(false);

  };

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };


  useFocusEffect(
    React.useCallback(() => {

      getProdcutFromAPI();
      return () => {
      };
    }, [])
  );

  const getProdcutFromAPI = () => {
    fetch(url_cart)
      .then((res) => res.json())
      .then(data => {
        setProducts(data);
        calculateTotal(data);
        setTotalItems(data.length);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
        setRefreshing(false);
      });
  };

  const calculateTotal = (data) => {
    let totalAmount = 0;
    data.forEach(item => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  };

  const handleQuantityChange = (newQuantity, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };


  const handleRemoveCart = (id) => {
    url_del = 'http://localhost:3000/carts/' + id;
    console.log(url_del);
    setDeleteConfirmationVisible(true)


  }

  const renderProductItem = ({ item, index }) => (
    <View>

      <View style={styles.itemContainer}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <View style={styles.infoItem}>
          <Text style={styles.titleSmall}>{item.nameProduct}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.price}>$ {item.price}</Text>
          <QuantitySelector
            initialValue={item.quantity}
            onQuantityChange={(newQuantity) => handleQuantityChange(newQuantity, index)}
          />

        </View>
        <TouchableOpacity style={{
          alignSelf: 'flex-end'
        }} onPress={() => handleRemoveCart(item.id)}
        >
          <Ionicons name="trash" size={30} color="#055E38" />
        </TouchableOpacity>


      </View>
      <View style={styles.line}></View>

    </View>

  );


  const handleRefresh = () => {
    setRefreshing(true);
    getProdcutFromAPI();
  };

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
        <Text style={{ color: '#FF7B33', fontSize: 16, fontWeight: '500' }}>You have {totalItems} items in your cart</Text>
      </View>

      <FlatList
        style={{ marginBottom: 20 }}
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteConfirmationVisible}
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa không?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: '#2196F3' }}
                onPress={handleCancelDelete}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: '#FF0000' }}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.textStyle}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.total}>
        <View style={styles.flexRowTotal}>
          <Text style={styles.textDescription}>Total</Text>
          <Text style={styles.textMoney}>$ {total}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Payments', { money: total, data: products })} style={styles.btnPay}>
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
    width: '50%'
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
    marginTop: 20,
    bottom: 30,
    width: '100%',
    height: 90,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});



export default Cart;
