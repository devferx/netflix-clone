import { getPopularMovies } from '@/services'

export default async function HomePage() {
  const movies = await getPopularMovies()

  return (
    <div>
      <h1>Hello Page</h1>
      <ul>
        <li>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </li>
      </ul>
    </div>
  )
}
