'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useProfileStore, useStore } from '@/store'

import { Bell, CaretDown, Search } from '@/components/icons'

import netflixLogo from '@/assets/images/netflix-logo.png'
import { NavLink } from './nav-link'

interface Props {
  showLinks?: boolean
}

export const Navbar = ({ showLinks = true }: Props) => {
  const profile = useStore(useProfileStore, (state) =>
    state.getCurrentProfile(),
  )

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

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-14 py-5"
      style={{ background }}
    >
      <div className="flex items-center gap-4">
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

            {/* <NavLink
              className="text-white"
              activeClassName="font-bold"
              href="/movies"
            >
              Movies
            </NavLink> */}
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
        <div className="flex gap-6">
          <Search />
          <Bell />
          <Link className="flex gap-2" href="/select-profile">
            <Image
              width={24}
              height={24}
              src={profile.avatarImg}
              alt={`${profile.name} avatar`}
            />
            <CaretDown />
          </Link>
        </div>
      )}
    </nav>
  )
}
