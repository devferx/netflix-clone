'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import { TopRatedMovie } from './top-rated-movie'

import type { Movie } from '@/interfaces'

interface Props {
  movies: Movie[]
}

export const TopRatedMovies = ({ movies }: Props) => {
  return (
    <section className="grid gap-4">
      <h3 className="px-16 text-xl font-bold">Top 10 movies</h3>
      <Swiper
        className="mx-16 w-full"
        slidesPerView={2}
        spaceBetween={16}
        slidesOffsetBefore={64}
        slidesOffsetAfter={64}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          768: { slidesPerView: 2.7 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4 },
          1440: { slidesPerView: 5.5 },
        }}
      >
        {movies.slice(0, 10).map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <TopRatedMovie movie={movie} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
