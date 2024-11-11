import {
  getPopularMovies,
  getTopRatedMovies,
  getPopularMoviesByGenres,
} from '@/services'

import { Hero, MovieSlider } from '@/domains/home/components'

export default async function HomePage() {
  const [
    popularMovies,
    topRatedMovies,
    popularFamilyMovies,
    horrorMovies,
    dramaMovies,
  ] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getPopularMoviesByGenres('10751,35'),
    getPopularMoviesByGenres('27,53'),
    getPopularMoviesByGenres('18,10749'),
  ])

  return (
    <div>
      <Hero movie={popularMovies[0]} />
      <div className="-mt-[170px] grid gap-14">
        <MovieSlider title="Popular movies" movies={popularMovies} />
        <MovieSlider title="Watch with family" movies={popularFamilyMovies} />
        <MovieSlider title="Top rated movies" movies={topRatedMovies} />
        <MovieSlider title="Popular horror movies" movies={horrorMovies} />
        <MovieSlider title="Drama movies" movies={dramaMovies} />
      </div>
    </div>
  )
}
