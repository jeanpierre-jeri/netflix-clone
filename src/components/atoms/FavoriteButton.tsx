import type { Movie } from '@prisma/client'
import { CheckIcon, PlusIcon } from './Icons'
import { useFavorites } from '@/hooks'
import { addFavorite, removeFavorite } from '@/lib/utils'

interface Props {
  movie: Movie
}

export function FavoriteButton({ movie }: Props) {
  const { favorites, mutate } = useFavorites()
  const isFavorite = favorites.some(({ id }) => id === movie.id)

  const toggleFavorites = async () => {
    try {
      const action = isFavorite ? removeFavorite : addFavorite
      const optimisticData = isFavorite ? favorites.filter(({ id }) => id !== movie.id) : [movie, ...favorites]

      await mutate(action(movie.id), {
        optimisticData,
        rollbackOnError: true,
        populateCache: false,
        revalidate: false
      })
    } catch (error) {
      console.error('Error agregando favorito', { error })
    }
  }

  const Icon = isFavorite ? CheckIcon : PlusIcon
  return (
    <button
      onClick={toggleFavorites}
      className='group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition-all hover:border-neutral-300 p-1 text-white'
    >
      <Icon />
    </button>
  )
}
