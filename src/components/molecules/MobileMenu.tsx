import { MENU } from '@/constants'

interface Props {
  visible?: boolean
}

export function MobileMenu({ visible }: Props) {
  return (
    <nav
      className={`bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 border-gray-800 transition-opacity duration-200 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <ul className='flex flex-col gap-4'>
        {MENU.map((name, i) => (
          <li key={i} className='px-3 text-center text-white hover:underline'>
            {name}
          </li>
        ))}
      </ul>
    </nav>
  )
}
