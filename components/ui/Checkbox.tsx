import { UserRole } from '@/interfaces/user'
import { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CheckIcon } from '../Icons'

interface CheckboxProps {
  options: UserRole[]
  checkedValues: string[]
  onChange: Dispatch<SetStateAction<string[]>>
}

export function Checkbox({ options, checkedValues, onChange }: CheckboxProps) {
  let updatedCheckedValues = [...checkedValues]
  return (
    <View className=''>
      {options.map(option => {
        let active = updatedCheckedValues.includes(option.value)
        return (
          <TouchableOpacity
            className={'border border-gray-400 p-4 mb-4 rounded-3xl'}
            key={option.label}
            onPress={() => {
              if (active) {
                updatedCheckedValues = updatedCheckedValues.filter(
                  checkedValue => checkedValue !== option.value
                )
                return onChange(updatedCheckedValues)
              }
              updatedCheckedValues.push(option.value)
              onChange(updatedCheckedValues)
            }}
          >
            <View className='flex flex-row gap-x-4 items-center'>
              <CheckIcon
                className={`${!active && 'opacity-20'}`}
                active={active}
                color={active ? '#582F0E' : 'black'}
              />
              <Text
                className={`${active ? 'font-' : 'opacity-20'} `}
                style={{ fontFamily: `${active ? 'GraphikMedium' : 'GraphikRegular'}` }}
              >
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
