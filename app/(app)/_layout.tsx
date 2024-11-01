import { useEffect } from 'react'
import { router, Tabs } from 'expo-router'

import { userHasAddress, userHasProfile } from '@/lib/scripts'
import { UserLogged } from '@/interfaces/user'
import { useSession } from '@/hooks/auth/useSession'
import { HomeIcon, SearchIcon } from '@/components/Icons'

export default function AppLayout() {
  const { session, user, isLoadingUser } = useSession()

  useEffect(() => {
    if (isLoadingUser) return

    if (user) {
      const userObject: UserLogged = JSON.parse(user)
      if (!userObject.role) {
        router.replace('/role')
      }
    }
  }, [user])

  useEffect(() => {
    ;(async () => {
      if (!user || !session) return

      const userObject: UserLogged = JSON.parse(user)

      const [hasAddress, addressMessage] = await userHasAddress(user, session)
      const [hasProfile, profileMessage] = await userHasProfile(user, session)

      if (!hasProfile) {
        router.replace(`/profile?role=${userObject.role}`)
        alert(profileMessage)
        return
      }
      if (!hasAddress) {
        router.replace('/address')
        alert(addressMessage)
        return
      }
    })()
  }, [user, session])

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
