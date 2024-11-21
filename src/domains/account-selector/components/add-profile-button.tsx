import { AddCircle } from '@/components/icons'

type Props = React.ComponentProps<'button'> & {
  label?: string
}

export const AddProfileButton = ({
  label = 'Add Profile',
  ...props
}: Props) => {
  return (
    <button
      className="group flex max-w-fit flex-col items-center gap-5 transition-transform duration-300"
      {...props}
    >
      <div className="m-10">
        <AddCircle />
      </div>

      <span className="text-2xl text-white/70 transition-colors duration-300 group-hover:text-white">
        {label}
      </span>
    </button>
  )
}
