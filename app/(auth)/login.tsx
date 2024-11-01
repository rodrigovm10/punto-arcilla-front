import { Link } from 'expo-router'
import { View, Text } from 'react-native'
import { Controller } from 'react-hook-form'

import { Input } from '@/components/form/Input'
import { Button } from '@/components/ui/Button'
import { useLogin } from '@/hooks/auth/useLogin'

export default function LoginPage() {
  const { control, errors, isLoading, isDirty, isValid, handleSubmit, onSubmit } = useLogin()

  return (
    <View className={`flex-1 p-6  text-white `}>
      <View className='mb-4'>
        <Text
          className='font-semibold text-3xl mb-[10px]'
          style={{ fontFamily: 'GraphikBold' }}
        >
          <Text className='text-primary'>Inicia sesión</Text> en punto de arcilla
        </Text>
        <Text
          className='text-sm font-bold opacity-60 mb-4'
          style={{ fontFamily: 'GraphikRegular' }}
        >
          Inicia sesión y empieza a comprar o vender productos.
        </Text>
      </View>

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Correo electrónico'
            typeError='email'
            label='Escribe tu correo electrónico'
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Contraseña'
            typeError='password'
            label='Contraseña'
            isPassword
          />
        )}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
        disabled={!isDirty || !isValid}
      >
        Iniciar sesión
      </Button>
      <Link
        href='/signup'
        className='mt-5 self-center'
      >
        <Text
          className='text-secondary
           underline font-bold'
        >
          ¿No tienes cuenta? Registrate
        </Text>
      </Link>
    </View>
  )
}
