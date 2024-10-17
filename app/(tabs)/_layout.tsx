import { Stack, Tabs } from 'expo-router'
import { Text, View } from 'react-native'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'yellow'
      }}
    >
      <Tabs.Screen
        name='product'
        options={{ title: 'Productos' }}
      ></Tabs.Screen>
      <Tabs.Screen
        name='account'
        options={{ title: 'Cuenta' }}
      ></Tabs.Screen>
    </Tabs>
  )
}
