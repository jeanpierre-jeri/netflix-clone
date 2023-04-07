import { PrismaClient } from '@prisma/client'
import { MOVIES } from '../data/movies'
const prisma = new PrismaClient()
async function main() {
  const movies = await prisma.movie.createMany({
    data: MOVIES
  })

  console.log({ movies })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
