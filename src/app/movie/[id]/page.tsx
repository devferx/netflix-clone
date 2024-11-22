import { getMovieDetails } from '@/services'
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
  const movieDetails = await getMovieDetails(movieId)

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
        <pre>{JSON.stringify(movieDetails, null, 4)}</pre>
      </code>
    </main>
  )
}
