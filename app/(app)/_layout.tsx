import { HomeIcon, SearchIcon } from '@/components/Icons'
import { useSession } from '@/hooks/auth/useSession'
import { UserLogged } from '@/interfaces/user'
import { router, Tabs } from 'expo-router'
import { useEffect } from 'react'

export default function AppLayout() {
  const { user, isLoadingUser } = useSession()

  useEffect(() => {
    if (isLoadingUser) return

    if (user) {
      const userObject: UserLogged = JSON.parse(user)

      if (!userObject.name) {
        alert('No has compleado tus datos, completa tus datos antes de iniciar')
        router.replace('/check-role')
      }
    }
  }, [user])
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
