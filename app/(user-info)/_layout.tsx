import { useEffect } from 'react'
import { router, Stack } from 'expo-router'

import { UserLogged } from '@/interfaces/user'
import { useSession } from '@/hooks/auth/useSession'
import { userHasAddress, userHasProfile } from '@/lib/scripts'
import { getUser } from '@/services/user'

export default function ProfileLayout() {
  const { session, user, isLoadingUser } = useSession()

  useEffect(() => {
    ;(async () => {
      if (!user || !session) return

      const userObject: UserLogged = JSON.parse(user)

      const userDb = await getUser(userObject.id, session)

      const [hasAddress] = await userHasAddress(user, session)
      const [hasProfile] = await userHasProfile(user, session)

      if (userDb.data.user.role && hasProfile && hasAddress) {
        router.replace('/product')
      }

      if (!userDb.data.user.role && hasProfile && hasAddress) {
        router.replace('/role')
      }

      if (userDb.data.user.role && !hasProfile && !hasAddress) {
        router.replace(`/profile?role=${userDb.data.user.role}`)
      }
    })()
  }, [user, session])

  return (
    <Stack
      screenOptions={{ statusBarColor: '#582F0E', headerStyle: { backgroundColor: '#582F0E' } }}
    >
      <Stack.Screen
        name='profile'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='role'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='address'
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
