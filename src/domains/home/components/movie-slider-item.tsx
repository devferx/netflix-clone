import Image from 'next/image'

import { Dislike, Like, Play, Plus } from '@/components/icons'
import { MovieActionButton } from './movie-action-button'

import { getGenreById, getImageUrl } from '@/utils'

import type { Movie } from '@/interfaces'

interface Props {
  movie: Movie
}

export const MovieSliderItem = ({ movie }: Props) => {
  const genres = movie.genre_ids
    .map((genreId) => getGenreById(genreId))
    .join(' • ')
  return (
    <article className="group relative duration-300 hover:z-20 hover:scale-[1.2]">
      <Image
        src={getImageUrl(movie.backdrop_path)}
        width={400}
        height={225}
        alt={movie.title}
      />

      <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-black/45 px-6 py-4 opacity-0 duration-300 group-hover:opacity-100">
        <div className="flex gap-2">
          <MovieActionButton>
            <Play />
          </MovieActionButton>
          <MovieActionButton>
            <Plus />
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
