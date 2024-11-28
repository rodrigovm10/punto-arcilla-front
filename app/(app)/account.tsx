import { ItemAccount } from '@/components/account/ItemAccount'
import { LogOutIcon } from '@/components/Icons'
import { Separator } from '@/components/ui/Separator'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { ACCOUNT_ITEMS, AccountItem } from '@/constants/items'
import { useSession } from '@/hooks/auth/useSession'
import { Profile } from '@/interfaces/profile'
import { Role, UserLogged } from '@/interfaces/user'
import { getProfile, getUser } from '@/services/user'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { Pressable, RefreshControl, ScrollView } from 'react-native'

import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AccountScreen() {
  const [user, setUser] = useState<UserLogged>()
  const [profile, setProfile] = useState<Profile>()
  const { user: userSession, session: token, signOut } = useSession()
  const [items, setItems] = useState<AccountItem[]>(ACCOUNT_ITEMS)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { top } = useSafeAreaInsets()

  const fetchUserData = async () => {
    if (!userSession || !token) return

    const userSessionObject: UserLogged = JSON.parse(userSession)
    const userDb = await getUser(userSessionObject.id, token)
    const profileDb = await getProfile(userSessionObject.id, token)

    setUser(userDb.data)
    setProfile(profileDb.data)
    // Mapeo bidireccional entre Role y strings
    const RoleStringMap = {
      [Role.SELLER]: 'SELLER',
      [Role.BUYER]: 'BUYER'
    }

    const StringToRoleMap = {
      SELLER: Role.SELLER,
      BUYER: Role.BUYER
    }
    if (user?.role === RoleStringMap[Role.SELLER]) {
      setItems(ACCOUNT_ITEMS.filter(item => item.name !== 'Compras'))
    }
    if (user?.role === RoleStringMap[Role.BUYER]) {
      setItems(ACCOUNT_ITEMS.filter(item => item.name !== 'Productos'))
    }
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    await fetchUserData()
    setIsRefreshing(false)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      className='flex bg-white flex-1'
    >
      <View className='self-center'>
        {profile?.avatar ? (
          <Image source={profile?.avatar} />
        ) : (
          <Text className='bg-white p-4 rounded-full mt-2 text-xl mb-2 self-center border-black border-[1px]'>
            {profile?.name.slice(0, 2).toUpperCase()}
          </Text>
        )}
        <Text
          style={{ fontFamily: 'GraphikMedium' }}
          className='text-2xl'
        >
          {profile?.name}
        </Text>
        <Text
          style={{ fontFamily: 'GraphikMedium' }}
          className='text-gray-400 text-xs font-semibold text-center'
        >
          {user?.email}
        </Text>
      </View>
      <Separator classProps='mt-6 mb-5' />
      <View className='flex px-4 w-full'>
        {items.map(item => (
          <ItemAccount
            key={item.id}
            name={item.name}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </View>
      <Separator />
      <View className='flex self-start px-4 gap-y-4 w-full mt-1'>
        <Pressable
          className='m-0 p-0 flex-row items-center'
          onPress={() => signOut()}
        >
          <LogOutIcon
            className='opacity-80 self-center text-red-600'
            size={14}
          />
          <TextWrapper
            fontFamily='GraphikMedium'
            classProps='text-red-600 self-start ml-2 text-base'
          >
            Cerrar Sesión
          </TextWrapper>
        </Pressable>
      </View>
    </ScrollView>
  )
}
