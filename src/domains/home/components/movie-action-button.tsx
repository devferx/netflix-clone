'use client'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const MovieActionButton = ({ children, ...props }: Props) => {
  return (
    <button className="border border-white rounded-full p-[5px]" {...props}>
      {children}
    </button>
  )
}
