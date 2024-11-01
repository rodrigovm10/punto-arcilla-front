import { useState } from 'react'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toastAlert } from '@/lib/toast'
import { useSession } from './useSession'
import { createUser } from '@/services/user'
import { CreateUserForm } from '@/interfaces/user'
import { signUpFormSchema, SignUpFormSchema } from '@/schemas/userSchema'

export function useRegister() {
  const { signIn } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<SignUpFormSchema>({ resolver: zodResolver(signUpFormSchema), mode: 'onBlur' })

  const onSubmit = async (data: CreateUserForm) => {
    const { confirmPassword, email, password } = data
    setIsLoading(true)

    try {
      // 1. password equals confirmPassword
      if (password !== confirmPassword) {
        toastAlert('La contraseña no coincide.')
        return
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
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoading(false)
    }
  }
  return { control, errors, handleSubmit, onSubmit, isLoading, isDirty, isValid }
}
