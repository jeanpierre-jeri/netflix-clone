import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)

  return {
    user: data,
    error,
    isLoading,
    mutate
  }
}
