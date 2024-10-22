import { useState } from 'react'
import { Link } from 'expo-router'
import { View, Text, ActivityIndicator } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

import { Input } from '@/components/form/Input'
import { Button } from '@/components/ui/Button'
import { useLogin } from '@/hooks/auth/useLogin'
import { loginFormSchema, LoginFormSchema } from '@/schemas/userSchema'

export default function LoginPage() {
  const { isLoading, onSubmit } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormSchema), mode: 'onBlur' })

  if (isLoading) {
    return (
      <View className='flex-1 justify-center'>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View className='flex-1 mt-10 p-6 bg-white'>
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

      <Button onPress={handleSubmit(onSubmit)}>Iniciar sesión</Button>
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
