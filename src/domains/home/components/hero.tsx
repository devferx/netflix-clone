import Image from 'next/image'

import { Info, Play } from '@/components/icons'

import { getImageUrl } from '@/utils'

interface Props {
  movieId: string | number
  title: string
  overview: string
  backdrop_path: string
}

export const Hero = ({ title, overview, backdrop_path }: Props) => {
  return (
    <header className="relative h-[calc(100vh-200px)]">
      <div className="absolute bottom-[200px] left-16 z-20 grid max-w-[600px] gap-4">
        <h3 className="text-4xl font-bold">{title}</h3>
        <p>{overview}</p>
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
        src={getImageUrl(backdrop_path, 'original')}
        alt={title}
        fill
      />
    </header>
  )
}
