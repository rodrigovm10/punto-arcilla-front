import { ToastAndroid } from 'react-native'

export const toastAlert = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
}
