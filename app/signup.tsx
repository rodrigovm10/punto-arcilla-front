import { useFonts } from 'expo-font'
import { Link, router } from 'expo-router'
import { Text, ScrollView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createUser } from '@/services/user'
import { CreateUserForm } from '@/interfaces/user'
import { Input } from '@/components/form/Input'
import { signUpFormSchema, SignUpFormSchema } from '@/schemas/userSchema'
import { Button } from '@/components/ui/Button'

export default function SignUpPage() {
  const [loaded] = useFonts({
    GraphikBold: require('../assets/fonts/GraphikBold.otf'),
    GraphikRegular: require('../assets/fonts/GraphikRegular.otf'),
    GraphikSemibold: require('../assets/fonts/GraphikSemibold.otf'),
    GraphikMedium: require('../assets/fonts/GraphikMedium.otf')
  })

  if (!loaded) return null

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormSchema>({ resolver: zodResolver(signUpFormSchema), mode: 'onBlur' })

  const onSubmit = async (data: CreateUserForm) => {
    const { name, confirmPassword, email, password } = data
    console.log(data)
    // 1. password equals confirmPassword
    if (password !== confirmPassword) {
      return alert('La contraseña no coincide')
    }

    const sanitizedData = {
      name,
      email,
      password
    }

    try {
      const user = await createUser(sanitizedData)

      if (user) {
        router.push('/product')
        alert('Usuario creado')
      }
    } catch (error) {
      alert('Intentalo más tarde')
      throw error
    }
  }

  return (
    <ScrollView className='flex-1 p-6 mt-10 bg-white'>
      <Text
        className='font-semibold text-3xl mb-[10px]'
        style={{ fontFamily: 'GraphikBold' }}
      >
        <Text className='text-primary'>Registrate</Text> en punto de arcilla
      </Text>
      <Text
        className='text-sm font-bold opacity-60 mb-4'
        style={{ fontFamily: 'GraphikRegular' }}
      >
        Crea una cuenta para acceder a punto de arcilla y empezar a vender o comprar productos.
      </Text>
      {/* <Controller
        control={control}
        name='name'
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Nombre'
            typeError='name'
            label='Escribe tu nombre'
          />
        )}
      /> */}
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
            label='Escribe tu correo electrónico
            '
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
      <Controller
        control={control}
        name='confirmPassword'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            errors={errors}
            placeholder='Confirmar Contraseña'
            typeError='confirmPassword'
            label='Confirmar Contraseña'
            isPassword
          />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Button>

      <Link
        href='/login'
        className='mt-5 self-center'
      >
        <Text
          className='text-secondary
           underline mt-5 font-bold'
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Text>
      </Link>
    </ScrollView>
  )
}
