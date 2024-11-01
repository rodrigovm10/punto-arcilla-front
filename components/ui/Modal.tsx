import { useEffect, useState } from 'react'
import { Modal, Text, View } from 'react-native'
import { Button } from './Button'

interface ModalProps {
  initValue: boolean
  message: string
  variant?: 'success' | 'error'
}

export function ModalC({ initValue, message, variant = 'success' }: ModalProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(initValue)

  useEffect(() => {
    setModalVisible(initValue)
  }, [initValue])

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View className='flex-1 justify-center items-center '>
        <View className='bg-white px-4 py-8 rounded-lg shadow-2xl shadow-black flex gap-y-6'>
          <Text
            className='text-2xl text-center tracking-widest'
            style={{ fontFamily: 'GraphikBold' }}
          >
            Oops!
          </Text>
          <Text
            className='opacity-80 font-semibold text-sm text-center px-7'
            style={{ fontFamily: 'GraphikMedium' }}
          >
            {message}
          </Text>
          <Button
            variant='error'
            classProps='self-center w-full px-16 py-4 mt-6'
            onPress={() => setModalVisible(false)}
          >
            Intentalo de nuevo.
          </Button>
        </View>
      </View>
    </Modal>
  )
}
