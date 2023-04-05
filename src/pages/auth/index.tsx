import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@/components/atoms'

import logo from '~/images/logo.webp'

type Variant = 'login' | 'register'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState<Variant>('login')

  const toggleVariant = () => {
    setVariant((currVatiant) => (currVatiant === 'login' ? 'register' : 'login'))
  }

  const isVariantLogin = variant === 'login'

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

            <form className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  label='Email'
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  id='email'
                  value={email}
                  type='email'
                />
              )}

              <Input
                label='Username'
                onChange={(e) => setName(e.currentTarget.value)}
                id='name'
                value={name}
                type='text'
              />

              <Input
                label='Password'
                onChange={(e) => setPassword(e.currentTarget.value)}
                id='password'
                value={password}
                type='password'
              />

              <input
                type='submit'
                value={isVariantLogin ? 'Login' : 'Sign up'}
                className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-colors'
              />

              <p className='text-neutral-500 mt-12'>
                {isVariantLogin ? 'First time using Netflix?' : 'Already have an account?'}
                <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                  {isVariantLogin ? 'Create an account' : 'Login'}
                </span>
              </p>
            </form>
          </article>
        </section>
      </div>
    </main>
  )
}
