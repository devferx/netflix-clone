import { Cast } from '@/models'

export interface GetMovieCredits {
  id: number
  cast: Cast[]
  crew: Cast[]
}
