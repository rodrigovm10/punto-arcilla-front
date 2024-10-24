import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { TextError } from '@/components/form/TextError'

export default function CheckRoleScreen() {
  const [roles, setRoles] = useState<string[]>([])
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (roles.length === 0) {
      setDisabled(true)
    } else setDisabled(false)

    if (roles.length === 2) {
      setDisabled(true)
      setErrorMessage('Solo puedes seleccionar una opción')
      return
    }
    setErrorMessage('')
  }, [roles])
  return (
    <View className='flex-1 mt-10 p-6 bg-white'>
      {/* <Text className='text-3'>Punto de Arcilla</Text> */}
      <View className='mb-4'>
        <Text
          className='font-semibold text-2xl mb-[10px]'
          style={{ fontFamily: 'GraphikBold' }}
        >
          Vamos a crear tu
          <Text className='text-primary inline'> perfil.</Text>
        </Text>
        <Text
          className='text-base font-bold opacity-60 mb-4'
          style={{ fontFamily: 'GraphikRegular' }}
        >
          ¿Qué vas a realizar en punto de arcilla?
        </Text>
      </View>
      <View>
        <Checkbox
          options={[
            { label: 'Vendedor', value: 'SELLER' },
            { label: 'Comprador', value: 'BUYER' }
          ]}
          checkedValues={roles}
          onChange={setRoles}
        />
      </View>
      <TextError>{errorMessage}</TextError>

      <Button
        disabled={disabled}
        onPress={() => {
          router.push('/address')
        }}
      >
        Siguiente
      </Button>
    </View>
  )
}
