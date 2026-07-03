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
  BecauseYouLiked,
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

  const heroMoviePromise = getTrendingMovies().then((trendingMovies) =>
    getRandomItem(trendingMovies),
  )

  const heroLogoPromise = heroMoviePromise
    .then((heroMovie) => getMovieImages(heroMovie.id))
    .then(({ movieLogo }) => movieLogo)
    .catch(() => null)

  const [
    popularMovies,
    topRatedMovies,
    popularFamilyMovies,
    horrorMovies,
    heroMovie,
    movieLogo,
  ] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getPopularMoviesByGenres('10751,35'),
    getPopularMoviesByGenres('27,53'),
    heroMoviePromise,
    heroLogoPromise,
  ])

  const popularMoviesWithoutHero = popularMovies.filter(
    (movie) => movie.id !== heroMovie.id,
  )

  return (
    <main>
      <MovieModal />
      <Navbar />
      <MovieHero movie={heroMovie} movieLogo={movieLogo} fadeIn />
      <div className="-mt-[170px] grid gap-14">
        <MovieSlider title="Popular movies" movies={popularMoviesWithoutHero} />
        <MovieSlider title="Watch with family" movies={popularFamilyMovies} />
        <TopRatedMovies movies={topRatedMovies} />
        <MovieSlider title="Popular horror movies" movies={horrorMovies} />
        <BecauseYouLiked />
      </div>
      <Footer />
    </main>
  )
}
