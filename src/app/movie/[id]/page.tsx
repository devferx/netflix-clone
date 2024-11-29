import type { Metadata, ResolvingMetadata } from 'next'

import {
  getMovieCast,
  getMovieDetails,
  getMovieImages,
  getPopularMovies,
  getTopRatedMovies,
} from '@/services'

import { Navbar } from '@/components/ui'
import { MovieHero } from '@/domains/home/components'
import { CastSlider, Gallery } from '@/domains/movie/components'

import type { Movie } from '@/models'
import { getImageUrl } from '@/utils'

export const revalidate = false
export const dynamicParams = true

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const movieDetails = await getMovieDetails(id)

  return {
    title: movieDetails.title,
    description: movieDetails.overview,
    openGraph: {
      images: [getImageUrl(movieDetails.backdrop_path, 'w500')],
    },
  }
}

export async function generateStaticParams() {
  const moviesIds: string[] = (
    await Promise.all([getPopularMovies(), getTopRatedMovies()])
  )
    .flat()
    .map((movie: Movie) => String(movie.id))

  return moviesIds.map((id) => ({ params: { id } }))
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
