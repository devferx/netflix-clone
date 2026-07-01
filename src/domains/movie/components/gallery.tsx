'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { getImageUrl } from '@/utils'

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
          <img
            className="h-[200px] w-full object-cover"
            key={image}
            src={getImageUrl(image)}
            alt={image}
          />
        ))}
      </div>
    </section>
  )
}
