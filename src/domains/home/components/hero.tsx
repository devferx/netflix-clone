import Image from 'next/image'

import { Info, Play } from '@/components/icons'

import { getImageUrl } from '@/utils'

import type { Movie } from '@/interfaces'

interface Props {
  movie: Movie
}

export const Hero = ({ movie }: Props) => {
  return (
    <header className="relative h-[calc(100vh-200px)]">
      <div className="absolute bottom-[200px] left-16 z-20 grid max-w-[600px] gap-4">
        <h3 className="text-4xl font-bold">{movie.title}</h3>
        <p>{movie.overview}</p>
        <div className="flex gap-4">
          <button className="flex items-center gap-1 rounded bg-white px-4 py-2 font-bold text-black">
            <Play />
            <span>Play</span>
          </button>
          <button className="flex items-center gap-1 rounded bg-white/50 px-4 py-2 font-bold">
            <Info />
            <span>More info</span>
          </button>
        </div>
      </div>

      <Image
        className="hero-img h-full w-full object-cover"
        src={getImageUrl(movie.backdrop_path, 'original')}
        alt={movie.title}
        fill
      />
    </header>
  )
}
