import { type Movie } from '@prisma/client'
import { InfoIcon } from '../atoms'

interface Props {
  randomMovie: Movie
}

export function BillBoard({ randomMovie }: Props) {
  return (
    <section className='relative'>
      <video
        className='w-full h-[60vw] md:h-[48vw] lg:h-[42vw] object-cover brightness-50 object-center'
        poster={randomMovie.thumbnailUrl}
        src={randomMovie.videoUrl}
        autoPlay
        muted
        loop
      ></video>

      <div className='absolute top-1/3 md:top-[50%] md:-translate-y-1/2 left-4 md:left-16 right-0'>
        <h1 className='text-white text-xl md:text-5xl h-full w-1/2 lg:text-6xl font-bold drop-shadow-xl'>
          {randomMovie.title}
        </h1>
        <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-5/6 md:w-4/5 lg:w-1/2 drop-shadow-xl'>
          {randomMovie.description}
        </p>

        <button
          type='button'
          className='flex items-center mt-3 md:mt-4 gap-2 bg-white/30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold hover:bg-white/20 transition-colors'
        >
          <i className='w-5'>
            <InfoIcon />
          </i>
          More Info
        </button>
      </div>
    </section>
  )
}
