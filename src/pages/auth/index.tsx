import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { GithubIcon, GoogleIcon, Input } from '@/components/atoms'

import logo from '~/images/logo.webp'
import { login, register } from '@/lib/utils'
import { type FormUser } from '@/types'

type Variant = 'login' | 'register'

export default function Auth() {
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('login')
  const isVariantLogin = variant === 'login'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    const formData = new FormData(form)

    const { email, name, password } = Object.fromEntries(formData.entries()) as unknown as FormUser

    if (isVariantLogin) {
      await login({ email, password })
    } else {
      await register({ email, name, password })
    }

    router.push('/')
    form.reset()
  }

  const toggleVariant = () => {
    setVariant((currVariant) => (currVariant === 'login' ? 'register' : 'login'))
  }

  return (
    <main className="relative min-h-screen bg-no-repeat bg-center bg-fixed bg-cover bg-[url('/images/hero.webp')]">
      <div className='bg-black min-h-screen lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <picture>
            <Image src={logo} alt='Logo Netflix' priority className='h-12 w-auto' />
          </picture>
        </nav>

        <section className='flex justify-center'>
          <article className='bg-black bg-opacity-90 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>{isVariantLogin ? 'Sign in' : 'Register'}</h2>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              {variant === 'register' && <Input label='Username' id='name' type='text' />}

              <Input label='Email' id='email' type='email' />

              <Input label='Password' id='password' type='password' />

              <input
                type='submit'
                value={isVariantLogin ? 'Login' : 'Sign up'}
                className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-colors'
              />
            </form>

            <div className='flex items-center gap-4 justify-center mt-8'>
              <button
                type='button'
                className='w-10 h-10 bg-white rounded-full flex justify-center items-center hover:opacity-80 transition-opacity p-2'
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                <GoogleIcon />
              </button>

              <button
                type='button'
                className='w-10 h-10 bg-white rounded-full flex justify-center items-center hover:opacity-80 transition-opacity p-2'
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <GithubIcon />
              </button>
            </div>

            <p className='text-neutral-500 mt-12'>
              {isVariantLogin ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                {isVariantLogin ? 'Create an account' : 'Login'}
              </span>
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}
