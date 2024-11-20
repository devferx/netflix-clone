import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Movie } from '@/interfaces'

interface State {
  userMoviesMap: Record<string, Movie>
  updateUserMovies: (movie: Movie) => void
  isMovieInUserList: (movieId: number) => boolean
}

export const useUserMoviesStore = create<State>()(
  persist(
    (set, get) => ({
      userMoviesMap: {},
      isMovieInUserList: (movieId: number) =>
        !!get().userMoviesMap[movieId.toString()],

      updateUserMovies: (movie: Movie) => {
        if (get().isMovieInUserList(movie.id)) {
          set((state) => {
            const userMoviesMap = { ...state.userMoviesMap }
            delete userMoviesMap[movie.id]
            return { userMoviesMap }
          })
          return
        }

        set((state) => ({
          userMoviesMap: {
            ...state.userMoviesMap,
            [movie.id.toString()]: movie,
          },
        }))
      },
    }),
    { name: 'user-movies' },
  ),
)
