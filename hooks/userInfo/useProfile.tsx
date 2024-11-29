import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { router, useLocalSearchParams } from 'expo-router'

import { toastAlert } from '@/lib/toast'
import { UserLogged } from '@/interfaces/user'
import { createProfile } from '@/services/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from '@/hooks/auth/useSession'
import { profileFormSchema, ProfileFormSchema } from '@/schemas/profileSchemas'

export function useProfile() {
  const { user, session } = useSession()
  const { role } = useLocalSearchParams<{ role: string }>()
  const [roleState] = useState(role ?? '')

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,

    formState: { errors, isDirty, isValid }
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),

    mode: 'onChange'
  })

  const onSubmit = async (data: ProfileFormSchema) => {
    if (!user || !session) return
    setIsLoading(true)

    const userObject: UserLogged = JSON.parse(user)

    const dataSanitized = { ...data, userId: userObject.id }
    try {
      await createProfile(dataSanitized, session)
      router.push('/address')
      return
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

  return { roleState, role, errors, isDirty, isValid, onSubmit, control, handleSubmit, isLoading }
}
