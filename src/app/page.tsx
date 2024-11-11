import { getPopularMovies } from '@/services'
import { MovieSlider } from '../domains/home/components'

export default async function HomePage() {
  const movies = await getPopularMovies()

  return (
    <div>
      <MovieSlider title="Popular movies" movies={movies} />
    </div>
  )
}
