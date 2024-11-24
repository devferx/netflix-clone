import { getMovieCast, getMovieDetails } from '@/services'
import { Navbar } from '@/components/ui'
import { MovieHero } from '@/domains/home/components'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function SingleMoviePage({ params }: Props) {
  const { id: movieId } = await params
  const [movieDetails, movieCast] = await Promise.all([
    getMovieDetails(movieId),
    getMovieCast(movieId),
  ])

  return (
    <main>
      <Navbar />
      <MovieHero
        movieId={movieId}
        title={movieDetails.title}
        overview={movieDetails.overview}
        backdrop_path={movieDetails.backdrop_path}
      />
      <code>
        <pre>{JSON.stringify(movieCast, null, 4)}</pre>
      </code>
      <code>
        <pre>{JSON.stringify(movieDetails, null, 4)}</pre>
      </code>
    </main>
  )
}
