import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const products: Record<string, { name: string; price: string; image: any }> = {
  '1': { name: 'Wireless Headphones', price: '$120.00', image: { uri: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-traditional-abstract-pottery-png-image_13016873.png' } },
  '2': { name: 'Woman Sweater', price: '$70.00', image: { uri: 'https://w7.pngwing.com/pngs/584/25/png-transparent-ceramic-vase-pottery-porcelain-ceramic-bottle-glass-plastic-bottle-alcohol-bottle.png' } },
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const productId = Array.isArray(id) ? id[0] : id;

  const product = products[productId as keyof typeof products]; 

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
        <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum lobortis ligula.
      </Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => alert('Added to cart')}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  productImage: { width: '100%', height: 300, resizeMode: 'contain' },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#654321', marginVertical: 10 },
  productPrice: { fontSize: 20, color: '#654321' },
  description: { fontSize: 16, color: '#654321', marginVertical: 10 },
  addToCartButton: { backgroundColor: '#654321', padding: 15, borderRadius: 10, alignItems: 'center' },
  addToCartText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  goBackButton: { backgroundColor: '#D2B48C', padding: 10, borderRadius: 10, marginTop: 10, alignItems: 'center' },
  goBackText: { color: '#fff', fontSize: 16 },
});
