import { useContext } from 'react'
import { BoardingContext } from '@/context/boardingContext'

export function useOnboarding() {
  const value = useContext(BoardingContext)
  if (!value) {
    throw new Error('useOnboarding must be wrapped in a <BoardingContext />')
  }

  return value
}
