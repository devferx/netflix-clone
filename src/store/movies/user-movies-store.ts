import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useProfileStore } from '../'

import type { Movie } from '@/models'

interface userMoviesMap {
  [profileId: string]: Record<string, Movie>
}

interface State {
  userMoviesMap: userMoviesMap
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

        set((state) => {
          const userMoviesMap = { ...state.userMoviesMap }
          if (get().isMovieInUserList(movie.id)) {
            delete userMoviesMap[profileId][movie.id]
          } else {
            userMoviesMap[profileId] = {
              ...userMoviesMap[profileId],
              [movie.id]: movie,
            }
          }
          return { userMoviesMap }
        })
      },
    }),
    { name: 'user-movies' },
  ),
)
