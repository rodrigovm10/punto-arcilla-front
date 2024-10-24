import { Redirect, Stack } from 'expo-router'
import { useSession } from '@/hooks/auth/useSession'
import { UserLogged } from '@/interfaces/user'

export default function AuthLayout() {
  const { session, user } = useSession()
  if (session && user) {
    const userObject: UserLogged = JSON.parse(user)
    if (userObject.name && userObject.email) return <Redirect href={'/(app)/product'} />
  }

  return (
    <Stack>
      <Stack.Screen
        name='login'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='signup'
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
