'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Bell, Search } from '@/components/icons'

import netflixLogo from '@/assets/images/netflix-logo.png'

interface Props {
  showLinks?: boolean
}

export const Navbar = ({ showLinks = true }: Props) => {
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
        <Image width={111} height={26} src={netflixLogo} alt="Netflix" />

        {showLinks && (
          <>
            <Link className="font-bold text-white" href="/">
              Start
            </Link>
            <Link className="text-white" href="/">
              Movies
            </Link>
            <Link className="text-white" href="/">
              My List
            </Link>
          </>
        )}
      </div>

      {showLinks && (
        <div className="flex gap-6">
          <Search />
          <Bell />
        </div>
      )}
    </nav>
  )
}
