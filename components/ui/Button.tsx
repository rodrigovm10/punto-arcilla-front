import { useEffect } from 'react'
import { Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  children: React.ReactNode
  onPress: () => {} | void
  disabled?: boolean
  classProps?: string
}

export function Button({ children, onPress, disabled = false, classProps }: ButtonProps) {
  return (
    <TouchableOpacity
      className={` bg-primary py-4 mt-3 w-full items-center rounded-xl ${classProps} ${
        !disabled ? 'bg-primary' : 'bg-alloyOrange'
      }`}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text
        className='font-bold text-white'
        style={{ fontFamily: 'GraphikRegular' }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
