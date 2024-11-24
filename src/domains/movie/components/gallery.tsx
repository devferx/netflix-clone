'use client'

import Image from 'next/image'

import { getImageUrl } from '@/utils'
import { useState } from 'react'
import clsx from 'clsx'

interface Props {
  photos: string[]
}

export const Gallery = ({ photos }: Props) => {
  const [showAll, setShowAll] = useState(false)
  const toggleShowAll = () => setShowAll((prev) => !prev)

  return (
    <section>
      <div className="flex justify-between">
        <h3>Gallery</h3>
        <button className="text-blue-500" onClick={toggleShowAll}>
          {showAll ? 'Hide All' : 'Show All'}
        </button>
      </div>

      <div
        className={clsx(
          'mt-4 grid grid-cols-4 gap-4 overflow-hidden',
          showAll ? 'h-fit' : 'h-[200px]',
        )}
      >
        {photos.map((image) => (
          <Image
            className="h-[200px] w-full object-cover"
            key={image}
            src={getImageUrl(image)}
            width={400}
            height={500}
            alt={image}
          />
        ))}
      </div>
    </section>
  )
}
