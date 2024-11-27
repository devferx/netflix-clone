export const getImageUrl = (
  path?: string | null,
  size: 'original' | 'w780' | 'w500' | 'w300' = 'w500',
  type: 'poster' | 'profile' = 'poster',
) => {
  if (path) return `https://image.tmdb.org/t/p/${size}${path}`

  return type === 'poster'
    ? '/images/no-image.jpg'
    : '/images/profile-placeholder.jpg'
}
