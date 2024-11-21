import Link from 'next/link'
import Image from 'next/image'

import { Navbar } from '@/components/ui'

import avatar1 from '@/assets/images/avatar-1.png'
import avatar2 from '@/assets/images/avatar-2.png'
import avatar3 from '@/assets/images/avatar-3.png'

import { AddCircle } from '@/components/icons'

export default function AccountSelectorPage() {
  return (
    <main>
      <Navbar showLinks={false} />
      <div className="grid min-h-screen w-full place-items-center">
        <section className="grid gap-8">
          <h2 className="text-center text-5xl">Who&apos;s watching?</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <Link
              className="group flex max-w-fit flex-col items-center gap-5 transition-transform duration-300 hover:scale-110 focus:scale-110"
              href="/"
            >
              <Image
                width={200}
                height={200}
                src={avatar1}
                alt="Kelly Profile"
              />
              <span className="text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
                Kelly
              </span>
            </Link>
            <Link
              className="group flex max-w-fit flex-col items-center gap-5 transition-transform duration-300 hover:scale-110 focus:scale-110"
              href="/"
            >
              <Image
                width={200}
                height={200}
                src={avatar2}
                alt="Becca Profile"
              />
              <span className="text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
                Becca
              </span>
            </Link>
            <Link
              className="group flex max-w-fit flex-col items-center gap-5 transition-transform duration-300 hover:scale-110 focus:scale-110"
              href="/"
            >
              <Image width={200} height={200} src={avatar3} alt="Tom Profile" />
              <span className="text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
                Tom
              </span>
            </Link>
            <button className="group flex max-w-fit flex-col items-center gap-5 transition-transform duration-300">
              <div className="m-10">
                <AddCircle />
              </div>
              <span className="text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
                Add Profile
              </span>
            </button>
          </div>

          <button className="mx-auto w-fit border border-white/70 px-8 py-2 text-xl text-white/70 transition-all duration-300 hover:border-white hover:text-white">
            Manage Profiles
          </button>
        </section>
      </div>
    </main>
  )
}
