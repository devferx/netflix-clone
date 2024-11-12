import clsx from 'clsx'
import Image from 'next/image'

import { getImageUrl } from '@/utils'

import type { Movie } from '@/interfaces'

interface Props {
  movie: Movie
  index: number
}

export const TopRatedMovie = ({ movie, index }: Props) => {
  return (
    <div
      key={movie.id}
      className={'relative flex min-w-fit items-center gap-10 pl-[90px]'}
    >
      <span
        className={clsx(
          'font-outline-4 absolute -top-[20px] z-10 select-none text-[220px] font-extrabold tracking-[-0.13em] text-transparent',
          index >= 9 ? '-left-6 top-[20px] text-[180px]' : '-left-0',
        )}
      >
        {index + 1}
      </span>
      <Image
        className="relative z-20 w-[200px] select-none object-cover"
        width={200}
        height={300}
        src={getImageUrl(movie.poster_path, 'w300')}
        alt={movie.title}
      />
    </div>
  )
}
