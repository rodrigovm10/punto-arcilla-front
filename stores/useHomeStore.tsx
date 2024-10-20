import { create } from 'zustand'

type State = {
  showHomePage: boolean
}

type Action = {
  updateShowHomePage: (showHomePage: State['showHomePage']) => void
}

export const useHomeStore = create<State & Action>(set => ({
  showHomePage: false,
  updateShowHomePage: showHomePage => set({ showHomePage }) // Simplificado
}))
