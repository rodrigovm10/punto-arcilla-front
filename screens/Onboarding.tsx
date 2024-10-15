import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'

const OnboardingImg = require('../assets/images/onboarding.png')

export function Onboarding() {
  return (
    <View>
      <Image
        source={OnboardingImg}
        style={{ width: 320, height: 440 }}
        className='rounded-lg'
      />
      <View className='flex justify-center items-center gap-y-2 '>
        <Text className='text-lg font-bold g'>Bienvenido a Punto de Arcilla</Text>
        <Pressable
          onPress={() => alert('holaaa')}
          className='bg-blue-400 w-full rounded-md flex items-center p-2'
        >
          <Text className='text-white'>Siguiente</Text>
        </Pressable>
        <Pressable
          onPress={() => alert('holaaa')}
          className='bg-blue-400 w-full text-white rounded-md flex items-center p-2'
        >
          <Text className='text-white'>Saltar</Text>
        </Pressable>
      </View>
    </View>
  )
}
