import { Navbar } from '@/components/ui'
import {
  AddProfileButton,
  ProfileCard,
} from '@/domains/select-profile/components'

import { PROFILES } from '@/constants'

export default function AccountSelectorPage() {
  return (
    <main>
      <Navbar showLinks={false} />
      <div className="grid min-h-screen w-full place-items-center">
        <section className="grid gap-8">
          <h2 className="text-center text-5xl">Who&apos;s watching?</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {PROFILES.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
            <AddProfileButton />
          </div>

          <button className="mx-auto w-fit border border-white/70 px-8 py-2 text-xl text-white/70 transition-all duration-300 hover:border-white hover:text-white">
            Manage Profiles
          </button>
        </section>
      </div>
    </main>
  )
}
