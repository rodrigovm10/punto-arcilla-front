import * as SecureStore from 'expo-secure-store'
import { createContext, useEffect, useState } from 'react'

interface AuthContextType {
  userToken: string | null
  saveToken: (token: string) => Promise<void>
  setUserToken: (token: string | null) => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const saveToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync('userToken', token)
      setUserToken(token)
    } catch (error) {
      console.error('Error al guardar el token:', error)
    }
  }

  const loadToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken')
      if (token) setUserToken(token)
    } catch (error) {
      console.error('Error al cargar el token:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadToken()
  }, [])

  return (
    <AuthContext.Provider value={{ userToken, saveToken, setUserToken, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
