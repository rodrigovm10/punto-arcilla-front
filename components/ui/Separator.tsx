import { View } from 'react-native'

export function Separator({ classProps }: { classProps?: string }) {
  return <View className={`bg-gray-300 w-11/12 h-[1px] mt-3 mb-3 ${classProps}`}></View>
}
