import { MovieSliderItem } from './movie-slider-item'

import type { Movie } from '@/interfaces'

interface Props {
  title: string
  movies: Movie[]
}

export const MovieSlider = ({ title, movies }: Props) => {
  return (
    <section className="grid gap-4">
      <h3 className="px-16 text-xl font-bold">{title}</h3>
      <div className="flex items-start gap-4 overflow-x-auto py-5 pl-16">
        {movies.map((movie) => (
          <MovieSliderItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
