import { prisma } from './db'

export const getUserFavoriteIds = (userEmail: string) => {
  const favoriteIds = prisma.user
    .findUnique({
      where: {
        email: userEmail
      },
      select: {
        favoriteIds: true
      }
    })
    .then((user) => user?.favoriteIds)

  return favoriteIds
}

export const addUserFavoriteId = async (userEmail: string, movieId: string) => {
  const user = await prisma.user.update({
    where: {
      email: userEmail
    },
    data: {
      favoriteIds: {
        push: movieId
      }
    }
  })

  return user
}

export const deleteUserFavoriteId = async (userEmail: string, userFavoriteIds: string[], movieId: string) => {
  const user = await prisma.user.update({
    where: {
      email: userEmail
    },
    data: {
      favoriteIds: userFavoriteIds.filter((id) => id !== movieId)
    }
  })

  return user
}
