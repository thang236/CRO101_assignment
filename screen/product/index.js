import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Product = ({ navigation }) => {
  const route = useRoute();
  const { data, namePro, withwhere, money } = route.params || {};

  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSizePress = (size) => {
    setSelectedSize(size);
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={data} />
        <View style={styles.overlay}>
          <Text style={styles.overlayTextLarge}>{namePro}</Text>
          <Text style={styles.overlayTextSmall}>{withwhere}</Text>
        </View>
        <View style={styles.overlayBottom} />
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={30} color="#FF0000" style={styles.heartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.information}>
        <View style={styles.flexRow}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Size</Text>
        </View>
        <View style={styles.flexRow1}>
          <TouchableOpacity
            style={[
              styles.boxSize,
              selectedSize === 'small' && { borderColor: '#015C33', backgroundColor: '#015C33' },
            ]}
            onPress={() => handleSizePress('small')}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Small</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxSize,
              selectedSize === 'medium' && { borderColor: '#015C33', backgroundColor: '#015C33' },
            ]}
            onPress={() => handleSizePress('medium')}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxSize,
              selectedSize === 'large' && { borderColor: '#015C33', backgroundColor: '#015C33' },
            ]}
            onPress={() => handleSizePress('large')}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Large</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 25, marginTop: 30 }}>About</Text>
        <Text style={{ marginHorizontal: 25, marginTop: 10 }}>
          Cappuccino, an Italian classic, blends strong espresso with velvety steamed milk and frothy foam. Served in a small cup, it delivers a harmonious balance of bold flavors and creamy richness, making it a timeless and indulgent choice for coffee lovers.
        </Text>
        <TouchableOpacity style={styles.btnAdd} onPress={() => alert('Add to cart')}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Add To Cart     |      {money}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 40,
    paddingLeft: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTextLarge: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlayTextSmall: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: 'black',
  },
  information: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 23,
    marginTop: 30,
    marginBottom: 30,
  },
  flexRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 23,
    marginBottom: 30,
  },
  boxSize: {
    height: 40,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdd: {
    backgroundColor: '#005223',
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 100,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  heartIcon: {
    fontWeight: 'bold',
  },
});

export default Product;
