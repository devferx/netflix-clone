'use client'

import { setCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useProfileStore } from '@/store'

import type { Profile } from '@/models'

interface Props {
  profile: Profile
}

export const ProfileCard = ({ profile }: Props) => {
  const selectProfile = useProfileStore((state) => state.selectProfile)

  const router = useRouter()

  const handleClick = async () => {
    setCookie('profile', profile.id)
    selectProfile(profile.id)
    router.push('/')
  }

  return (
    <button
      className="group flex max-w-fit flex-col items-center gap-5 transition-transform duration-300 hover:scale-110 focus:scale-110"
      onClick={handleClick}
    >
      <Image
        width={200}
        height={200}
        src={profile.avatarImg}
        alt={`${profile.name}'s profile`}
      />
      <span className="text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
        {profile.name}
      </span>
    </button>
  )
}
