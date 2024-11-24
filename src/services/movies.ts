import { movieApi } from './movie-api'

import type {
  GetMovieCredits,
  GetMovieImages,
  GetMovieList,
} from '@/interfaces'
import type { Cast, Movie, MovieDetails } from '@/models'

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

export const getMovieDetails = async (
  movieId: string | number,
): Promise<MovieDetails> => {
  const { data } = await movieApi.get<MovieDetails>(`/movie/${movieId}`)
  return data
}

export const getMovieCast = async (
  movieId: string | number,
): Promise<Cast[]> => {
  const { data } = await movieApi.get<GetMovieCredits>(
    `/movie/${movieId}/credits`,
  )
  const { cast } = data

  return cast
}

export const getMovieImages = async (
  movieId: string | number,
): Promise<{ movieLogo: string | null; movieBackdrops: string[] }> => {
  const { data } = await movieApi.get<GetMovieImages>(
    `/movie/${movieId}/images`,
  )

  const { backdrops, logos } = data

  const movieLogo = logos[0].file_path ?? null
  const movieBackdrops = backdrops.map((backdrop) => backdrop.file_path)

  return { movieLogo, movieBackdrops }
}
