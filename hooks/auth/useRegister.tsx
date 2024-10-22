import { useState } from 'react'
import { router } from 'expo-router'

import { createUser } from '@/services/user'
import { CreateUserForm } from '@/interfaces/user'

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: CreateUserForm) => {
    const { name, confirmPassword, email, password } = data
    console.log(data)
    setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }
  return { onSubmit, isLoading }
}
