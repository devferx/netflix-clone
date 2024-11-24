export const getImageUrl = (
  path: string,
  size: 'original' | 'w780' | 'w500' | 'w300' = 'w500',
) => `https://image.tmdb.org/t/p/${size}${path}`
