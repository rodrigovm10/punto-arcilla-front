import { useState } from 'react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Dimensions } from 'react-native'

import { ONBOARDING_TEXTS } from '@/constants/texts'

export function Onboarding() {
  const [showHomePage, setShowHomePage] = useState(false)

  const buttonLabel = (label: string) => {
    return (
      <View className='p-[12px] bg-primary rounded-lg'>
        <Text className='font-bold text-white'>{label}</Text>
      </View>
    )
  }

  const { width } = Dimensions.get('screen')

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={ONBOARDING_TEXTS}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, alignItems: 'center', padding: 15, paddingTop: 100 }}>
              <Image
                source={item.image}
                style={{ width: width - 50, height: 400 }}
              />
              <Text className='text-black font-bold text-xl mb-4'>{item.title}</Text>
              <Text className='text-black text-base px-5 text-justify'>{item.text}</Text>
            </View>
          )
        }}
        activeDotStyle={{ backgroundColor: '#003049', width: 30 }}
        renderNextButton={() => buttonLabel('Siguiente')}
        renderSkipButton={() => buttonLabel('Saltar')}
        renderDoneButton={() => buttonLabel('Iniciar Sesión')}
        onDone={() => {
          setShowHomePage(true)
        }}
        showSkipButton={true}
      />
    )
  }

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}
