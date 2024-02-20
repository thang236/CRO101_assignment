import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Modal, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const url_api = 'http://localhost:3000/products?isFavorite=1';

const Favorite = () => {
  const [favoriteItems, setFavoriteItem] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("Bắt đầu load lại dữ liệu");

    getFavoritesfromAPI();
    setRefreshing(false);
    console.log("Đã load xong");
  }, []);

  // useEffect(() => {
  //   getFavoritesfromAPI();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      getFavoritesfromAPI();
      return () => {
      };
    }, [])
  );

  const getFavoritesfromAPI = async () => {
    try {
      let res = await fetch(url_api);
      let data = await res.json();
      setFavoriteItem(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveFavorite = (id) => {
    setSelectedItemId(id);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemId) {
      let url_Update = 'http://localhost:3000/products/' + selectedItemId;
      console.log(url_Update);
      fetch(url_Update, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite: false })
      })
        .then((res) => {
          console.log(res.status);
          if (res.status == 200) {
            Alert.alert('Notification', "Successfully deleted favorites list");
            getFavoritesfromAPI();
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
    setDeleteConfirmationVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleFavoriteItemPress = (item) => {
    navigation.navigate('aaa', {
      data: item.image,
      namePro: item.nameProduct,
      withwhere: item.description,
      money: item.price,
      favorite: item.isFavorite,
      id: item.id,
      category: item.category
    });
  };

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Favorite</Text>

      {favoriteItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.favoriteItem}
          onPress={() => handleFavoriteItemPress(item)}
        >
          <Image style={styles.favoriteItemImage} source={{ uri: item.image }} />
          <View style={styles.favoriteItemInfo}>
            <Text style={styles.favoriteItemName}>{item.nameProduct}</Text>
            <Text style={styles.favoriteItemDescription}>{item.description}</Text>
            <Text style={styles.favoriteItemPrice}>$ {item.price}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteItemRemoveButton} onPress={() => handleRemoveFavorite(item.id)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

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
    marginTop: 40,
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
    color: '#055E38',
    marginTop: 5,
  },
  favoriteItemRemoveButton: {
    padding: 10,
    borderRadius: 5,
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

export default Favorite;
