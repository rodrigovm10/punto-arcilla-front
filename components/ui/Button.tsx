import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

interface ButtonProps {
  children?: React.ReactNode
  onPress: () => void
  disabled?: boolean
  classProps?: string
  classContextProps?: string
  isLoading?: boolean
  variant?: 'primary' | 'error'
}

export function Button({
  children,
  onPress,
  disabled = false,
  classProps = '',
  isLoading = false,
  variant = 'primary',
  classContextProps
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary',
    error: 'bg-red-500/90'
  }

  return (
    <TouchableOpacity
      className={`py-4 mt-3 w-full items-center rounded-xl ${variantClasses[variant]} ${
        (disabled || isLoading) && 'bg-alloyOrange'
      } ${classProps} `}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
    >
      <View className='flex-row items-center justify-center'>
        {isLoading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text
            className={`font-bold text-white text-center ${classContextProps}`}
            style={{ fontFamily: 'GraphikRegular' }}
          >
            {children}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}
