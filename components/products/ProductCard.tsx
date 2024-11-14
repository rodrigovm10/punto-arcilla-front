import { Image } from 'expo-image'
import { Text, View } from 'react-native'

export function ProductCard() {
  return (
    <View className='border rounded-md p-14 flex flex-1 justify-center items-center'>
      <Image
        className='w-full flex-1'
        source='https://img.freepik.com/foto-gratis/manos-alfarero-femenino-irreconocible-haciendo-jarron-arcilla-rueda-alfareria_1098-17825.jpg'
        transition={1000}
        contentFit='fill'
      />
    </View>
  )
}
