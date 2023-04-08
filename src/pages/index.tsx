import type { GetServerSideProps } from 'next'
import { serverSession } from '@/lib/server-auth'
import { BillBoard, MovieList, Navbar } from '@/components/organisms'
import { getMovies, getRandomMovie } from '@/lib/movies'
import { type Movie } from '@prisma/client'

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

  const [{ randomMovie }, { movies }] = await Promise.all([await getRandomMovie(), await getMovies()])

  return {
    props: {
      session,
      randomMovie,
      movies
    }
  }
}

interface Props {
  randomMovie: Movie
  movies: Movie[]
}

export default function Home({ randomMovie, movies }: Props) {
  return (
    <>
      <Navbar />
      <BillBoard randomMovie={randomMovie} />
      <div className='pb-40'>
        <MovieList movies={movies} title='Trending Now' />
      </div>
    </>
  )
}
