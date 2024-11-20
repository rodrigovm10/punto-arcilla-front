import { Pressable, StyleSheet, Text, View } from 'react-native'

import SelectDropdown from 'react-native-select-dropdown'
import Icon from '@expo/vector-icons/MaterialIcons'
import { ArrowDownUpIcon } from '../Icons'
import { TextWrapper } from './TextWrapper'

interface DropdownProps {
  tags: string[]
  handleAddTag: (tag: string) => void
  handleDeleteTag: (tag: string) => void
}

export function Dropdown({ tags, handleAddTag, handleDeleteTag }: DropdownProps) {
  const tagsArr = ['Platos', 'Vasos', 'Vasijas', 'Artesanias']

  return (
    <>
      <SelectDropdown
        data={tagsArr}
        onSelect={(selectedItem, index) => {
          handleAddTag(selectedItem)
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={{
                backgroundColor: '#936639',
                paddingVertical: 20,
                paddingHorizontal: 12,
                borderRadius: 12,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                gap: 10
              }}
            >
              <TextWrapper
                fontFamily='GraphikSemibold'
                classProps='font-medium text-white'
              >
                Selecciona hasta 3 categroías a las que pertenece tu producto
              </TextWrapper>
              <ArrowDownUpIcon
                color={'white'}
                name={!isOpened ? 'arrow-down' : 'arrow-up'}
              />
            </View>
          )
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                width: 'auto',
                flexDirection: 'row',
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: isSelected ? '#B6AD90' : '#eee'
              }}
            >
              <TextWrapper
                fontFamily='GraphikRegular'
                classProps='flex-1 color-black font-semibold'
              >
                {item}
              </TextWrapper>
            </View>
          )
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{ backgroundColor: '#E9ECEF', borderRadius: 8 }}
      />
      <View className='flex-row justify-center mt-5 space-x-5 w-full'>
        {tags.map(tag => (
          <View className='items-center justify-center bg-orange p-2 border-primary border-2 rounded-3xl'>
            <TextWrapper
              fontFamily='GraphikRegular'
              classProps='text-white '
            >
              {tag}{' '}
              <Pressable
                className='items-center bg-black/50 w-4 h-4 self-center rounded-full justify-center'
                onPress={() => handleDeleteTag(tag)}
              >
                <Text className='font-semibold self-center text-white text-xs'>x</Text>
              </Pressable>
            </TextWrapper>
          </View>
        ))}
      </View>
    </>
  )
}
