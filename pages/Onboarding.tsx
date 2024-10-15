import { Image } from 'expo-image'
import { View } from 'react-native'

const OnboardingImg = require('../assets/images/onboarding.png')

export function Onboarding() {
  return (
    <Image
      source={OnboardingImg}
      style={{ width: 320, height: 440 }}
    />
  )
}
