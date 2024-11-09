import { MovieSliderItem } from '@/domains/home/components'
import { getPopularMovies } from '@/services'

export default async function HomePage() {
  const movies = await getPopularMovies()

  return (
    <div>
      <h1>Hello Page</h1>

      <div className="movie-slider">
        {movies.map((movie) => (
          <MovieSliderItem key={movie.id} movie={movie} />
        ))}
      </div>

      <h3>Hello</h3>
    </div>
  )
}
