import { Text } from 'react-native'

interface TextWrapperProps {
  children: React.ReactNode
  fontFamily: string
  classProps: string
}

export function TextWrapper({ children, fontFamily, classProps }: TextWrapperProps) {
  return (
    <Text
      style={{ fontFamily }}
      className={classProps}
    >
      {children}
    </Text>
  )
}
