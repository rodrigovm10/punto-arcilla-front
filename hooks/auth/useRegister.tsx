import { useState } from 'react'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSession } from './useSession'
import { createUser } from '@/services/user'
import { CreateUserForm } from '@/interfaces/user'
import { signUpFormSchema, SignUpFormSchema } from '@/schemas/userSchema'

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, session } = useSession()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormSchema>({ resolver: zodResolver(signUpFormSchema), mode: 'onChange' })

  const onSubmit = async (data: CreateUserForm) => {
    const { confirmPassword, email, password } = data
    setIsLoading(true)

    try {
      // 1. password equals confirmPassword
      if (password !== confirmPassword) {
        return alert('La contraseña no coincide')
      }

      const sanitizedData = {
        email,
        password
      }

      const user = await createUser(sanitizedData)

      if (user) {
        signIn([
          user.data.token,
          { id: user.data.user.id, email: user.data.user.email, role: user.data.user.role }
        ])
        router.push('/role')
      }
    } catch (error) {
      alert('Intentalo más tarde')

      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { control, errors, handleSubmit, onSubmit, isLoading }
}
