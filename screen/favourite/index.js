import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import img1 from '../../assets/img2.jpeg';
import img2 from '../../assets/img3.jpeg';
import img3 from '../../assets/img4.jpeg';

const Favorite = () => {
  const navigation = useNavigation(); 
  const favoriteItems = [
    { id: 1, image: img1, name: 'Cappuccino', description: 'A classic blend with hazelnut', price: '$4.50' },
    { id: 2, image: img2, name: 'Latte', description: 'Creamy delight with vanilla flavor', price: '$5.20' },
    { id: 3, image: img3, name: 'Espresso', description: 'Double shot for the strong coffee lover', price: '$3.80' },
  ];

  const handleFavoriteItemPress = (item) => {
    navigation.navigate('aaa', {
      data: item.image,
      namePro: item.name,
      withwhere: item.description,
      money: item.price,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Favorite</Text>

      {favoriteItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.favoriteItem}
          onPress={() => handleFavoriteItemPress(item)}
        >
          <Image style={styles.favoriteItemImage} source={item.image} />
          <View style={styles.favoriteItemInfo}>
            <Text style={styles.favoriteItemName}>{item.name}</Text>
            <Text style={styles.favoriteItemDescription}>{item.description}</Text>
            <Text style={styles.favoriteItemPrice}>{item.price}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteItemRemoveButton}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:40,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  favoriteItemInfo: {
    flex: 1,
    marginHorizontal: 15,
  },
  favoriteItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteItemDescription: {
    fontSize: 14,
    color: '#555',
  },
  favoriteItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#055E38', // Adjust the color to match your theme
    marginTop: 5,
  },
  favoriteItemRemoveButton: {
    padding: 10,
    borderRadius: 5,
  },
});

export default Favorite;
