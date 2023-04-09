import type { NextApiRequest, NextApiResponse } from 'next'
import { getMovieById, getMoviesByUserFavoriteIds } from '@/lib/prisma/movies'
import { serverSession } from '@/lib/server-auth'
import { addUserFavoriteId, deleteUserFavoriteId, getUserFavoriteIds } from '@/lib/prisma/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { session } = await serverSession(req, res)

    if (!session) return res.status(401).end()

    const { movieId } = req.query as { movieId: string }

    const [movie, userFavoriteIds] = await Promise.all([
      getMovieById(movieId),
      getUserFavoriteIds(session.user?.email || '')
    ])

    if (movie === null) throw new Error('Invalid ID')

    if (req.method === 'POST') {
      const user = await addUserFavoriteId(session.user?.email || '', movieId)
      const favoriteMovies = await getMoviesByUserFavoriteIds(user.favoriteIds)
      return res.status(200).json(favoriteMovies)
    }

    if (req.method === 'DELETE') {
      if (!userFavoriteIds) throw new Error('User not found')

      const user = await deleteUserFavoriteId(session.user?.email || '', userFavoriteIds, movieId)
      const favoriteMovies = await getMoviesByUserFavoriteIds(user.favoriteIds)

      return res.status(200).json(favoriteMovies)
    }

    return res.status(405).end()
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
