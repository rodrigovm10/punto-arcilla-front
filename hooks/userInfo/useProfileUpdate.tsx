import { useEffect, useState } from 'react'
import { useSession } from '../auth/useSession'
import {
  ProfileFormSchema,
  updateProfileFormSchema,
  UpdateProfileFormSchema
} from '@/schemas/profileSchemas'
import { UserLogged } from '@/interfaces/user'
import { updateProfile } from '@/services/profile'
import { toastAlert } from '@/lib/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getProfile, getUser } from '@/services/user'
import { UpdateProfile } from '@/interfaces/profile'

export function useProfileUpdate() {
  const { user, session } = useSession()
  const [profile, setProfile] = useState<UpdateProfile>()
  const [role, setRole] = useState<string>('')
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,

    formState: { errors, isDirty, isValid }
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(updateProfileFormSchema),

    mode: 'onBlur'
  })

  const fetchData = async () => {
    if (!user || !session) return

    const userObject: UserLogged = JSON.parse(user)

    setIsLoadingProfile(true)
    try {
      const profile = await getProfile(userObject.id, session)
      setProfile(profile.data)
      const userRole = await getUser(userObject.id, session)
      setRole(userRole.data.role)
    } catch (error: any) {
      if (error.response.status === 400) {
        toastAlert(error.response.data.error)
      } else {
        toastAlert('Intentalo más tarde.')
      }
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const onSubmit = async (data: UpdateProfileFormSchema) => {
    if (!user || !session) return
    setIsLoading(true)

    const userObject: UserLogged = JSON.parse(user)
    console.log(data)
    try {
      await updateProfile({ id: userObject.id, data, token: session })
      toastAlert('Información actualizada.')
      await fetchData()
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

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [])

  return {
    onSubmit,
    isLoading,
    role,
    isDirty,
    isValid,
    control,
    handleSubmit,
    errors,
    profile,
    isLoadingProfile
  }
}
