import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Slot, router } from 'expo-router'
import { StatusBar, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useSession } from '@/hooks/auth/useSession'
import { SessionProvider } from '@/context/authContext'
import { useOnboarding } from '@/hooks/useOnboarding'
import { BoardingProvider } from '@/context/boardingContext'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    GraphikBold: require('../assets/fonts/GraphikBold.otf'),
    GraphikRegular: require('../assets/fonts/GraphikRegular.otf'),
    GraphikSemibold: require('../assets/fonts/GraphikSemibold.otf'),
    GraphikMedium: require('../assets/fonts/GraphikMedium.otf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const { session, isLoading } = useSession()
  const { isLoading: boardingLoading, boarding: boardingCompleted } = useOnboarding()

  useEffect(() => {
    if (isLoading) return
    if (boardingLoading) return

    if (session) router.replace('/product')
    else router.replace('/(onboarding)')
  }, [isLoading, session, boardingLoading])

  return (
    <SessionProvider>
      <BoardingProvider>
        <SafeAreaProvider>
          <View className='flex-1 '>
            <StatusBar backgroundColor='#582F0E' />
            <Slot />
          </View>
        </SafeAreaProvider>
      </BoardingProvider>
    </SessionProvider>
  )
}
