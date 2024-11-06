import { ABCIcon } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { useRef, useState } from 'react'
import { DrawerLayoutAndroid, Text, View } from 'react-native'

export default function Products() {
  const drawer = useRef<DrawerLayoutAndroid>(null)
  const [drawerPosition] = useState<'left' | 'right'>('left')

  const navigationView = () => (
    <View>
      <Text>I'm in the Drawer!</Text>
      <Text>Ordenes</Text>
      <Text>Chats</Text>
      <Text>Ventas</Text>
      {/* <Text>Clientes</Text> */}
      <Button onPress={() => drawer.current?.closeDrawer()}>Close drawer</Button>
    </View>
  )

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View>
        <Text>Drawer on the {drawerPosition}!</Text>

        <Button onPress={() => drawer.current?.openDrawer()}>Open drawer</Button>
      </View>
    </DrawerLayoutAndroid>
  )
}
