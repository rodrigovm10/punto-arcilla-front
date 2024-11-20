import { ShoppingBagIcon } from '@/components/Icons'
import { Link, Stack } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function HomeLayout() {
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
          title: `Dirección de entrega`,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 14 },

          headerLeft: () => <Text></Text>,
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
