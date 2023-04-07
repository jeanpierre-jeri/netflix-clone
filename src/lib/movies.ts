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
