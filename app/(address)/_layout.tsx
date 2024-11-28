import { ArrowLeftIcon, ShoppingBagIcon } from '@/components/Icons'
import { Link, Stack, useRouter } from 'expo-router'
import { Pressable, Text } from 'react-native'

export default function AddressLayout() {
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: 'GraphikSemibold' },
        headerShadowVisible: false
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: ``,

          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              className='rounded-full bg-white p-2'
            >
              <ArrowLeftIcon />
            </Pressable>
          ),
          headerRight: () => (
            <Link
              asChild
              href='/(app)/cart'
            >
              <Pressable>
                <ShoppingBagIcon />
              </Pressable>
            </Link>
          )
        }}
      />
    </Stack>
  )
}
