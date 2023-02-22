import { Movie } from '@/typings'
import Image from 'next/image'
import React from 'react'

type Props = {
    movie: Movie
}

function Thumbnail({movie}: Props) {
  return (
    <main className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'>
        <Image 
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path || movie?.poster_path}`}
            alt='movie thumbnail'
            fill
            className='rounded-sm object-contain md:rounded'
        />
    </main>
  )
}

export default Thumbnail