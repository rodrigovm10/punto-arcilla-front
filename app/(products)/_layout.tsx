import { Stack } from 'expo-router'

export default function ProductsLayout() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontFamily: 'GraphikSemibold' } }}>
      <Stack.Screen
        name='index'
        options={{ title: 'Productos' }}
      />
      <Stack.Screen name='product-form' />
    </Stack>
  )
}
