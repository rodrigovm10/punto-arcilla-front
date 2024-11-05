import { Stack } from 'expo-router';
import { SplashScreen } from 'expo-router';
//import { CartProvider } from './CartContext';

export default function RootLayout() {
  return (
    //<CartProvider>
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false }}
      />
      <Stack.Screen name="product-list" options={{ headerShown: true, title: 'Products' }} />
      <Stack.Screen name="product-detail" options={{ headerShown: true, title: 'Product Details' }} />
      <Stack.Screen name="cart" options={{ headerShown: true, title: 'Cart' }} />
    </Stack>
   // </CartProvider>
  );
}
