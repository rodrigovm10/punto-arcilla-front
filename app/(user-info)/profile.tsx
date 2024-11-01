import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/form/Input'
import { Button } from '@/components/ui/Button'
import { useProfile } from '@/hooks/userInfo/useProfile'

export default function ProfileScreen() {
  const { errors, isDirty, isValid, onSubmit, role, roleState, control, handleSubmit, isLoading } =
    useProfile()

  return (
    <View className='flex-1 p-6 bg-white'>
      <View className='mb-4'>
        <Text
          className='font-semibold text-2xl mb-[10px]'
          style={{ fontFamily: 'GraphikBold' }}
        >
          Ahora completa tu
          <Text className='text-primary inline'> perfil.</Text>
        </Text>
        <Text
          className='text-base font-bold opacity-60 mb-4'
          style={{ fontFamily: 'GraphikRegular' }}
        >
          {role === 'BUYER'
            ? 'Completa tu información para que los negocios conozcan a quien le venden su ceramica.'
            : 'Completa tu información para que los clienten conozcan más sobre tú negocio.'}
        </Text>
      </View>

      {roleState === 'SELLER' && (
        <>
          {/* <Text
            className='text-base font-bold opacity-60 mb-4'
            style={{ fontFamily: 'GraphikRegular' }}
          >
            Ahora ingrese el nombre de su negocio
          </Text> */}
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                errors={errors}
                placeholder='Nombre de negocio'
                typeError='name'
                label='Ingrese el nombre de su negocio.'
              />
            )}
          />

          <Controller
            control={control}
            name='businessDescription'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                errors={errors}
                placeholder='Descripción de negocio'
                typeError='businessDescription'
                label='Ingrese una Descripción
                 de su negocio.'
              />
            )}
          />
        </>
      )}

      {roleState === 'BUYER' && (
        <>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                errors={errors}
                placeholder='Nombre'
                typeError='name'
                label='Ingrese su nombre completo.'
              />
            )}
          />
        </>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        classProps='mb-10'
        disabled={!isDirty || !isValid}
        isLoading={isLoading}
      >
        Siguiente
      </Button>
    </View>
  )
}
