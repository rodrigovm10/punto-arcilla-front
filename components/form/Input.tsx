import { useFonts } from 'expo-font'
import { Noop } from 'react-hook-form'
import { TextInput, View, Text } from 'react-native'

import { TextError } from './TextError'

interface InputProps {
  onChange: Noop
  onBlur: Noop
  value: string
  errors: any
  placeholder?: string
  typeError: string
  label: string
  isPassword?: boolean
}

export function Input({
  onChange,
  onBlur,
  value,
  errors,
  typeError,
  label,
  isPassword = false
}: InputProps) {
  const [loaded] = useFonts({
    GraphikBold: require('../../assets/fonts/GraphikBold.otf'),
    GraphikRegular: require('../../assets/fonts/GraphikRegular.otf'),
    GraphikSemibold: require('../../assets/fonts/GraphikSemibold.otf'),
    GraphikMedium: require('../../assets/fonts/GraphikMedium.otf')
  })

  if (!loaded) return null

  return (
    <>
      <View className='w-full my-5 flex justify-center items-center'>
        <Text
          className='self-start opacity-60 text-base'
          style={{ fontFamily: 'GraphikMedium' }}
        >
          {label}
        </Text>
        <TextInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          className={`w-full py-3 border-[#ccc] border-[2px] border-t-0 border-x-0 focus:caret-primary font-semibold text-lg ${
            errors[typeError] ? 'border-b-red-500' : 'border-b-gray-300'
          }`}
          style={{ fontFamily: 'GraphikMedium' }}
          selectionColor='#582F0E'
          secureTextEntry={isPassword}
        />

        {errors[typeError] && <TextError>{errors[typeError].message}</TextError>}
      </View>
    </>
  )
}
