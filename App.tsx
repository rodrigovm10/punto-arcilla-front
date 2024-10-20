import { StatusBar, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Onboarding } from './screens/Onboarding'

export default function App() {
  return (
    <SafeAreaProvider>
      <View className='flex-1 '>
        <StatusBar backgroundColor='#582F0E' />
        <Onboarding />
      </View>
    </SafeAreaProvider>
  )
}
