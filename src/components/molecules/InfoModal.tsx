import { useModalStore } from '@/store'
import { CloseIcon } from '../atoms'
import { PlayButton, FavoriteButton } from '../atoms'

export function InfoModal() {
  const { isOpen, closeModal, movie } = useModalStore(({ isOpen, closeModal, movie }) => ({
    isOpen,
    closeModal,
    movie
  }))

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLDivElement
    if (el.id === 'modal') {
      closeModal()
    }
  }

  return (
    <div
      id='modal'
      onClick={(e) => handleClick(e)}
      className={`z-50 transition-all duration-300 bg-black/80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
        <div
          className={`${isOpen ? 'scale-100' : 'scale-0'} transform duration-300 relative bg-zinc-900 drop-shadow-md`}
        >
          <div className='relative h-96'>
            <video
              className='w-full brightness-75 object-cover h-full'
              src={movie?.videoUrl}
              poster={movie?.thumbnailUrl}
              autoPlay
              muted
              loop
            />

            <button
              onClick={closeModal}
              className='absolute top-3 right-3 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center p-2 text-white'
            >
              <CloseIcon />
            </button>

            <div className='absolute bottom-[10%] left-10'>
              <h2 className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>{movie?.title}</h2>

              <div className='flex gap-4 items-center'>
                <div onClick={closeModal}>
                  <PlayButton id={movie?.id || ''} />
                </div>
                {movie && <FavoriteButton movie={movie} />}
              </div>
            </div>
          </div>
          <div className='px-12 py-8'>
            <p className='text-green-400 font-semibold text-lg'>New</p>
            <p className='text-white text-lg'>{movie?.duration}</p>
            <p className='text-white text-lg'>{movie?.genre}</p>
            <p className='text-white text-lg'>{movie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
