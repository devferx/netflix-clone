import type { GetMovieList, Movie } from '@/interfaces'
import { movieApi } from './movie-api'

export const getPopularMovies = async (): Promise<Movie[]> => {
  const { data } = await movieApi.get<GetMovieList>('/discover/movie')
  return data.results
}
