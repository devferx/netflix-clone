import notFound from '@/assets/icons/not-found.svg'

interface Props {
  message?: string
}

export const NotFound = ({ message = 'Not Found' }: Props) => {
  return (
    <section className="flex flex-col items-center justify-center space-y-5">
      <img
        className="w-full max-w-[500px]"
        src={notFound.src}
        alt="Not Found"
      />
      <h3 className="text-2xl font-bold">{message}</h3>
    </section>
  )
}
