'use client'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const MovieActionButton = ({ children, ...props }: Props) => {
  return (
    <button className="rounded-full border border-white p-[5px]" {...props}>
      {children}
    </button>
  )
}
