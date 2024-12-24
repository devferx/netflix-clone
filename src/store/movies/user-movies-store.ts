import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useProfileStore } from '../'

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

const getCurrentProfileId = () => {
  const currentProfile = useProfileStore.getState().getCurrentProfile()
  return currentProfile ? currentProfile.id : null
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

        const isMovieInUserList = get().isMovieInUserList(movie.id)
        if (isMovieInUserList) {
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
