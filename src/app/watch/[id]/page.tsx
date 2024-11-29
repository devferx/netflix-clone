import { getMovieVideos } from '@/services'

import { VideoScreen } from '@/domains/watch/components'

interface Props {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function WathPage({ params }: Props) {
  const { id } = await params
  const videos = await getMovieVideos(id)

  const video = videos.find((video) => video.type === 'Trailer') ?? videos[0]

  if (!video) {
    return <div>No video</div>
  }

  return <VideoScreen videoId={video.key} />
}
