import { type GetServerSideProps } from 'next'
import Link from 'next/link'
import { serverSession } from '@/lib/server-auth'
import { getMovieById } from '@/lib/prisma/movies'
import { BackArrowIcon } from '@/components/atoms'
import { type Movie } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { movieId } = query as { movieId: string }

  const [{ session }, movie] = await Promise.all([serverSession(req, res), getMovieById(movieId)])

  if (!session || !movie) {
    return {
      redirect: {
        destination: !session ? '/auth' : '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      movie
    }
  }
}
interface Props {
  movie: Movie
}
export default function Watch({ movie }: Props) {
  return (
    <main className='min-h-screen bg-black'>
      <div className='fixed p-4 w-full left-0 top-0 z-10 flex items-center gap-8 bg-black/70'>
        <Link href='/' className='text-white'>
          <BackArrowIcon />
        </Link>
        <h1 className='text-white text-xl md:text-3xl font-light'>
          Watching: {''} <strong className='font-bold'>{movie.title}</strong>
        </h1>
      </div>

      <video src={movie.videoUrl} autoPlay controls className='w-full h-screen' />
    </main>
  )
}
