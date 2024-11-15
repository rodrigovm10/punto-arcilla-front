import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const products = [
  { id: '1', name: 'Wireless Headphones', price: '$120.00', image: { uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png' } },
  { id: '2', name: 'Woman Sweater', price: '$70.00', image: { uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png' } },
];

export default function ProductList() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2} 
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push({ pathname: '/product-detail', params: { id: item.id } })} 
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  productCard: { 
    flex: 1, 
    padding: 10, 
    margin: 10, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    position: 'relative' 
  },
  productImage: { width: '100%', height: 150, resizeMode: 'contain' },
  heartIcon: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    fontSize: 24 
  },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#654321', marginTop: 10 },
  productPrice: { fontSize: 14, color: '#654321' },
});
