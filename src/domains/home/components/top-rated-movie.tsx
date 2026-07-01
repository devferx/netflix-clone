import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { getImageUrl } from '@/utils'

import type { Movie } from '@/models'

interface Props {
  movie: Movie
  index: number
}

export const TopRatedMovie = ({ movie, index }: Props) => {
  return (
    <div className={'relative flex min-w-fit items-center gap-10 pl-[90px]'}>
      <span
        className={clsx(
          'font-outline-4 absolute -top-[20px] z-10 text-[220px] font-extrabold tracking-[-0.13em] text-transparent select-none',
          index >= 9 ? 'top-[20px] -left-6 text-[180px]' : '-left-0',
        )}
      >
        {index + 1}
      </span>
      <Link className="relative z-20" href={`/movie/${movie.id}`}>
        <Image
          className="w-[200px] object-cover select-none"
          width={200}
          height={300}
          src={getImageUrl(movie.poster_path, 'w300')}
          alt={movie.title}
        />
      </Link>
    </div>
  )
}
