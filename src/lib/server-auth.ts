import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { ServerResponse, IncomingMessage } from 'http'
import type { NextApiRequestCookies } from 'next/dist/server/api-utils'

export async function serverSession(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
) {
  const session = await getServerSession(req, res, authOptions)

  return {
    session
  }
}
