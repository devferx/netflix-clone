'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { useMovieModalStore, useStore, useUserMoviesStore } from '@/store'

import { Check, Dislike, Like, Play, Plus } from '@/components/icons'
import { MovieActionButton } from './movie-action-button'

import { getGenreById, getImageUrl } from '@/utils'

import type { Movie } from '@/models'
import { useRouter } from 'next/navigation'

interface Props {
  movie: Movie
  scaleOnHover?: boolean
}

export const MovieCard = ({ movie, scaleOnHover = true }: Props) => {
  const router = useRouter()

  const isMovieInUserList = useStore(useUserMoviesStore, (store) =>
    store.isMovieInUserList(movie.id),
  )
  const updateUserMovies = useUserMoviesStore((store) => store.updateUserMovies)
  const openMovieModal = useMovieModalStore((store) => store.openMovieModal)

  const genres = (movie?.genre_ids ?? [])
    .map((genreId) => getGenreById(genreId))
    .join(' • ')

  const onClickCard = () => {
    router.push(`/movie/${movie.id}`)
  }

  const onClickPlay = (event: React.MouseEvent) => {
    event.stopPropagation()
    openMovieModal(movie)
  }

  const onClickAddToList = (event: React.MouseEvent) => {
    event.stopPropagation()
    updateUserMovies(movie)
  }

  return (
    <article
      className={clsx(
        'group relative cursor-pointer duration-300 hover:z-20',
        scaleOnHover && 'hover:scale-[1.2]',
      )}
      onClick={onClickCard}
    >
      <Image
        className="max-h-[180px] w-full object-cover"
        src={getImageUrl(movie.backdrop_path)}
        width={400}
        height={225}
        alt={movie.title}
      />

      <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-black/45 px-6 py-4 opacity-0 duration-300 group-hover:opacity-100">
        <div className="flex gap-2">
          <MovieActionButton onClick={onClickPlay}>
            <Play />
          </MovieActionButton>
          <MovieActionButton onClick={onClickAddToList}>
            {isMovieInUserList ? <Check /> : <Plus />}
          </MovieActionButton>
          <MovieActionButton>
            <Like />
          </MovieActionButton>
          <MovieActionButton>
            <Dislike />
          </MovieActionButton>
        </div>

        <Link href={`/movie/${movie.id}`}>
          <h4 className="font-bold">{movie.title}</h4>
        </Link>
        <span className="text-xs">{genres}</span>
      </div>
    </article>
  )
}
