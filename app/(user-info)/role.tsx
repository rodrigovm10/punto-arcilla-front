import { router } from 'expo-router'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui/Button'
import { useRole } from '@/hooks/userInfo/useRole'
import { Checkbox } from '@/components/ui/Checkbox'
import { TextError } from '@/components/form/TextError'
import { Role } from '@/interfaces/user'

export default function RoleScreen() {
  const { roles, disabled, errorMessage, setRoles, onSubmit, isLoading } = useRole()

  const handleSubmit = async () => {
    await onSubmit(Role[roles[0] as keyof typeof Role])
  }

  return (
    <View className='flex-1 p-6 bg-white'>
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
            { label: 'Vender prductos.', value: 'SELLER' },
            { label: 'Comprar productos.', value: 'BUYER' }
          ]}
          checkedValues={roles}
          onChange={setRoles}
        />
      </View>
      <TextError>{errorMessage}</TextError>

      <Button
        disabled={disabled}
        onPress={handleSubmit}
        isLoading={isLoading}
      >
        Siguiente
      </Button>
    </View>
  )
}
