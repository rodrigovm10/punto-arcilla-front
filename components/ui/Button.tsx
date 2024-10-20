import { Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  children: React.ReactNode
  onPress: () => {}
}

export function Button({ children, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      className='bg-primary py-4 mt-3 w-full items-center rounded-xl'
      onPress={onPress}
      activeOpacity={0.8}
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
