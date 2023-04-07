import type { PropsWithChildren } from 'react'

export function NavbarItem({ children }: PropsWithChildren) {
  return <li className='text-white cursor-pointer hover:text-gray-300 transition-colors'>{children}</li>
}
