import { View, Text, StyleSheet } from 'react-native'

import { UserRole } from '@/interfaces/user'

export function DropdownItem(item: UserRole) {
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16
  }
})
