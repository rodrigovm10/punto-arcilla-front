import { Redirect, Stack } from 'expo-router'
import { useSession } from '@/hooks/auth/useSession'
import { UserLogged } from '@/interfaces/user'

export default function AuthLayout() {
  const { session, user } = useSession()
  if (session && user) {
    const userObject: UserLogged = JSON.parse(user)
    if (userObject.role && userObject.email) return <Redirect href={'/product'} />
  }

  return (
    <Stack
      screenOptions={{ statusBarColor: '#582F0E', headerStyle: { backgroundColor: '#582F0E' } }}
    >
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
