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
      className={'relative min-w-fit flex gap-10 items-center pl-[90px]'}
    >
      <span
        className={clsx(
          'absolute -top-[20px] text-[220px] font-extrabold font-outline-4 text-transparent z-10 select-none tracking-[-0.13em]',
          index >= 9 ? '-left-6 top-[20px] text-[180px]' : '-left-0',
        )}
      >
        {index + 1}
      </span>
      <Image
        className="relative w-[200px] z-20 select-none"
        objectFit="cover"
        width={200}
        height={300}
        src={getImageUrl(movie.poster_path, 'w300')}
        alt={movie.title}
      />
    </div>
  )
}
