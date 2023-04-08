import { type Movie } from '@prisma/client'
import Image from 'next/image'
import { PlayIcon } from '../atoms'

interface Props {
  movie: Movie
}

export function MovieCard({ movie }: Props) {
  return (
    <article className='group bg-zinc-900 relative h-[12vw]'>
      <Image
        src={movie.thumbnailUrl}
        alt={movie.title}
        width={326}
        height={173}
        className='object-cover aspect-video cursor-pointer transition-opacity duration-200 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-100 w-full h-[12vw]'
      />

      <div className='opacity-0 absolute top-0 transition-all w-full duration-200 z-10 invisible sm:visible delay-100 scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'>
        <Image
          src={movie.thumbnailUrl}
          alt={movie.title}
          width={326}
          height={173}
          className='object-cover aspect-video cursor-pointer transition-opacity duration-200 shadow-xl rounded-t-md w-full h-[12vw]'
        />
        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition-all shadow-md rounded-b-md'>
          <button className='w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition-colors hover:bg.neutral-300'>
            <PlayIcon />
          </button>

          <p className='text-green-400 font-semibold mt-4'>
            New <span>2023</span>
          </p>

          <p className='text-white text-[10px] lg:text-sm mt-4'>{movie.duration}</p>

          <p className='text-white text-[10px] lg:text-sm mt-4'>{movie.genre}</p>
        </div>
      </div>
    </article>
  )
}
