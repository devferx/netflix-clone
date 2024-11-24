import { getMovieCast, getMovieDetails, getMovieImages } from '@/services'

import { Navbar } from '@/components/ui'
import { MovieHero } from '@/domains/home/components'
import { CastSlider, Gallery } from '@/domains/movie/components'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SingleMoviePage({ params }: Props) {
  const { id: movieId } = await params
  const [movieDetails, movieCast, movieImages] = await Promise.all([
    getMovieDetails(movieId),
    getMovieCast(movieId),
    getMovieImages(movieId),
  ])
  const { movieLogo, movieBackdrops } = movieImages

  return (
    <main>
      <Navbar />
      <MovieHero
        movieId={movieId}
        title={movieDetails.title}
        overview={movieDetails.overview}
        movieLogo={movieLogo}
        backdrop_path={movieDetails.backdrop_path}
        paddingBottom={false}
      />

      <div className="mt-5 px-16 py-6">
        <CastSlider cast={movieCast} />
        <Gallery photos={movieBackdrops} />
      </div>
    </main>
  )
}
