import { create } from 'zustand'

import type { Movie } from '@/interfaces'

interface State {
  currentMovie: Movie | null
  openMovieModal: (movie: Movie) => void
  closeMovieModal: () => void
}

export const useMovieModalStore = create<State>()((set) => ({
  currentMovie: null,
  openMovieModal: (movie: Movie) => set({ currentMovie: movie }),
  closeMovieModal: () => set({ currentMovie: null }),
}))
