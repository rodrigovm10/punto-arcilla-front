import AsyncStorage from '@react-native-async-storage/async-storage'

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (!token) alert('NO HAY TOKEN')

    return token
  } catch (error) {}
}
