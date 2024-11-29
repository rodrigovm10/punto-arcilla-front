import { ItemAccount } from '@/components/account/ItemAccount'
import { LogOutIcon } from '@/components/Icons'
import { Loader } from '@/components/ui/Loader'
import { Separator } from '@/components/ui/Separator'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { useAccount } from '@/hooks/account/useAccount'
import { Image } from 'expo-image'
import { Pressable, RefreshControl, ScrollView } from 'react-native'

import { Text, View } from 'react-native'

export default function AccountScreen() {
  const { isRefreshing, onRefresh, profile, user, items, isLoading, signOut } = useAccount()

  if (isLoading) {
    return <Loader />
  }
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
