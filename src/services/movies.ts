import type { GetMovieList, Movie } from '@/interfaces'
import { movieApi } from './movie-api'

export const getPopularMovies = async (): Promise<Movie[]> => {
  const { data } = await movieApi.get<GetMovieList>('/movie/popular')
  return data.results
}

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const { data } = await movieApi.get<GetMovieList>('/discover/movie', {
    params: {
      include_adult: false,
      include_video: false,
      page: 1,
      sort_by: 'vote_average.desc',
      without_genres: '99,10755',
      primary_release_year: 2024,
      'vote_count.gte': 200,
    },
  })
  return data.results
}

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const { data } = await movieApi.get<GetMovieList>('/movie/upcoming', {
    params: {
      include_adult: false,
      include_video: false,
      page: 1,
      sort_by: 'popularity.desc',
      'release_date.gte': new Date().toISOString().split('T')[0],
      'release_date.lte': new Date(
        new Date().setFullYear(new Date().getFullYear() + 2),
      )
        .toISOString()
        .split('T')[0],
    },
  })
  return data.results
}

export const getPopularMoviesByGenres = async (
  genres: string,
): Promise<Movie[]> => {
  const { data } = await movieApi.get<GetMovieList>('/discover/movie', {
    params: {
      include_adult: false,
      include_video: false,
      page: 1,
      sort_by: 'popularity.desc',
      with_genres: genres,
    },
  })
  return data.results
}
