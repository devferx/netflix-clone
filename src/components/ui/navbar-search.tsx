'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks'

import { Close, Search } from '../icons'

interface Props {
  searchQuery: string
}

export const NavbarSearch: React.FC<Props> = ({ searchQuery }) => {
  const router = useRouter()

  const hasSearchQuery = searchQuery.length > 0

  const [isSearchActive, setIsSearchActive] = useState(hasSearchQuery)
  const [search, setSearch] = useState(searchQuery)

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    if (!debouncedSearch) return

    router.push(`/search?q=${debouncedSearch}`)
  }, [router, debouncedSearch])

  return (
    <div className={'py-8'}>
      {isSearchActive ? (
        <div className="flex items-center gap-2 border border-white/70 bg-[#141414] p-1">
          <Search />

          <input
            className="bg-transparent text-white outline-none"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus={true}
          />

          <button onClick={() => setIsSearchActive(false)}>
            <Close />
          </button>
        </div>
      ) : (
        <button onClick={() => setIsSearchActive(!isSearchActive)}>
          <Search />
        </button>
      )}
    </div>
  )
}
