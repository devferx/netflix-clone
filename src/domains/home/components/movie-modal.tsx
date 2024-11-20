'use client'

import Image from 'next/image'

import { useMovieModalStore } from '@/store'

import { Close } from '@/components/icons'

import { getImageUrl } from '@/utils'

export const MovieModal = () => {
  const currentMovie = useMovieModalStore((store) => store.currentMovie)
  const closeMovieModal = useMovieModalStore((store) => store.closeMovieModal)

  if (!currentMovie) return null

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/55">
      <article className="relative max-h-[90%] w-[650px] overflow-y-auto rounded-lg border border-white/50 bg-[#141414]">
        <button
          className="absolute right-5 top-5 z-30"
          onClick={() => closeMovieModal()}
        >
          <Close />
        </button>

        <div className="relative z-10">
          <Image
            className="modal-backdrop-img h-[365px] w-full object-cover"
            width={675}
            height={365}
            src={getImageUrl(currentMovie.backdrop_path, 'w780')}
            alt={currentMovie.title}
          />
          <div className="modal-backdrop-gradients" />
        </div>

        <div className="relative z-20 -mt-10 flex items-start gap-8 p-10 pt-0">
          <Image
            className="rounded object-cover"
            width={150}
            height={250}
            src={getImageUrl(currentMovie.poster_path, 'w300')}
            alt={currentMovie.title}
          />

          <div className="mt-14 grid flex-1 gap-3">
            <h3 className="text-balance text-xl font-bold">
              {currentMovie.title}
            </h3>
            <p className="text-pretty">{currentMovie.overview}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
