import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
  getPopularMovies,
  getPopularMoviesByGenres,
  getTopRatedMovies,
} from '@/services'

import { Footer, Navbar } from '@/components/ui'
import {
  MovieHero,
  MovieModal,
  MovieSlider,
  TopRatedMovies,
} from '@/domains/home/components'

export default async function HomePage() {
  const cookieStore = await cookies()
  const profile = cookieStore.get('profile')

  if (!profile) redirect('/select-profile')

  const [popularMovies, topRatedMovies, popularFamilyMovies, horrorMovies] =
    await Promise.all([
      getPopularMovies(),
      getTopRatedMovies(),
      getPopularMoviesByGenres('10751,35'),
      getPopularMoviesByGenres('27,53'),
    ])

  const [firstPopularMovie] = popularMovies

  return (
    <main>
      <MovieModal />
      <Navbar />
      <MovieHero
        movieId={firstPopularMovie.id}
        title={firstPopularMovie.title}
        overview={firstPopularMovie.overview}
        backdrop_path={firstPopularMovie.backdrop_path}
      />
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
