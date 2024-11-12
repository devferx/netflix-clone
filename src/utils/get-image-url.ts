export const getImageUrl = (
  path: string,
  size: 'original' | 'w500' | 'w300' = 'w500',
) => `https://image.tmdb.org/t/p/${size}/${path}`
