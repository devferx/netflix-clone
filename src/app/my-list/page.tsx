import { Footer, Navbar } from '@/components/ui'
import { SavedMovies } from '@/domains/my-list/components'

export default function MyListPage() {
  return (
    <main>
      <Navbar />
      <SavedMovies />
      <Footer />
    </main>
  )
}
