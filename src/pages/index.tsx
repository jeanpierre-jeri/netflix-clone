import type { GetServerSideProps } from 'next'
import { serverSession } from '@/lib/server-auth'
import { BillBoard, MovieList, Navbar } from '@/components/organisms'
import { getMovies, getMoviesByUserFavoriteIds, getRandomMovie } from '@/lib/prisma/movies'
import { type Movie } from '@prisma/client'
import { getUserFavoriteIds } from '@/lib/prisma/user'
import { useFavorites } from '@/hooks/useFavorites'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { session } = await serverSession(req, res)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  const userFavoriteIds = await getUserFavoriteIds(session.user?.email || '')

  const [{ randomMovie }, { movies }, favorites] = await Promise.all([
    await getRandomMovie(),
    await getMovies(),
    await getMoviesByUserFavoriteIds(userFavoriteIds || [])
  ])

  return {
    props: {
      session,
      randomMovie,
      movies,
      fallback: {
        '/api/favorites': favorites
      }
    }
  }
}

interface Props {
  randomMovie: Movie
  movies: Movie[]
}

export default function Home({ randomMovie, movies }: Props) {
  const { favorites } = useFavorites()
  return (
    <>
      <Navbar />
      <main className='pb-40'>
        <BillBoard randomMovie={randomMovie} />
        <MovieList movies={movies} title='Trending Now' />
        <MovieList movies={favorites} title='My List' />
      </main>
    </>
  )
}
