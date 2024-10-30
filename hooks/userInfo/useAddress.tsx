import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { addressFormSchema, AddressFormSchema } from '@/schemas/profileSchemas'

export function useAddress() {
  const {
    control,
    handleSubmit,

    formState: { errors, isDirty, isValid }
  } = useForm<AddressFormSchema>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onBlur'
  })

  return { errors, isDirty, control, isValid, handleSubmit }
}
