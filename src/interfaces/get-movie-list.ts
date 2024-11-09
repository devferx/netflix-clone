import { Movie } from './movie'

export interface GetMovieList {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
