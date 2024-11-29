import { Input } from '@/components/form/Input'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { TextWrapper } from '@/components/ui/TextWrapper'
import { useProfileUpdate } from '@/hooks/userInfo/useProfileUpdate'
import { Controller } from 'react-hook-form'
import { Text, View } from 'react-native'

export default function UpdateProfileScreen() {
  const {
    errors,
    isDirty,
    isValid,
    onSubmit,
    role,
    control,
    isLoading,
    handleSubmit,
    profile,
    isLoadingProfile
  } = useProfileUpdate()

  if (isLoadingProfile) {
    return <Loader />
  }

  return (
    <View className='bg-white flex-1 p-4'>
      <TextWrapper
        fontFamily='GraphikMedium'
        classProps='text-xl'
      >
        Actualiza la <Text className='text-primary'>información</Text> de tu perfil
      </TextWrapper>
      {!isLoadingProfile && role === 'SELLER' && (
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

      {!isLoadingProfile && role === 'BUYER' && (
        <>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                defaultValue={profile?.name}
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
        isLoading={isLoading}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty || !isValid}
      >
        Actualizar
      </Button>
    </View>
  )
}
