import { createContext } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { UserLogged } from '@/interfaces/user'

interface AuthContextType {
  signIn: (value: [token: string, user: UserLogged]) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
  isLoadingUser: boolean
  user?: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  isLoadingUser: false,
  user: null
})

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [[isLoading, session], setSession] = useStorage('session')
  const [[isLoadingUser, user], setUser] = useStorage('user')

  return (
    <AuthContext.Provider
      value={{
        signIn: (value: [token: string, user: UserLogged]) => {
          setSession(JSON.stringify(value[0]))
          setUser(JSON.stringify(value[1]))
          console.log({ value })
        },
        signOut: () => {
          setSession(null)
          setUser(null)
        },
        session,
        user,
        isLoading,
        isLoadingUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
