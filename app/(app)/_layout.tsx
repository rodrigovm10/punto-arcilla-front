import { HomeIcon, SearchIcon } from '@/components/Icons'
import { Tabs } from 'expo-router'

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'black', borderRadius: 10 },
        tabBarActiveTintColor: 'yellow'
      }}
    >
      <Tabs.Screen
        name='product'
        options={{ title: 'Productos', tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}
      ></Tabs.Screen>
      <Tabs.Screen
        name='search'
        options={{ title: 'Buscar', tabBarIcon: ({ color }) => <SearchIcon color={color} /> }}
      ></Tabs.Screen>
      <Tabs.Screen
        name='cart'
        options={{ title: 'Carrito' }}
      ></Tabs.Screen>
      <Tabs.Screen
        name='account'
        options={{ title: 'Cuenta' }}
      ></Tabs.Screen>
    </Tabs>
  )
}
