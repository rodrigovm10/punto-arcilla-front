import { SessionProvider } from '@/context/authContext'
import { Slot, Stack } from 'expo-router'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='login'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='signup'
          options={{ headerShown: false }}
        />
      </Stack>
    </SessionProvider>
  )
}
