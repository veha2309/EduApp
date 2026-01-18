import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface CartItem {
    _id: string;
    courseName: string;
    price: number;
    thumbnail: string;
}

const CartScreen = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const removeFromCart = (courseId: string) => {
        setCartItems(cartItems.filter(item => item._id !== courseId));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
                <Text style={styles.courseName}>{item.courseName}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
            </View>
            <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeFromCart(item._id)}
            >
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            
            {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <Text style={styles.emptySubText}>Add courses to get started</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item._id}
                        style={styles.cartList}
                    />
                    
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1B3D',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    emptySubText: {
        color: '#ccc',
        fontSize: 14,
    },
    cartList: {
        flex: 1,
    },
    cartItem: {
        backgroundColor: '#1A2B5C',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemInfo: {
        flex: 1,
    },
    courseName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#f44336',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    removeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    totalContainer: {
        backgroundColor: '#1A2B5C',
        padding: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    totalText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;