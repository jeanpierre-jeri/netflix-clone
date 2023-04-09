import Link from 'next/link'
import { PlayIcon } from './Icons'
import { type Movie } from '@prisma/client'

type Props = Pick<Movie, 'id'>

export function PlayButton({ id }: Props) {
  return (
    <Link
      href={`/watch/${id}`}
      className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 text-xs lg:text-lg font-semibold flex items-center hover:bg-neutral-300 transition-colors'
    >
      <i className='w-7 mr-1'>
        <PlayIcon />
      </i>
      Play
    </Link>
  )
}
