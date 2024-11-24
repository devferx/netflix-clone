import Image from 'next/image'

import { getMovieCast, getMovieDetails, getMovieImages } from '@/services'

import { Navbar } from '@/components/ui'
import { MovieHero } from '@/domains/home/components'

import { getImageUrl } from '@/utils'

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

      <section>
        <div className="flex max-w-full justify-start gap-6 overflow-x-auto px-16 py-7">
          {movieCast.map((cast) => (
            <article
              key={cast.id}
              className="group relative h-[350px] min-w-[200px] overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.09]"
            >
              <div className="absolute bottom-0 left-0 right-0 z-50 px-3 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3>{cast.name}</h3>
                <p>{cast.character}</p>
              </div>

              <div className="absolute z-10 h-full w-full bg-gradient-to-t from-black to-transparent to-50% opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <Image
                className="relative h-full w-full object-cover"
                src={getImageUrl(cast?.profile_path || '')}
                width={200}
                height={350}
                alt={cast.name}
              />
            </article>
          ))}
        </div>

        <div className="grid grid-cols-4">
          {movieBackdrops.map((image) => (
            <Image
              key={image}
              src={getImageUrl(image)}
              width={200}
              height={300}
              alt={image}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
