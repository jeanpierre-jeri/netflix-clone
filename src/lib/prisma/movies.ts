import { type Movie } from '@prisma/client'
import { prisma } from './db'

export const getRandomMovie = async () => {
  const movieCount = await prisma.movie.count()

  const randomMovieIndex = Math.floor(Math.random() * movieCount)

  const [randomMovie] = await prisma.movie.findMany({
    take: 1,
    skip: randomMovieIndex
  })

  return { randomMovie }
}

export const getMovies = async () => {
  const movies = await prisma.movie.findMany()

  return { movies }
}

export const getMovieById = async (movieId: string) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId
    }
  })

  return movie
}

export const getMoviesByUserFavoriteIds = async (userFavoriteIds: string[]) => {
  const favoriteUserMovies = await prisma.movie.findMany({
    where: {
      id: {
        in: userFavoriteIds
      }
    }
  })

  return favoriteUserMovies
}
