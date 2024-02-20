import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, FlatList, Text, ScrollView, Alert } from 'react-native';


import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import avatar1 from '../../assets/avt.jpeg';
import { useRoute, useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {

  const url_Category = 'http://localhost:3000/category';
  const url_Product = 'http://localhost:3000/products';

  const [userData, setUserData] = useState({});
  const [nameUser, setNameUser] = useState('');
  const [searching, setSetsearching] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [fliterPro, setFliterPro] = useState([]);


  const route = useRoute();
  const nameUserSend = route.params?.nameUserSend || '';
  const url_API_user = 'http://localhost:3000/users/' + nameUserSend;
  const getUserFromAPI = () => {
    fetch(url_API_user)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setNameUser(data.name)
      })

  }





  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [flatListKey, setFlatListKey] = useState(0);
  const url_cart = 'http://localhost:3000/carts';



  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFlatListKey(prevKey => prevKey + 1);
    getDataProductfromAPI(category);
    getUserFromAPI();
  };

  const handleAddToCart = (item) => {
    const productCart = { ...item, quantity: 1 }
    fetch(url_cart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productCart)
    })
      .then((res) => {
        if (res.status == 201) {
          Alert.alert('Notification', 'Add to Cart Complite')
        }
      })
  }




  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerLeft: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    getDataProductfromAPI(category);
    getDataCategoryfromAPI();
    getDataProductfromAPI(selectedCategory);
  }, []);

  useFocusEffect(
    React.useCallback(() => {

      getUserFromAPI();
      return () => {
      };
    }, [])
  );

  const getDataCategoryfromAPI = () => {
    fetch(url_Category)
      .then(response => response.json())
      .then(data => {
        setCategory(data);


      })
      .catch(error => console.error('Error fetching data:', error));
  };
  const getDataProductfromAPI = (category) => {
    fetch(url_Product + '?category=' + category)
      .then(response => response.json())
      .then(data => {
        setProducts(data);

      })
      .catch(error => console.error('Error fetching data:', error));
  };


  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategorySelect(item.id,)}>
      <View style={[styles.boxCategory, selectedCategory == item.id && styles.selectedCategory]}>
        <Text>{item.nameCategory}</Text>
      </View>
    </TouchableOpacity>
  );



  const renderProductItem = ({ item }) => (
    <View style={styles.boxProduct}>
      <TouchableOpacity
        onPress={() => {

          navigation.navigate('Product', {
            data: item.image,
            namePro: item.nameProduct,
            withwhere: item.description,
            money: item.price,
            favorite: item.isFavorite,
            id: item.id,
            category: item.category
          });
          console.log('chuyuyền vào pro :', item.isFavorite);
        }}>
        <Image style={styles.imgProduct} source={{ uri: item.image }} />
      </TouchableOpacity>
      <View style={styles.addCart}>
        <View style={styles.productInf}>
          <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>{item.nameProduct}</Text>
          <Text style={{ fontSize: 10, marginTop: 7, marginStart: 13 }}>{item.description}</Text>
          <Text style={{ marginTop: 10, fontSize: 17, marginStart: 12, fontWeight: 'bold' }}>${item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleAddToCart(item);
          }}
        >
          <View style={styles.iconAdd}>
            <Text style={{ fontSize: 30, color: 'white', alignSelf: 'center', marginBottom: 3, marginLeft: 2 }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSpecialItem = ({ item }) => (
    <TouchableOpacity style={styles.boxOffer}
      onPress={() => {

        navigation.navigate('Product', {
          data: item.image,
          namePro: item.nameProduct,
          withwhere: item.description,
          money: item.price,
          favorite: item.isFavorite,
          id: item.id,
          category: item.category
        });
        console.log('chuyuyền vào pro :', item.isFavorite);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.imgOffer} />
      <Text style={{ alignSelf: 'center', fontSize: 19, width: '50%' }}>{item.description}</Text>

    </TouchableOpacity>
  );

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity style={styles.boxOffer}
      onPress={() => {
        navigation.navigate('Product', {
          data: item.image,
          namePro: item.nameProduct,
          withwhere: item.description,
          money: item.price,
          favorite: item.isFavorite,
          id: item.id,
          category: item.category
        });

      }}
    >
      <Image source={{ uri: item.image }} style={styles.imgOffer} />
      <View style={{ alignSelf: 'center', width: '50%', }}>
        <Text style={{ fontSize: 19 }}>{item.nameProduct}</Text>
        <Text style={{ fontSize: 14 }}>{item.description}</Text>


      </View>

    </TouchableOpacity>
  );

  const getDataSearch = (text) => {
    fetch(url_Product)
      .then((res) => res.json()).then(data => {

        setFliterPro(data);
        const filtered = data.filter(product =>
          product.nameProduct.toLowerCase().includes(text.toLowerCase())
        );
        setFliterPro(filtered);

      }).catch((ex) => console.log(ex))
  }

  const handleSearch = (text) => {
    if (text == '') {
      setSetsearching(false)
    } else {
      setSetsearching(true)

      getDataSearch(text);

    }

  }



  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.flexRow}>
          <View style={styles.item1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}>
              <Image style={styles.avt} source={avatar1} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}> Hello {nameUser} </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.touchableOpacity}>
            <Ionicons name="cart" size={30} color="#055E38" style={styles.cartIcons} />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <TextInput
            placeholder='Search coffee'
            style={styles.input}
            onChangeText={(text) => handleSearch(text)}
          ></TextInput>
        </View>
        <ScrollView style={{ marginBottom: 140, display: searching ? 'none' : 'flex' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Category</Text>
          <FlatList
            horizontal
            data={category}
            renderItem={renderCategoryItem}
            keyExtractor={(item, index) => index.toString()}
          />

          <FlatList
            key={flatListKey}
            horizontal
            data={products}
            renderItem={renderProductItem}

            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.content}>Special offer</Text>
          <FlatList

            data={products}
            renderItem={renderSpecialItem}
            keyExtractor={(item, index) => index.toString()}

          />
        </ScrollView>

        <FlatList
          style={{ marginBottom: 140, display: !searching ? 'none' : 'flex' }}
          data={fliterPro}
          renderItem={renderSearchItem}
          keyExtractor={(item, index) => index.toString()}

        />

      </View>
    </View>
  );
}

export default Home;
