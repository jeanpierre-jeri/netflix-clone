import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BellIcon, ChevronDownIcon, NavbarItem, SearchIcon } from '../atoms'
import { AccountMenu, MobileMenu } from '../molecules'

import { MENU } from '@/constants'
import logo from '~/images/logo.webp'
import redUserImage from '~/images/default-red.webp'

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setShowMobileMenu((prevShow) => !prevShow)
  }

  const toggleAccountMenu = () => {
    setShowAccountMenu((prevShow) => !prevShow)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setShowBackground(!entries[0].isIntersecting)
      },
      { rootMargin: '-1px' }
    )

    const ref = topRef.current as HTMLDivElement

    observer.observe(ref)

    return () => {
      observer.unobserve(ref)
    }
  }, [])

  return (
    <>
      <div ref={topRef} className='absolute top-16 left-0 right-0 h-px'></div>
      <header className='fixed z-40 w-full'>
        <div
          className={`px-4 md:px-16 py-6 flex items-center transition-colors duration-500 ${
            showBackground ? 'bg-zinc-900/90' : 'bg-transparent'
          }`}
        >
          <Link href='/'>
            <Image
              src={logo}
              alt='Logo Netflix'
              className='h-4 lg:h-7 w-auto'
              placeholder='blur'
              blurDataURL='/images/logo.webp'
            />
          </Link>

          <nav>
            <ul className='ml-8 gap-7 hidden lg:flex'>
              {MENU.map((name, i) => (
                <NavbarItem key={i}>{name}</NavbarItem>
              ))}
            </ul>
          </nav>

          <div className='lg:hidden relative ml-8'>
            <button type='button' className=' flex items-center gap-2' onClick={toggleMobileMenu}>
              <p className='text-white text-sm'>Browse</p>
              <div className={`w-4 text-white transition-all ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
              </div>
            </button>
            <MobileMenu visible={showMobileMenu} />
          </div>

          <div className='flex ml-auto gap-5 items-center'>
            <button type='button' className='text-gray-200 hover:text-gray-300 transition-colors w-5'>
              <SearchIcon />
            </button>

            <button type='button' className='text-gray-200 hover:text-gray-300 transition-colors w-5'>
              <BellIcon />
            </button>

            <div className='relative'>
              <button className='flex items-center gap-2' onClick={toggleAccountMenu}>
                <Image
                  src={redUserImage}
                  alt='User Image'
                  className='aspect-square w-6 lg:w-10 rounded-md overflow-hidden'
                />
                <div className={`w-4 text-white transition-all ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDownIcon />
                </div>
              </button>
              <AccountMenu visible={showAccountMenu} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
