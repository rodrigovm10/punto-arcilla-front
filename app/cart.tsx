import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const cartItems = [
  { id: '1', name: 'Woman Sweater', price: 70, quantity: 1, image: { uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png' }, category: 'Woman Fashion' },
  { id: '2', name: 'Smart Watch', price: 55, quantity: 1, image: { uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png' }, category: 'Electronics' },
  { id: '3', name: 'Wireless Headphone', price: 120, quantity: 1, image: { uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png' }, category: 'Electronics' },
];

export default function Cart() {
  const [cart, setCart] = useState(cartItems);

  const handleQuantityChange = (id: string, action: 'increase' | 'decrease') => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {cart.map(item => (
        <View key={item.id} style={styles.cartItem}>
          <Image source={item.image} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrease')} style={styles.quantityButton}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increase')} style={styles.quantityButton}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.buttonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.discountSection}>
        <TextInput placeholder="Enter Discount Code" style={styles.discountInput} />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.summarySection}>
        <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Total: ${subtotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#654321' }, 
  cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 10 },
  productImage: { width: 60, height: 60, resizeMode: 'contain', marginRight: 10 },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#654321' }, 
  productCategory: { fontSize: 12, color: '#8B4513' }, 
  productPrice: { fontSize: 14, color: '#654321' }, 
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { width: 30, height: 30, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', borderRadius: 5 },
  buttonText: { fontSize: 18, color: '#654321' }, 
  quantityText: { marginHorizontal: 10, fontSize: 16 },
  deleteButton: { marginLeft: 10 },
  discountSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  discountInput: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  applyButton: { backgroundColor: '#654321', padding: 10, marginLeft: 10, borderRadius: 5 }, 
  applyButtonText: { color: '#fff' },
  summarySection: { marginBottom: 20 },
  summaryText: { fontSize: 16, fontWeight: 'bold', color: '#654321' }, 
  checkoutButton: { backgroundColor: '#654321', padding: 15, borderRadius: 5, alignItems: 'center' }, 
  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
