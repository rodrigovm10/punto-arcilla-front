import { ActivityIndicator, View } from 'react-native'

export function Loader() {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator
        color='#582F0E'
        size={'large'}
      />
    </View>
  )
}
