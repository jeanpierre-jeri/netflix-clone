import type { NextApiRequest, NextApiResponse } from 'next'
import { getMoviesByUserFavoriteIds } from './../../../lib/prisma/movies'
import { serverSession } from '@/lib/server-auth'
import { getUserFavoriteIds } from '@/lib/prisma/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { session } = await serverSession(req, res)

    if (!session) return res.status(401).end()

    const userFavoriteIds = await getUserFavoriteIds(session.user?.email || '')

    if (!userFavoriteIds) throw new Error('User not found')

    const favoriteMovies = await getMoviesByUserFavoriteIds(userFavoriteIds)

    return res.status(200).json(favoriteMovies)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
