import { ItemAccount } from '@/components/account/ItemAccount'
import { LogOutIcon } from '@/components/Icons'
import { Separator } from '@/components/ui/Separator'
import { ACCOUNT_ITEMS } from '@/constants/items'
import { useSession } from '@/hooks/auth/useSession'
import { Profile } from '@/interfaces/profile'
import { UserLogged } from '@/interfaces/user'
import { getProfile, getUser } from '@/services/user'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, RefreshControl, ScrollView } from 'react-native'

import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AccountScreen() {
  const [user, setUser] = useState<UserLogged>()
  const [profile, setProfile] = useState<Profile>()
  const { user: userSession, session: token } = useSession()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { top } = useSafeAreaInsets()

  const fetchUserData = async () => {
    if (!userSession || !token) return

    const userSessionObject: UserLogged = JSON.parse(userSession)
    const userDb = await getUser(userSessionObject.id, token)
    const profileDb = await getProfile(userSessionObject.id, token)

    setUser(userDb.data)
    setProfile(profileDb.data)
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
    <View className='flex items-center bg-white flex-1'>
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
        <FlatList
          data={ACCOUNT_ITEMS}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isRefreshing}
          //     progressViewOffset={top}
          //     onRefresh={onRefresh}
          //   />
          // }
          renderItem={({ item }) => (
            <ItemAccount
              name={item.name}
              icon={item.icon}
              href={item.href}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <Separator />
      <View className='flex self-start px-4 gap-y-4 w-full mt-1'>
        <Pressable
          className='m-0 p-0'
          onPress={() => {}}
        >
          <ItemAccount
            name='Cerrar Sesión'
            icon={
              <LogOutIcon
                className='opacity-80 self-center text-red-600'
                size={14}
              />
            }
            classProps='text-red-600'
          />
        </Pressable>
      </View>
    </View>
  )
}
