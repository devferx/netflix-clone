import { getPopularMovies } from '@/services'
import { Hero, MovieSlider } from '@/domains/home/components'

export default async function HomePage() {
  const movies = await getPopularMovies()

  return (
    <div>
      <Hero movie={movies[0]} />
      <div className="-mt-[170px]">
        <MovieSlider title="Popular movies" movies={movies} />
      </div>
    </div>
  )
}
