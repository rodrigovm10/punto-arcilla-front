import { Image } from 'expo-image'
import { Redirect, router } from 'expo-router'
import { Text, View } from 'react-native'
import { Dimensions } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

import { ONBOARDING_TEXTS } from '@/constants/texts'
import { useSession } from '@/hooks/auth/useSession'

export default function OnboardingScreen() {
  const { session } = useSession()

  if (session) {
    return <Redirect href={'/(app)/product'} />
  }

  const buttonLabel = (label: string) => {
    return (
      <View className='p-[12px] bg-primary rounded-lg'>
        <Text
          className='font-bold text-white'
          style={{ fontFamily: 'GraphikMedium' }}
        >
          {label}
        </Text>
      </View>
    )
  }

  const { width } = Dimensions.get('screen')

  return (
    <>
      <AppIntroSlider
        data={ONBOARDING_TEXTS}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, alignItems: 'center', padding: 15, paddingTop: 100 }}>
              <Image
                source={item.image}
                style={{ width: width - 50, height: 400 }}
              />
              <Text
                className='text-black text-bold text-xl mb-4 '
                style={{ fontFamily: 'GraphikBold' }}
              >
                {item.title}
              </Text>
              <Text
                className='text-black px-5 text-justify leading-6'
                style={{ fontFamily: 'GraphikMedium' }}
              >
                {item.text}
              </Text>
            </View>
          )
        }}
        activeDotStyle={{ backgroundColor: '#582F0E', width: 30 }}
        renderNextButton={() => buttonLabel('Siguiente')}
        renderSkipButton={() => buttonLabel('Saltar')}
        renderDoneButton={() => buttonLabel('Iniciar Sesión')}
        onDone={() => {
          router.push('/signup')
        }}
        showSkipButton={true}
      />
    </>
  )
}
