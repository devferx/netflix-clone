'use client'

import { useRouter } from 'next/navigation' // Import useRouter

interface Props {
  videoId: string
}

export const VideoScreen = ({ videoId }: Props) => {
  const router = useRouter() // Initialize useRouter

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <button
        className="absolute top-4 left-4 rounded-sm bg-gray-800 px-4 py-2 text-white"
        onClick={() => router.back()}
      >
        Back
      </button>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  )
}
