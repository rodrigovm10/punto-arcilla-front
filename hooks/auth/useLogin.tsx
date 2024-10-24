import { useState } from 'react'
import { router } from 'expo-router'

import { loginUser } from '@/services/user'
import { LoginUser as LoginUserForm } from '@/interfaces/user'
import { useSession } from './useSession'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useSession()

  const onSubmit = async (data: LoginUserForm) => {
    setIsLoading(true)

    try {
      const user = await loginUser(data)
      signIn([user.data.token, { name: user.data.name, email: user.data.email }])
      router.replace('/product')
    } catch (error: any) {
      alert(JSON.stringify(error))
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, onSubmit }
}
