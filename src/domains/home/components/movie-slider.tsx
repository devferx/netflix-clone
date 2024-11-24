'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { MovieCard } from '@/components/ui/movie-card'

import type { Movie } from '@/models'

import 'swiper/css'
import 'swiper/css/navigation'

interface Props {
  title: string
  movies: Movie[]
}

export const MovieSlider = ({ title, movies }: Props) => {
  return (
    <section className="grid gap-4">
      <h3 className="px-16 text-xl font-bold">{title}</h3>
      <Swiper
        className="mx-16 w-full"
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
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
