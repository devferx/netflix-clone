'use client'

import { useEffect, useRef, useState } from 'react'

import { useStore, useUserMoviePreferences } from '@/store'

import { getMoviesRecommendations } from '../actions/get-movies-recommendations'
import { MovieSlider } from './movie-slider'

import { getRandomItems } from '@/utils'

import type { Movie } from '@/models'

const MAX_SOURCE_MOVIES = 5

interface Rows {
  sourceMovies: Movie[]
  recommendationsByMovieId: Record<number, Movie[]>
}

const BecauseYouLikedSkeleton = () => (
  <section className="grid gap-4">
    <div className="mx-16 h-6 w-64 animate-pulse rounded bg-white/10" />
    <div className="mx-16 flex gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-25.25 w-full max-w-75 flex-1 animate-pulse rounded bg-white/10"
        />
      ))}
    </div>
  </section>
)

export const BecauseYouLiked = () => {
  const getCurrentLikedMovies = useStore(
    useUserMoviePreferences,
    (store) => store.getCurrentLikedMovies,
  )
  const likedMovies = getCurrentLikedMovies?.()

  const hasFetchedRef = useRef(false)
  const [rows, setRows] = useState<Rows | null>(null)

  useEffect(() => {
    if (hasFetchedRef.current) return
    if (!likedMovies || likedMovies.length === 0) return

    hasFetchedRef.current = true

    const sourceMovies = getRandomItems(likedMovies, MAX_SOURCE_MOVIES)

    getMoviesRecommendations(sourceMovies.map((movie) => movie.id)).then(
      (recommendationsByMovieId) =>
        setRows({ sourceMovies, recommendationsByMovieId }),
    )
  }, [likedMovies])

  if (!likedMovies || likedMovies.length === 0) return null

  if (!rows) {
    return <BecauseYouLikedSkeleton />
  }

  return (
    <>
      {rows.sourceMovies.map((movie) => {
        const recommendations = rows.recommendationsByMovieId[movie.id]
        if (!recommendations || recommendations.length === 0) return null

        return (
          <MovieSlider
            key={movie.id}
            title={`Because you liked ${movie.title}`}
            movies={recommendations}
          />
        )
      })}
    </>
  )
}
