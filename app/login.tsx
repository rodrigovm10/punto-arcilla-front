import { useState } from 'react'
import { Link, router } from 'expo-router'
import { View, Text, ActivityIndicator } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

import { loginUser } from '@/services/user'
import { Input } from '@/components/form/Input'
import { LoginUser as LoginUserForm } from '@/interfaces/user'
import { loginFormSchema, LoginFormSchema } from '@/schemas/userSchema'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormSchema), mode: 'onBlur' })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: LoginUserForm) => {
    const { email, password } = data
    setIsLoading(true)

    try {
      const user = await loginUser(data)
      router.push('/product')
    } catch (error: any) {
      console.log(error)
      if (error.response) {
        console.log('Error de respuesta:', error.response.data)
        console.log('Estado:', error.response.status)
        console.log('Encabezados:', error.response.headers)
      } else if (error.request) {
        console.log('Error en la solicitud:', error.request)
      } else {
        console.log('Error:', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

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

      <Button onPress={handleSubmit(onSubmit)}>Registrate</Button>
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
