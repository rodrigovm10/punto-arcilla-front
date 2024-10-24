import { Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  children: React.ReactNode
  onPress: () => {} | void
  disabled?: boolean
}

export function Button({ children, onPress, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity
      className={`bg-primary py-4 mt-3 w-full items-center rounded-xl ${
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
