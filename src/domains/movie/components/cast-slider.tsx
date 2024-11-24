'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CastCard } from './cast-card'

import type { Cast } from '@/models'

interface Props {
  cast: Cast[]
}

export const CastSlider = ({ cast }: Props) => {
  return (
    <section>
      <h3 className="text-2xl font-bold">Cast</h3>

      <Swiper
        className="mx-16 w-full"
        slidesPerView={2}
        spaceBetween={16}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          768: { slidesPerView: 2.7 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4 },
          1440: { slidesPerView: 5.5 },
        }}
      >
        {cast.map((castItem) => (
          <SwiperSlide key={castItem.id}>
            <CastCard cast={castItem} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
