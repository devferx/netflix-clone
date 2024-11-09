import Image from 'next/image'

import { getGenreById } from '@/utils'

import type { Movie } from '@/interfaces'

import styles from './movie-slider-item.module.css'

interface Props {
  movie: Movie
}

export const MovieSliderItem = ({ movie }: Props) => {
  const genres = movie.genre_ids
    .map((genreId) => getGenreById(genreId))
    .join(' • ')
  return (
    <article className={styles.card}>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        width={400}
        height={225}
        alt={movie.title}
      />

      <div className={styles.cardInfo}>
        <h4>{movie.title}</h4>
        <span className={styles.genres}>{genres}</span>
      </div>
    </article>
  )
}
