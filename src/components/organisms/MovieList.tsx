import { type Movie } from '@prisma/client'
import { MovieCard } from '../molecules'

interface Props {
  movies: Movie[]
  title: string
}

export function MovieList({ movies = [], title }: Props) {
  if (movies && movies.length === 0) return null
  return (
    <section className='px-4 md:px-12 mt-4 space-y-8'>
      <h2 className='text-white text-md md:text-xl lg:text-2xl font-semibold'>{title}</h2>
      <div className='grid md:grid-cols-4 gap-2'>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
