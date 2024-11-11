'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import { MovieSliderItem } from './movie-slider-item'

import type { Movie } from '@/interfaces'

interface Props {
  title: string
  movies: Movie[]
}

export const MovieSlider = ({ title, movies }: Props) => {
  return (
    <section className="grid gap-4">
      <h3 className="px-16 text-xl font-bold">{title}</h3>
      <Swiper
        className="w-full mx-16"
        slidesPerView={2}
        spaceBetween={16}
        slidesOffsetBefore={64}
        slidesOffsetAfter={64}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="py-5">
            <MovieSliderItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
