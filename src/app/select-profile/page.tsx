import { Navbar } from '@/components/ui'

import avatar1 from '@/assets/images/avatar-1.png'
import avatar2 from '@/assets/images/avatar-2.png'
import avatar3 from '@/assets/images/avatar-3.png'

import {
  AddProfileButton,
  ProfileCard,
} from '@/domains/account-selector/components'

export default function AccountSelectorPage() {
  return (
    <main>
      <Navbar showLinks={false} />
      <div className="grid min-h-screen w-full place-items-center">
        <section className="grid gap-8">
          <h2 className="text-center text-5xl">Who&apos;s watching?</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <ProfileCard name="Kelly" avatarSrc={avatar1} />
            <ProfileCard name="Becca" avatarSrc={avatar2} />
            <ProfileCard name="Tom" avatarSrc={avatar3} />
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
