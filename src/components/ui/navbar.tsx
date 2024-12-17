'use client'

import { setCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useProfileStore, useStore } from '@/store'

import { Bell, CaretDown } from '@/components/icons'
import { PROFILES } from '@/constants'
import { NavLink } from './nav-link'

import netflixLogo from '@/assets/images/netflix-logo.png'
import { NavbarSearch } from './navbar-search'

interface Props {
  showLinks?: boolean
  searchQuery?: string
}

export const Navbar = ({ showLinks = true, searchQuery = '' }: Props) => {
  const router = useRouter()
  const profiles = PROFILES
  const profile = useStore(useProfileStore, (state) =>
    state.getCurrentProfile(),
  )
  const selectProfile = useProfileStore((state) => state.selectProfile)

  const [background, setBackground] = useState('rgba(20, 20, 20, 0)')

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY
      if (scroll > 100) {
        const opacity = Math.min(1, window.scrollY / 400)
        setBackground(`rgba(20, 20, 20, ${opacity})`)
      }

      if (scroll < 100) {
        setBackground('rgba(20, 20, 20, 0)')
      }
    })
  }, [])

  const changeProfile = async (profileId: string) => {
    setCookie('profile', profileId)
    selectProfile(profileId)
    router.refresh()
  }

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-14"
      style={{ background }}
    >
      <div className="flex items-center gap-4 py-5">
        <Link href="/">
          <Image width={111} height={26} src={netflixLogo} alt="Netflix" />
        </Link>

        {showLinks && (
          <>
            <NavLink
              className="text-white"
              activeClassName="font-bold"
              href="/"
              exact
            >
              Start
            </NavLink>
            <NavLink
              className="text-white"
              activeClassName="font-bold"
              href="/my-list"
            >
              My List
            </NavLink>
          </>
        )}
      </div>

      {showLinks && profile && (
        <div className="relative flex gap-6">
          <NavbarSearch searchQuery={searchQuery} />

          <div className="py-8">
            <Bell />
          </div>

          <div className="group">
            <Link className="flex gap-2 py-8" href="/select-profile">
              <Image
                width={24}
                height={24}
                src={profile.avatarImg}
                alt={`${profile.name} avatar`}
              />
              <CaretDown />
            </Link>

            <div className="absolute bottom-0 right-0 hidden w-[150px] translate-y-full bg-black group-hover:block">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  className="group/card flex w-full items-center gap-2 p-2"
                  onClick={() => changeProfile(profile.id)}
                >
                  <Image
                    width={24}
                    height={24}
                    src={profile.avatarImg}
                    alt={`${profile.name} avatar`}
                  />
                  <span className="text-white group-hover/card:font-bold">
                    {profile.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
