import axios from 'redaxios'
import { type FormUser } from '@/types.d'
import { signIn } from 'next-auth/react'
import { type Movie } from '@prisma/client'

export const login = async ({ email, password }: Pick<FormUser, 'email' | 'password'>) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/profiles'
    })
  } catch (error) {
    console.log(error)
  }
}

export const register = async ({ email, name, password }: FormUser) => {
  try {
    await axios.post('/api/register', {
      email,
      name,
      password
    })

    await login({ email, password })
  } catch (error) {
    console.log(error)
  }
}

export const addFavorite = async (id: string): Promise<Movie[]> => {
  const { data } = await axios.post(`/api/favorites/${id}`)

  return data
}

export const removeFavorite = async (id: string): Promise<Movie[]> => {
  const { data } = await axios.delete(`/api/favorites/${id}`)
  return data
}
