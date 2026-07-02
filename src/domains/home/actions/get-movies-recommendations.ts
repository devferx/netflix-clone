'use server'

import { getMovieRecommendations } from '@/services'

import type { Movie } from '@/models'

export async function getMoviesRecommendations(
  movieIds: number[],
): Promise<Record<number, Movie[]>> {
  const recommendationsByMovieId = await Promise.all(
    movieIds.map(async (movieId) => {
      const recommendations = await getMovieRecommendations(movieId)
      return [movieId, recommendations] as const
    }),
  )

  return Object.fromEntries(
    recommendationsByMovieId.filter(
      ([, recommendations]) => recommendations.length > 0,
    ),
  )
}
