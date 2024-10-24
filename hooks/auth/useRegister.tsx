import { useState } from 'react'
import { router } from 'expo-router'

import { createUser } from '@/services/user'
import { CreateUserForm } from '@/interfaces/user'
import { useSession } from './useSession'

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, session, user } = useSession()

  const onSubmit = async (data: CreateUserForm) => {
    const { confirmPassword, email, password } = data
    setIsLoading(true)

    // 1. password equals confirmPassword
    if (password !== confirmPassword) {
      return alert('La contraseña no coincide')
    }

    const sanitizedData = {
      email,
      password
    }

    console.log(sanitizedData)

    try {
      const user = await createUser(sanitizedData)

      if (user) {
        signIn([user.data.token, { email: user.data.email, name: '' }])
        alert(JSON.stringify({ user, session }))
        alert('Usuario creado')
        router.push('/check-role')
      }
    } catch (error) {
      alert('Intentalo más tarde')
      console.log(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { onSubmit, isLoading }
}
