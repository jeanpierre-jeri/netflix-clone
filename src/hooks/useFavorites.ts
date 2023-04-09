import { type Movie } from '@prisma/client'
import useSWR from 'swr'

export function useFavorites() {
  const { data: favorites = [], mutate, isLoading } = useSWR<Movie[]>('/api/favorites')

  return {
    favorites,
    mutate,
    isLoading
  }
}
