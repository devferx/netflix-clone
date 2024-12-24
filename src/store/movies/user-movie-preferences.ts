import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { getCurrentProfileId } from '../profile/profile-store'
import type { Movie } from '@/models'

interface UserMoviesMap {
  [profileId: string]: Record<string, Movie>
}

interface State {
  likedMoviesByProfileId: UserMoviesMap
  dislikedMoviesByProfileId: UserMoviesMap
  updateLikedMovies: (movie: Movie) => void
  updateDislikedMovies: (movie: Movie) => void
  isMovieLiked: (movieId: number) => boolean
  isMovieDisliked: (movieId: number) => boolean
}

export const useUserMoviePreferences = create<State>()(
  persist(
    (set, get) => ({
      likedMoviesByProfileId: {},
      dislikedMoviesByProfileId: {},
      updateLikedMovies: function (movie: Movie): void {
        const profileId = getCurrentProfileId()
        if (!profileId) return

        const userLikedMovies = { ...get().likedMoviesByProfileId }

        if (get().isMovieLiked(movie.id)) {
          delete userLikedMovies[profileId][movie.id]
        } else {
          userLikedMovies[profileId] = {
            ...userLikedMovies[profileId],
            [movie.id]: movie,
          }
        }

        set({ likedMoviesByProfileId: userLikedMovies })
      },
      updateDislikedMovies: function (movie: Movie): void {
        const profileId = getCurrentProfileId()
        if (!profileId) return

        const userDislikedMovies = { ...get().dislikedMoviesByProfileId }

        if (get().isMovieDisliked(movie.id)) {
          delete userDislikedMovies[profileId][movie.id]
        } else {
          userDislikedMovies[profileId] = {
            ...userDislikedMovies[profileId],
            [movie.id]: movie,
          }
        }

        set({ dislikedMoviesByProfileId: userDislikedMovies })
      },
      isMovieLiked: function (movieId: number): boolean {
        const profileId = getCurrentProfileId()
        if (!profileId) return false

        return !!get().likedMoviesByProfileId[profileId]?.[movieId.toString()]
      },
      isMovieDisliked: function (movieId: number): boolean {
        const profileId = getCurrentProfileId()
        if (!profileId) return false

        return !!get().dislikedMoviesByProfileId[profileId]?.[
          movieId.toString()
        ]
      },
    }),
    { name: 'user-categories' },
  ),
)
