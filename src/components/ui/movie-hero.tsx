import Image from 'next/image'

import { Info, Play } from '@/components/icons'

import { getImageUrl } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'

interface Props {
  movieId: string | number
  title: string
  overview: string
  backdrop_path: string
  movieLogo?: string | null
  paddingBottom?: boolean
}

export const MovieHero = ({
  movieId,
  title,
  overview,
  backdrop_path,
  movieLogo,
  paddingBottom = true,
}: Props) => {
  return (
    <header className="relative h-[calc(100vh-200px)]">
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
            className="flex items-center gap-1 rounded bg-white px-4 py-2 font-bold text-black"
            href={`/watch/${movieId}`}
          >
            <Play />
            <span>Play</span>
          </Link>
          <Link
            className="flex items-center gap-1 rounded bg-white/50 px-4 py-2 font-bold"
            href={`/movie/${movieId}`}
          >
            <Info />
            <span>More info</span>
          </Link>
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
