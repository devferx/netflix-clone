'use client'

import { useEffect, useState } from 'react'

import { useUserMoviesStore } from '@/store'
import { MovieSliderItem } from '@/domains/home/components'

export const SavedMovies = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const getCurrentUserMovies = useUserMoviesStore(
    (state) => state.getCurrentUserMovies,
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const movies = getCurrentUserMovies() ?? []

  return (
    <section className="mt-24 px-16">
      <h3 className="text-2xl font-bold">My List</h3>
      <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] justify-between gap-7">
        {isLoaded &&
          movies.map((movie) => (
            <MovieSliderItem
              key={movie.id}
              movie={movie}
              scaleOnHover={false}
            />
          ))}
      </div>
    </section>
  )
}
