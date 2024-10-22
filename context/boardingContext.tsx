import { useStorage } from '@/hooks/useStorage'
import { createContext } from 'react'

interface BoardingContextType {
  checkBoarding: () => void
  unCheckBoarding: () => void
  isLoading: boolean
  boarding?: string | null
}

export const BoardingContext = createContext<BoardingContextType | undefined>({
  unCheckBoarding: () => null,
  checkBoarding: () => null,
  isLoading: false,
  boarding: null
})

export const BoardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [[isLoading, boarding], setBoarding] = useStorage('boarding-completed')
  return (
    <BoardingContext.Provider
      value={{
        checkBoarding: () => {
          setBoarding('true')
        },
        unCheckBoarding: () => {
          setBoarding(null)
        },
        isLoading,
        boarding
      }}
    >
      {children}
    </BoardingContext.Provider>
  )
}
