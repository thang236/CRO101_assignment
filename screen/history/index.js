import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';

const url_orders = 'http://192.168.1.6:3000/orders';

const History = () => {
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
        // Tính tổng giá trị của đơn hàng
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
            <View style={{ marginBottom: 20 }}>
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
            <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 60 }}>List of history order</Text>
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
});

export default History;
