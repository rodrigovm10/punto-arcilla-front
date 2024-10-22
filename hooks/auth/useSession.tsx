import { useContext } from 'react'
import { AuthContext } from '@/context/authContext'

export function useSession() {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}
