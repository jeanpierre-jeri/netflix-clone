import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { serverSession } from '@/lib/server-auth'
import type { GetServerSideProps } from 'next'

import redUserImage from '~/images/default-red.webp'

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

export default function Profiles() {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <main className='flex justify-center items-center min-h-screen'>
      <section>
        <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching?</h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <button type='button' onClick={() => router.push('/')}>
            <div className='group w-44 mx-auto'>
              <picture className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:border-white overflow-hidden transition-all'>
                <Image src={redUserImage} alt='User Image' />
              </picture>
              <h3 className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white transition-all'>
                {session?.user?.name}
              </h3>
            </div>
          </button>
        </div>
      </section>
    </main>
  )
}
