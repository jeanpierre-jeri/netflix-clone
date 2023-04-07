import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSession } from '@/lib/server-auth'
import { BillBoard, Navbar } from '@/components/organisms'
import { getRandomMovie } from '@/lib/movies'
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

  const { randomMovie } = await getRandomMovie()

  return {
    props: {
      session,
      randomMovie
    }
  }
}

interface Props {
  randomMovie: Movie
}

export default function Home({ randomMovie }: Props) {
  return (
    <>
      <Navbar />
      <BillBoard randomMovie={randomMovie} />
    </>
  )
}
