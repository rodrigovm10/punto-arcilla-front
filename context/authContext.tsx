import { useStorage } from '@/hooks/useStorage'
import { createContext } from 'react'

interface AuthContextType {
  signIn: (value: string) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
})

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [[isLoading, session], setSession] = useStorage('session')
  return (
    <AuthContext.Provider
      value={{
        signIn: (value: string) => {
          // Add your login logic here
          // For example purposes, we'll just set a fake session in storage
          //This likely would be a JWT token or other session data
          setSession(value)
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
