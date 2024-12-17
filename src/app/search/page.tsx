import { Footer, MovieCard, Navbar } from '@/components/ui'
import { getMovieBySearch } from '@/services'

interface Props {
  searchParams: Promise<{
    q: string
  }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q: query } = await searchParams
  const movieResults = await getMovieBySearch(query)

  return (
    <main>
      <Navbar searchQuery={query} />
      <section className="mt-24 px-16">
        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] justify-between gap-7">
          {movieResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} scaleOnHover={false} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
