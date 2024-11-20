import { ArrowLeftIcon } from '@/components/Icons'
import { Link, Stack } from 'expo-router'
import { Pressable } from 'react-native'

export default function ProductsLayout() {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontFamily: 'GraphikSemibold' } }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Productos',
          headerShadowVisible: false,

          headerLeft: () => (
            <Link
              asChild
              href={'/(app)/account'}
              className='mr-10'
            >
              <Pressable>
                <ArrowLeftIcon size={20} />
              </Pressable>
            </Link>
          )
        }}
      />
      <Stack.Screen
        name='product-form'
        options={{
          title: 'Crear Producto',
          headerShadowVisible: false,

          headerLeft: () => (
            <Link
              asChild
              href={'/(products)'}
              className='mr-10'
            >
              <Pressable>
                <ArrowLeftIcon size={20} />
              </Pressable>
            </Link>
          )
        }}
      />
    </Stack>
  )
}
