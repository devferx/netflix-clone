export const getImageUrl = (
  path?: string | null,
  size: 'original' | 'w780' | 'w500' | 'w300' = 'w500',
) =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : '/images/no-image.jpg'
