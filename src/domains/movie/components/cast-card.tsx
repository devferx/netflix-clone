import Image from 'next/image'

import { getImageUrl } from '@/utils'

import type { Cast } from '@/models'

interface Props {
  cast: Cast
}

export const CastCard = ({ cast }: Props) => (
  <article className="group relative mx-2 my-6 h-[350px] min-w-[200px] overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.09]">
    <div className="absolute bottom-0 left-0 right-0 z-50 px-3 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <h3>{cast.name}</h3>
      <p>{cast.character}</p>
    </div>

    <div className="absolute z-10 h-full w-full bg-gradient-to-t from-black to-transparent to-50% opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <Image
      className="relative h-full w-full object-cover"
      src={getImageUrl(cast?.profile_path || '')}
      width={200}
      height={350}
      alt={cast.name}
    />
  </article>
)
