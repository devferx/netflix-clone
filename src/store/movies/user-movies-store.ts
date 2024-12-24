import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { getCurrentProfileId } from '../profile/profile-store'

import type { Movie } from '@/models'

interface UserMoviesMap {
  [profileId: string]: Record<string, Movie>
}

interface State {
  userMoviesMap: UserMoviesMap
  getCurrentUserMovies: () => Movie[]
  updateUserMovies: (movie: Movie) => void
  isMovieInUserList: (movieId: number) => boolean
}

export const useUserMoviesStore = create<State>()(
  persist(
    (set, get) => ({
      userMoviesMap: {},
      getCurrentUserMovies: () => {
        const profileId = getCurrentProfileId()
        if (!profileId) return []
        return Object.values(get().userMoviesMap[profileId] || {})
      },
      isMovieInUserList: (movieId: number) => {
        const profileId = getCurrentProfileId()
        if (!profileId) return false

        return !!get().userMoviesMap[profileId]?.[movieId.toString()]
      },
      updateUserMovies: (movie: Movie) => {
        const profileId = getCurrentProfileId()
        if (!profileId) return

        const userMoviesMap = { ...get().userMoviesMap }

        if (get().isMovieInUserList(movie.id)) {
          delete userMoviesMap[profileId][movie.id]
        } else {
          userMoviesMap[profileId] = {
            ...userMoviesMap[profileId],
            [movie.id]: movie,
          }
        }

        set({ userMoviesMap })
      },
    }),
    { name: 'user-movies' },
  ),
)
