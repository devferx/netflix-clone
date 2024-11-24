'use client'

import Image from 'next/image'

import { useMovieModalStore, useUserMoviesStore, useStore } from '@/store'

import { Check, Dislike, Like, Play, Plus } from '@/components/icons'
import { MovieActionButton } from './movie-action-button'

import { getGenreById, getImageUrl } from '@/utils'

import type { Movie } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  movie: Movie
  scaleOnHover?: boolean
}

export const MovieCard = ({ movie, scaleOnHover = true }: Props) => {
  const isMovieInUserList = useStore(useUserMoviesStore, (store) =>
    store.isMovieInUserList(movie.id),
  )
  const updateUserMovies = useUserMoviesStore((store) => store.updateUserMovies)
  const openMovieModal = useMovieModalStore((store) => store.openMovieModal)

  const genres = movie.genre_ids
    .map((genreId) => getGenreById(genreId))
    .join(' • ')

  return (
    <article
      className={clsx(
        'group relative duration-300 hover:z-20',
        scaleOnHover && 'hover:scale-[1.2]',
      )}
    >
      <Image
        className="w-full"
        src={getImageUrl(movie.backdrop_path)}
        width={400}
        height={225}
        alt={movie.title}
      />

      <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-black/45 px-6 py-4 opacity-0 duration-300 group-hover:opacity-100">
        <div className="flex gap-2">
          <MovieActionButton onClick={() => openMovieModal(movie)}>
            <Play />
          </MovieActionButton>
          <MovieActionButton onClick={() => updateUserMovies(movie)}>
            {isMovieInUserList ? <Check /> : <Plus />}
          </MovieActionButton>
          <MovieActionButton>
            <Like />
          </MovieActionButton>
          <MovieActionButton>
            <Dislike />
          </MovieActionButton>
        </div>

        <h4 className="font-bold">{movie.title}</h4>
        <span className="text-xs">{genres}</span>
      </div>
    </article>
  )
}
