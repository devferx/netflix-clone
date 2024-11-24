export interface GetMovieImages {
  backdrops: MovieDBImageItem[]
  id: number
  logos: MovieDBImageItem[]
  posters: MovieDBImageItem[]
}

export interface MovieDBImageItem {
  aspect_ratio: number
  height: number
  iso_639_1: null | string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}
