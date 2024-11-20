import { TextInput, View } from 'react-native'
import { SearchIcon } from '../Icons'

interface InputSearchProps {
  classProps?: string
}

export function InputSearch({ classProps }: InputSearchProps) {
  return (
    <View className='relative'>
      <SearchIcon
        className='absolute left-5 top-3 -translate-y-1/2 text-gray-400'
        size={19}
      />
      <TextInput
        className={`pl-6 w-[90%] self-center py-3 border-[#ccc] border-[1px] border-t-0 border-x-0 focus:caret-primary text-black ${classProps}`}
        placeholder='Buscar'
        selectionColor={'#582f0e'}
        style={{ fontFamily: 'GraphikMedium' }}
      />
    </View>
  )
}
