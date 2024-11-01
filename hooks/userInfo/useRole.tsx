import { router } from 'expo-router'
import { useEffect, useState } from 'react'

import { updateRole } from '@/services/user'
import { Role, UserLogged } from '@/interfaces/user'
import { useSession } from '@/hooks/auth/useSession'

export function useRole() {
  const { session, user, signIn } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const [roles, setRoles] = useState<string[]>([])
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (role: Role) => {
    const userObject: UserLogged = JSON.parse(user!)
    if (!session) return

    setIsLoading(true)

    try {
      const res = await updateRole(role, userObject.id, session)
      signIn([
        session,
        { id: res.data.user.id, email: res.data.user.email, role: res.data.user.role }
      ])
      router.push(`/profile?role=${roles[0]}`)
    } catch (error) {
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (roles.length === 0) {
      setDisabled(true)
    } else setDisabled(false)

    if (roles.length === 2) {
      setDisabled(true)
      setErrorMessage('Solo puedes seleccionar una opción')
      return
    }

    setErrorMessage('')
  }, [roles])

  return { roles, isLoading, disabled, errorMessage, setRoles, onSubmit }
}
