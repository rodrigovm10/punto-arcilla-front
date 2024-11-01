import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

interface ButtonProps {
  children?: React.ReactNode
  onPress: () => void
  disabled?: boolean
  classProps?: string
  isLoading?: boolean
}

export function Button({
  children,
  onPress,
  disabled = false,
  classProps = '',
  isLoading = false
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`py-4 mt-3 w-full items-center rounded-xl ${
        disabled || isLoading ? 'bg-alloyOrange' : 'bg-primary'
      } ${classProps}`}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
    >
      <View className='flex-row items-center justify-center'>
        {isLoading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text
            className='font-bold text-white'
            style={{ fontFamily: 'GraphikRegular' }}
          >
            {children}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}
