import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const url_orders = 'http://localhost:3000/orders';

const History = ({ navigation }) => {
    const [ordersData, setOrdersData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        getOrdersFromAPI();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        getOrdersFromAPI();
        setRefreshing(false);
    };


    const getOrdersFromAPI = () => {
        fetch(url_orders)
            .then((res) => res.json())
            .then(data => {
                setOrdersData(data);

            })
            .catch((ex) => console.log(ex));
    };

    const renderItem = ({ item }) => {
        const calculateTotal = () => {
            let total = 0;
            Object.values(item).forEach((product) => {
                if (typeof product === 'object') {
                    total += product.price * product.quantity;
                }
            });
            return total;
        };

        return (
            <View style={{
                marginBottom: 20, backgroundColor: '#FBFBFA', padding: 20,
                borderRadius: 10,
            }}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>ID bill: {item.id}</Text>
                {Object.values(item).map((product, index) => (
                    typeof product === 'object' && (
                        <View key={index}>
                            <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{product.nameProduct} </Text>
                            <Text>Quantity: {product.quantity}     Price: ${product.price}       Total item: ${product.price * product.quantity}</Text>
                        </View>
                    )
                ))}
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>Total: ${calculateTotal()}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("Setting")}>
                    <Ionicons name="arrow-back" size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>List of history order</Text>
            </View>


            <FlatList
                data={ordersData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
});

export default History;
