import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { addressFormSchema, AddressFormSchema } from '@/schemas/profileSchemas'
import { useSession } from '@/hooks/auth/useSession'
import { createAddress } from '@/services/address'
import { UserLogged } from '@/interfaces/user'
import { router } from 'expo-router'
import { toastAlert } from '@/lib/toast'

export function useAddress() {
  const { user, session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,

    formState: { errors, isDirty, isValid }
  } = useForm<AddressFormSchema>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: AddressFormSchema) => {
    if (!user || !session) return
    setIsLoading(true)

    const { houseNumber, postalCode } = data

    const userObject: UserLogged = JSON.parse(user)

    const dataSanitized = {
      ...data,
      userId: userObject.id,
      houseNumber: Number(houseNumber),
      postalCode: Number(postalCode)
    }
    try {
      await createAddress(dataSanitized, session)

      router.replace('/(app)/(home)')
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

  return { errors, isDirty, control, isValid, handleSubmit, onSubmit, isLoading }
}
