import { Text, View } from 'react-native'

export default function AddressScreen() {
  return (
    <View className='flex-1 mt-10 p-6 bg-white'>
      <View className='mb-4'>
        <Text
          className='font-semibold text-2xl mb-[10px]'
          style={{ fontFamily: 'GraphikBold' }}
        >
          A continuación llena la información de tu
          <Text className='text-primary inline'> dirección.</Text>
        </Text>
        <Text
          className='text-base font-bold opacity-60 mb-4'
          style={{ fontFamily: 'GraphikRegular' }}
        >
          Llena tu dirección
        </Text>
      </View>
    </View>
  )
}
