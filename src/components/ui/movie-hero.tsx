'use client'

import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'

import { useStore, useUserMoviePreferences } from '@/store'

import { Dislike, Info, Like, Play } from '@/components/icons'
import { MovieActionButton } from './movie-action-button'

import { getImageUrl } from '@/utils'

import type { Movie } from '@/models'

interface Props {
  movie: Movie
  movieLogo?: string | null
  paddingBottom?: boolean
  fadeIn?: boolean
}

export const MovieHero = ({
  movie,
  movieLogo,
  paddingBottom = true,
  fadeIn = false,
}: Props) => {
  const { id: movieId, title, overview, backdrop_path } = movie

  const isMovieLiked = useStore(useUserMoviePreferences, (store) =>
    store.isMovieLiked(movie.id),
  )
  const updateLikedMovies = useUserMoviePreferences(
    (store) => store.updateLikedMovies,
  )
  const updateDislikedMovies = useUserMoviePreferences(
    (store) => store.updateDislikedMovies,
  )

  const onClickLike = () => {
    updateLikedMovies(movie)
  }

  const onClickDislike = () => {
    if (isMovieLiked) {
      updateLikedMovies(movie)
    }
    updateDislikedMovies(movie)
  }

  return (
    <header
      className={clsx(
        'relative h-[calc(100vh-200px)]',
        fadeIn && 'animate-hero-fade-in',
      )}
    >
      <div
        className={clsx(
          'absolute left-16 z-20 grid max-w-[600px] gap-4',
          paddingBottom ? 'bottom-[200px]' : 'bottom-3',
        )}
      >
        <h3 className="text-4xl font-bold">
          {movieLogo ? (
            <Image
              className="h-[100px] w-[150px] object-contain"
              src={getImageUrl(movieLogo)}
              alt={title}
              width={200}
              height={150}
            />
          ) : (
            <span>{title}</span>
          )}
        </h3>
        <p>{overview}</p>
        <div className="flex gap-4">
          <Link
            className="flex items-center gap-1 rounded-sm bg-white px-4 py-2 font-bold text-black"
            href={`/watch/${movieId}`}
          >
            <Play />
            <span>Play</span>
          </Link>
          <Link
            className="flex items-center gap-1 rounded-sm bg-white/50 px-4 py-2 font-bold"
            href={`/movie/${movieId}`}
          >
            <Info />
            <span>More info</span>
          </Link>
          <MovieActionButton onClick={onClickLike}>
            <Like fill={isMovieLiked ? '#fff' : 'none'} />
          </MovieActionButton>
          <MovieActionButton onClick={onClickDislike}>
            <Dislike />
          </MovieActionButton>
        </div>
      </div>

      <Image
        className="hero-img h-full w-full object-cover"
        src={getImageUrl(backdrop_path, 'original')}
        alt={title}
        fill
      />
    </header>
  )
}
