import { Footer, Navbar } from '@/components/ui'

interface Props {
  searchParams: Promise<{
    q: string
  }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q: query } = await searchParams

  return (
    <main>
      <Navbar searchQuery={query} />
      <section className="mt-24 px-16">
        <h3 className="text-2xl font-bold">{query}</h3>
      </section>

      <Footer />
    </main>
  )
}
