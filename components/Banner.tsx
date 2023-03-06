import { Movie } from '@/typings'
import { baseUrl } from '@/utils/movie';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { BsInfoCircleFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '@/atoms/modalAtom'


type Props = {
    netflixOriginals: Movie[];
}

function Banner({netflixOriginals}: Props) {

    const [movie, setMovie] = useState<Movie | null>(null)
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    useEffect(()=>{
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals?.length)])
    }, [netflixOriginals])

  return (
    <main className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          alt=""
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
          <section className='flex space-x-3'>
              <button className='bannerButton bg-white text-black'><FaPlay className='h-4 w-4 text-black md:h-7 md:w-7'/> play</button>
              <button 
                onClick={()=>{
                  setCurrentMovie(movie)
                  setShowModal(true)
                }}
                className='bannerButton bg-[gray]/70'
              > more info <BsInfoCircleFill className='h-4 w-4 md:h-8 md:w-8'/>
              </button>
          </section>
    </main>
  )
}

export default Banner