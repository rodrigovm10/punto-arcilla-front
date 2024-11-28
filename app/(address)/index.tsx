import { Input } from '@/components/form/Input'
import { Button } from '@/components/ui/Button'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { useAddress as useAddressGetAddress } from '@/hooks/address/useAddress'
import { useAddress } from '@/hooks/userInfo/useAddress'
import { Controller } from 'react-hook-form'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'

export default function AddressScreen() {
  const { address, isLoading } = useAddressGetAddress()
  const { control, errors, handleSubmit, isDirty, isValid, onSubmit } = useAddress()

  return (
    <ScrollView className='bg-white flex-1 px-2'>
      <TextWrapper
        fontFamily='GraphikSemibold'
        classProps='text-xl'
      >
        Visualiza o actualiza la
        <TextWrapper
          fontFamily='GraphikSemibold'
          classProps='text-primary'
        >
          {' '}
          dirección{' '}
        </TextWrapper>{' '}
        a donde se
        <TextWrapper
          fontFamily='GraphikMedium'
          classProps='text-primary'
        >
          {' '}
          enviarán{' '}
        </TextWrapper>
        tus compras.
      </TextWrapper>
      {isLoading && (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator
            color='#582F0E'
            size={'large'}
          />
        </View>
      )}
      {!isLoading && (
        <View className='mt-4 space-y-4'>
          <Controller
            control={control}
            name='state'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                defaultValue={address?.state}
                value={value}
                errors={errors}
                placeholder='Estado'
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
                defaultValue={address?.city}
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
                defaultValue={address?.street}
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
                defaultValue={address?.neighborhood}
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
                defaultValue={address?.houseNumber.toString()}
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
                defaultValue={address?.postalCode.toString()}
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
            Actualizar
          </Button>
        </View>
      )}
    </ScrollView>
  )
}
