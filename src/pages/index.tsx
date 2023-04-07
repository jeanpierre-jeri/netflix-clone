import type { GetServerSideProps } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { serverSession } from '@/lib/server-auth'

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

  return {
    props: {
      session
    }
  }
}

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <h1 className='text-4xl text-green-500'>Netflix Clone</h1>
      <p className='text-white'>Logged in as {session?.user?.name}</p>
      <button className='py-3 px-6 bg-white' onClick={() => signOut()}>
        Logout
      </button>
    </>
  )
}
