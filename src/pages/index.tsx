import type { GetServerSideProps } from 'next'
import { serverSession } from '@/lib/server-auth'
import { Navbar } from '@/components/organisms'

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
  return (
    <>
      <Navbar />
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
    </>
  )
}
