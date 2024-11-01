import { useSession } from '@/hooks/auth/useSession'
import { useProfile } from '@/hooks/userInfo/useProfile'
import { useRole } from '@/hooks/userInfo/useRole'
import { Profile } from '@/interfaces/profile'
import { UserLogged } from '@/interfaces/user'
import { getProfile, getUser } from '@/services/user'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'

import { Text, View } from 'react-native'

export default function AccountScreen() {
  const [user, setUser] = useState<UserLogged>()
  const [profile, setProfile] = useState<Profile>()
  const { user: userSession, session: token } = useSession()

  useEffect(() => {
    ;(async () => {
      if (!userSession || !token) return

      const userSessionObject: UserLogged = JSON.parse(userSession)

      const userDb = await getUser(userSessionObject.id, token)

      setUser(userDb.data)

      const profileDb = await getProfile(userSessionObject.id, token)

      setProfile(profileDb.data)
    })()
  }, [])

  return (
    <View className='flex justify-center items-center'>
      <View>
        {profile?.avatar ? (
          <Image source={profile?.avatar} />
        ) : (
          <Text className='bg-white p-4 rounded-full mt-2 text-xl mv-2 self-center'>
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
          className='opacity-75 text-xs font-semibold'
        >
          {user?.email}
        </Text>
      </View>

      <View className='flex self-start px-4 gap-y-4 mt-8'>
        <Text
          className='text-base '
          style={{ fontFamily: 'GraphikMedium' }}
        >
          Perfil
        </Text>
        <Text>Direcciones</Text>
        <Text>Productos</Text>
        <Text>Compras</Text>
        <Text>Notificaciones</Text>
        <Text>Cerrar Sesión</Text>
      </View>
    </View>
  )
}
