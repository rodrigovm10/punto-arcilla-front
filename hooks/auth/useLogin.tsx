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
      console.log(data)
      console.log(user)
      alert(JSON.stringify(user))
      signIn(user.data.token)
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
