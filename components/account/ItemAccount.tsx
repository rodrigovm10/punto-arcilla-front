import { Text, TouchableOpacity, View } from 'react-native'
import { ArrowRightIcon } from '../Icons'
import { Href, Link } from 'expo-router'

interface ItemAccountProps {
  name: string
  icon: React.ReactNode
  href?: Href
  classProps?: string
}

export function ItemAccount({ name, icon, href, classProps }: ItemAccountProps) {
  return (
    <Link
      className='mb-4 bg-white p-2 rounded-lg flex justify-between flex-row'
      href={href ?? ''}
    >
      <View className='flex justify-between flex-row'>
        <View className='flex flex-row gap-x-4'>
          {icon}
          <Text
            className={`text-base self-center font-semibold -mt-[5px] ${classProps}`}
            style={{ fontFamily: 'GraphikRegular' }}
          >
            {name}
          </Text>
        </View>
        <ArrowRightIcon
          size={14}
          className='self-center'
        />
      </View>
    </Link>
  )
}
