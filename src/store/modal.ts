import { type Movie } from '@prisma/client'
import { create } from 'zustand'

export interface ModalStore {
  movie: Movie | undefined
  isOpen: boolean
  openModal: (movie: Movie) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  movie: undefined,
  isOpen: false,
  openModal: (movie) => set({ isOpen: true, movie }),
  closeModal: () => {
    set({ isOpen: false })

    setTimeout(() => {
      set({ movie: undefined })
    }, 300)
  }
}))
