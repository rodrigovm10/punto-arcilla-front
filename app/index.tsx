import { useOnboarding } from '@/hooks/useOnboarding'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function IndexScreen() {
  const { checkBoarding, boarding } = useOnboarding()
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Hola, {JSON.stringify(boarding)} a</Text>

      <Link
        className='mb-10'
        href='/login'
      >
        Logina
      </Link>
      <Link href='/signup'>Sign</Link>
    </View>
  )
}
