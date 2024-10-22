import { Redirect, Stack } from 'expo-router'
import { useSession } from '@/hooks/auth/useSession'

export default function AuthLayout() {
  const { session } = useSession()

  if (session) {
    return <Redirect href={'/(app)/product'} />
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
