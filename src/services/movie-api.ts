import axios from 'axios'

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.THE_MOVIE_DB_API_KEY}`,
  },
})
