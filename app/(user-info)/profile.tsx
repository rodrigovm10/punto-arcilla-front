import { Text, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { router, useLocalSearchParams } from 'expo-router'
import { profileFormSchema, ProfileFormSchema } from '@/schemas/profileSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/form/Input'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export default function ProfileScreen() {
  const { role } = useLocalSearchParams<{ role: string }>()
  const [roleState] = useState(role ?? '')

  const {
    control,
    handleSubmit,

    formState: { errors, isDirty, isValid }
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange'
  })

  const onSubmit = async () => {}

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
          <Text
            className='text-base font-bold opacity-60 mb-4'
            style={{ fontFamily: 'GraphikRegular' }}
          >
            Ahora ingrese el nombre de su negocio
          </Text>
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
        onPress={() => {
          handleSubmit(onSubmit)
          router.push('/address')
        }}
        classProps='mb-10'
        disabled={!isDirty || !isValid}
      >
        Siguiente
      </Button>
    </View>
  )
}
