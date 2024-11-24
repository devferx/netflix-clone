import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { PROFILES } from '@/constants'

import type { Profile } from '@/models'

interface State {
  profiles: Record<string, Profile>
  selectedProfile: string | null
  getCurrentProfile: () => Profile | null
  selectProfile: (id: string) => void
}

export const useProfileStore = create<State>()(
  persist(
    (set, get) => ({
      profiles: PROFILES.reduce(
        (acc, profile) => {
          acc[profile.id] = profile
          return acc
        },
        {} as Record<string, Profile>,
      ),
      selectedProfile: null,
      getCurrentProfile: () =>
        get().profiles[get().selectedProfile ?? ''] || null,
      selectProfile: (id) => set({ selectedProfile: id }),
    }),
    { name: 'profile-store' },
  ),
)
