import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'

interface Props {
  name: string
  avatarSrc: ImageProps['src']
}

export const ProfileCard = ({ name, avatarSrc }: Props) => {
  return (
    <Link
      className="group flex max-w-fit flex-col items-center gap-5 transition-transform duration-300 hover:scale-110 focus:scale-110"
      href="/home"
    >
      <Image
        width={200}
        height={200}
        src={avatarSrc}
        alt={`${name}'s profile`}
      />
      <span className="text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
        {name}
      </span>
    </Link>
  )
}
