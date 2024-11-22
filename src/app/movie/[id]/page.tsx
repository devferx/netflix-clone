import { getMovieDetails } from '@/services'
import { Navbar } from '@/components/ui'
import { Hero } from '@/domains/home/components'

interface Props {
  params: {
    id: string
  }
}

export default async function SingleMoviePage(props: Props) {
  const { id: movieId } = props.params
  const movieDetails = await getMovieDetails(movieId)

  return (
    <main>
      <Navbar />
      <Hero
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
