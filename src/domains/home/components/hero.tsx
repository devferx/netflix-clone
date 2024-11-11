/* eslint-disable @next/next/no-img-element */

import { Info, Play } from '@/components/icons'

import { getImageUrl } from '@/utils/get-image-url'

import type { Movie } from '@/interfaces'

interface Props {
  movie: Movie
}

export const Hero = ({ movie }: Props) => {
  return (
    <header className="relative h-[calc(100vh-200px)]">
      <div className="absolute bottom-[200px] left-16  z-20  max-w-[600px] grid gap-4">
        <h3 className="text-4xl font-bold">{movie.title}</h3>
        <p>{movie.overview}</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 flex gap-1 bg-white rounded font-bold items-center text-black">
            <Play />
            <span>Play</span>
          </button>
          <button className="px-4 py-2 flex gap-1 bg-white/50 rounded font-bold items-center">
            <Info />
            <span>More info</span>
          </button>
        </div>
      </div>

      <img
        className="w-full h-full object-cover hero-img"
        src={getImageUrl(movie.backdrop_path, 'original')}
        alt={movie.title}
      />
    </header>
  )
}
