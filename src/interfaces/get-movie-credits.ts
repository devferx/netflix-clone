import { Cast } from './cast'

export interface GetMovieCredits {
  id: number
  cast: Cast[]
  crew: Cast[]
}
