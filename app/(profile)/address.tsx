import { Input } from '@/components/form/Input'
import { Button } from '@/components/ui/Button'
import { addressFormSchema, AddressFormSchema } from '@/schemas/addressSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, Text, View } from 'react-native'

export default function AddressScreen() {
  const {
    control,
    handleSubmit,

    formState: { errors, isDirty, isValid }
  } = useForm<AddressFormSchema>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onBlur'
  })

  useEffect(() => {
    console.log({ isDirty })
    console.log({ isValid })
  }, [])

  const onSubmit = async () => {}

  return (
    <ScrollView className='flex-1 mt-10 p-6 bg-white'>
      <View className='mb-4'>
        <Text
          className='font-semibold text-2xl mb-[10px]'
          style={{ fontFamily: 'GraphikBold' }}
        >
          A continuación llena la información de tu
          <Text className='text-primary inline'> dirección.</Text>
        </Text>
        <Text
          className='text-base font-bold opacity-60 mb-4'
          style={{ fontFamily: 'GraphikRegular' }}
        >
          Llena tu dirección
        </Text>
      </View>
      <Controller
        control={control}
        name='state'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Correo electrónico'
            typeError='state'
            label='Estado'
          />
        )}
      />
      <Controller
        control={control}
        name='city'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Municipio'
            typeError='city'
            label='Municipio'
          />
        )}
      />
      <Controller
        control={control}
        name='street'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Calle'
            typeError='street'
            label='Calle'
          />
        )}
      />
      <Controller
        control={control}
        name='neighborhood'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Colonia'
            typeError='neighborhood'
            label='Colonia'
          />
        )}
      />
      <Controller
        control={control}
        name='houseNumber'
        // rules={{ pattern: /^[0-9]+$/ }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Número de casa'
            typeError='houseNumber'
            label='Número de casa'
            keyBoardType='numeric'
          />
        )}
      />
      <Controller
        control={control}
        name='postalCode'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Código postal'
            typeError='postalCode'
            label='Código postal'
            keyBoardType='numeric'
          />
        )}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        classProps='mb-10'
        disabled={!isDirty || !isValid}
      >
        Siguiente
      </Button>
    </ScrollView>
  )
}
