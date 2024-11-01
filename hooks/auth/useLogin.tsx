import { useState } from 'react'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSession } from './useSession'
import { loginUser } from '@/services/user'
import { LoginUser as LoginUserForm } from '@/interfaces/user'
import { loginFormSchema, LoginFormSchema } from '@/schemas/userSchema'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormSchema), mode: 'onBlur' })

  const onSubmit = async (data: LoginUserForm) => {
    setIsLoading(true)

    try {
      const user = await loginUser(data)
      signIn([
        user.data.token,
        { id: user.data.user.id, email: user.data.user.email, role: user.data.user.role }
      ])
      router.replace('/product')
    } catch (error: any) {
      alert(JSON.stringify(error))
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { control, errors, isLoading, isDirty, isValid, handleSubmit, onSubmit }
}
