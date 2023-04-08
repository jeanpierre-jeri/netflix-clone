import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import redUserImage from '~/images/default-red.webp'

interface Props {
  visible: boolean
}

export function AccountMenu({ visible }: Props) {
  const { data: session } = useSession()

  return (
    <div
      className={`${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-200 bg-black w-56 top-14 right-0 py-5 flex flex-col border-2 border-gray-800 absolute`}
    >
      <div className='flex flex-col gap-3'>
        <div className='px-3 group/item flex gap-3 items-center'>
          <Image src={redUserImage} alt='Image User' className='w-8 rounded-md' />

          <p className='text-white text-sm group-hover/item:underline'>{session?.user?.name}</p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-4' />

        <button type='button' className='px-3 text-center text-white text-sm hover:underline' onClick={() => signOut()}>
          Sign out of Netflix
        </button>
      </div>
    </div>
  )
}
