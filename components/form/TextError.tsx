import { Text } from 'react-native'

export function TextError({ children }: { children: React.ReactNode }) {
  return <Text className='text-red-500 self-start text-sm opacity-80 font-bold'>{children}</Text>
}
