import { Dropdown as DropdownElement } from 'react-native-element-dropdown'
import { StyleSheet } from 'react-native'

import { DropdownItem } from './DropdownItem'
import { USER_ROLES } from '@/constants/texts'

interface DropdownProps {
  value: string
  setValue: (value: string) => void
  onBlur: () => void
}

export function Dropdown({ value, setValue, onBlur }: DropdownProps) {
  return (
    <DropdownElement
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={USER_ROLES}
      value={value}
      onBlur={onBlur}
      labelField='label'
      valueField='value'
      maxHeight={300}
      placeholder='Seleccione un rol'
      onChange={item => {
        setValue(item.value)
      }}
      renderItem={DropdownItem}
    />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    width: '80%',
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  icon: {
    marginRight: 5
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
})
