import {
  getPopularMovies,
  getPopularMoviesByGenres,
  getTopRatedMovies,
} from '@/services'

import { Footer, Navbar } from '@/components/ui'
import {
  Hero,
  MovieModal,
  MovieSlider,
  TopRatedMovies,
} from '@/domains/home/components'

export default async function HomePage() {
  const [popularMovies, topRatedMovies, popularFamilyMovies, horrorMovies] =
    await Promise.all([
      getPopularMovies(),
      getTopRatedMovies(),
      getPopularMoviesByGenres('10751,35'),
      getPopularMoviesByGenres('27,53'),
    ])

  return (
    <main>
      <MovieModal />
      <Navbar />
      <Hero movie={popularMovies[0]} />
      <div className="-mt-[170px] grid gap-14">
        <MovieSlider title="Popular movies" movies={popularMovies} />
        <MovieSlider title="Watch with family" movies={popularFamilyMovies} />
        <TopRatedMovies movies={topRatedMovies} />
        <MovieSlider title="Popular horror movies" movies={horrorMovies} />
      </div>
      <Footer />
    </main>
  )
}
