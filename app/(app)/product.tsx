import { Text, View } from 'react-native'

import { useSession } from '@/hooks/auth/useSession'
import { Button } from '@/components/ui/Button'
import { router } from 'expo-router'

export default function ProductScreen() {
  const { session, signOut } = useSession()

  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Product {session}</Text>
      <Button
        onPress={() => {
          signOut()
          router.replace('/login')
        }}
      >
        SignOut
      </Button>
    </View>
  )
}
