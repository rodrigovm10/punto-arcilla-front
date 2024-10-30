import { BackIcon } from '@/components/Icons'
import { Link, Stack } from 'expo-router'
import { Pressable } from 'react-native'

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{ statusBarColor: '#582F0E', headerStyle: { backgroundColor: '#582F0E' } }}
    >
      <Stack.Screen
        name='profile'
        options={{
          headerStyle: { backgroundColor: '#582F0E' },
          headerLeft: () => (
            <Link
              asChild
              href='/role'
            >
              <Pressable onPress={() => {}}>
                <BackIcon color={'white'} />
              </Pressable>
            </Link>
          ),
          title: ''
        }}
      />
      <Stack.Screen
        name='role'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='address'
        options={{
          headerStyle: { backgroundColor: '#582F0E' },
          headerLeft: () => (
            <Link
              asChild
              href='/profile'
            >
              <Pressable onPress={() => {}}>
                <BackIcon color={'white'} />
              </Pressable>
            </Link>
          ),
          title: ''
        }}
      />
    </Stack>
  )
}
