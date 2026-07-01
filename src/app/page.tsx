import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
  getMovieImages,
  getPopularMovies,
  getPopularMoviesByGenres,
  getTopRatedMovies,
  getTrendingMovies,
} from '@/services'

import { Footer, Navbar } from '@/components/ui'
import {
  MovieHero,
  MovieModal,
  MovieSlider,
  TopRatedMovies,
} from '@/domains/home/components'
import { getRandomItem } from '@/utils'

export default async function HomePage() {
  const cookieStore = await cookies()
  const profile = cookieStore.get('profile')

  if (!profile) redirect('/select-profile')

  const [
    popularMovies,
    topRatedMovies,
    popularFamilyMovies,
    horrorMovies,
    trendingMovies,
  ] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getPopularMoviesByGenres('10751,35'),
    getPopularMoviesByGenres('27,53'),
    getTrendingMovies(),
  ])

  const heroMovie = getRandomItem(trendingMovies)
  const { movieLogo } = await getMovieImages(heroMovie.id)

  return (
    <main>
      <MovieModal />
      <Navbar />
      <MovieHero
        movieId={heroMovie.id}
        title={heroMovie.title}
        overview={heroMovie.overview}
        backdrop_path={heroMovie.backdrop_path}
        movieLogo={movieLogo}
        fadeIn
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
