import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { FormUser } from '@/types'
import { hash } from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { email, name, password } = req.body as FormUser

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) return res.status(422).json({ error: 'Email taken' })

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date()
      }
    })

    return res.status(200).json({ email: user.email, id: user.id, name: user.name })
  } catch (error) {
    return res.status(500).end()
  }
}
