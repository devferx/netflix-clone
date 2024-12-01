'use client'

import clsx from 'clsx'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

type Props = LinkProps & {
  className?: string
  exact?: boolean
  activeClassName?: string
  children: React.ReactNode
}

export const NavLink = ({
  className = '',
  activeClassName = '',
  exact = false,
  ...props
}: Props) => {
  const pathname = usePathname()

  const isActive = exact
    ? pathname === props.href
    : pathname.startsWith(props.href as string)

  return (
    <Link className={clsx(className, isActive && activeClassName)} {...props} />
  )
}
