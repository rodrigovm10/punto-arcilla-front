import { useEffect } from 'react'
import { router, Tabs } from 'expo-router'

import { getUser } from '@/services/user'
import { COLORS } from '@/constants/colors'
import { UserLogged } from '@/interfaces/user'
import { useSession } from '@/hooks/auth/useSession'
import { userHasAddress, userHasProfile } from '@/lib/scripts'
import { CartIcon, HomeIcon, SearchIcon, UserIcon } from '@/components/Icons'

export default function AppLayout() {
  const { session, user } = useSession()

  useEffect(() => {
    ;(async () => {
      if (!user || !session) return

      const userObject: UserLogged = JSON.parse(user)

      const userDb = await getUser(userObject?.id, session)

      const [hasAddress, addressMessage] = await userHasAddress(user, session)
      const [hasProfile, profileMessage] = await userHasProfile(user, session)

      if (!userDb.data.user.role) {
        router.replace('/role')
      }

      if (!hasProfile) {
        router.replace(`/profile?role=${userDb.data.user.role}`)
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
        tabBarStyle: {
          backgroundColor: 'white'
          // paddingBottom: 4,
          // height: 75
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarLabelStyle: {
          fontFamily: 'GraphikSemibold'
        },
        headerTitleStyle: {
          fontFamily: 'GraphikSemibold'
        }
      }}
    >
      <Tabs.Screen
        name='product'
        options={{
          title: 'Productos',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarItemStyle: {}
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name='search'
        options={{ title: 'Buscar', tabBarIcon: ({ color }) => <SearchIcon color={color} /> }}
      ></Tabs.Screen>

      <Tabs.Screen
        name='cart'
        options={{ title: 'Carrito', tabBarIcon: ({ color }) => <CartIcon color={color} /> }}
      ></Tabs.Screen>
      <Tabs.Screen
        name='account'
        options={{
          title: 'Cuenta',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
          headerShown: true
        }}
      ></Tabs.Screen>
    </Tabs>
  )
}
