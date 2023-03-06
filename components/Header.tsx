import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsFillBellFill } from 'react-icons/bs'
import { AiOutlineClose, AiOutlinePlus} from 'react-icons/ai'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import { Genre, Movie } from '@/typings'
import MuiModal from '@mui/material/Modal'
import { FaPlay } from 'react-icons/fa'
import { BsPlusCircle, BsHandThumbsUp, BsVolumeMuteFill,  BsVolumeUpFill  } from 'react-icons/bs'
import {Element} from '../typings'
import ReactPlayer from 'react-player/lazy'
import { modalState, movieState } from '@/atoms/modalAtom'
import { useRecoilState } from 'recoil'
type Props = {}

function Header({}: Props) {

    const { logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchList, setSearchList] = useState<Movie[] | null>([]);
    const [searchIcon, setSearchIcon] = useState(true);
    const [searchModal, setSearchModal] = useRecoilState(modalState)
    const [searchMovie, setSearchMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState("")
    const [clip, setClip] = useState("")
    const [genres, setGenres] = useState<Genre[]>()
    const [muted, setMuted] = useState(false)


    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY > 0){
                setIsScrolled(true);
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    }, [isScrolled])

   
    useEffect(()=>{
        const  fetchSearch = async()=>{
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchTerm}`)
            const data = await response.json();
            setSearchList(data.results)
            console.log(searchList)
        }


        fetchSearch();
    }, [searchTerm])


  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <aside className='flex items-center space-x-2 md:space-x-10'>
            <img 
                src="https://rb.gy/ulxxee"
                className='w-24 h-24 cursor pointer object-contain'
            />

            <ul className='hidden space-x-4 md:flex'>
                <li className='headerLink'>Home</li>
                <li className='headerLink'>Tv Shows</li>
                <li className='headerLink'>movies</li>
                <li className='headerLink'>new & popular</li>
                <li className='headerLink'>my list</li>
            </ul>
        </aside>

        <aside className='flex items-center space-x-4 text-sm font-light'>
            {
                searchIcon &&
                <>
                    <p className='hidden lg:inline capitalize'>kids</p>
                    <BsFillBellFill className='h-6 w-6'/>
                    
                        <img 
                            src="https://rb.gy/g1pwyx"
                            alt="kids" 
                            className='cursor-pointer rounded'
                            onClick={logout}
                        />
                    
                </>
            }
            <div className='relative flex'>
               { !searchIcon &&  
                    <input type="text"
                        value={searchTerm} 
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        placeholder = 'Only movies, not series'
                        className ='searchInput'
                    />
                }
                
                {searchIcon ? <FiSearch className='h-6 w-6 text-red-700' onClick={()=>setSearchIcon(!searchIcon)}/> : <AiOutlineClose className='h-6 w-6' onClick={()=>setSearchIcon(!searchIcon)}/>}
                <section className='absolute left-0 top-8 bg-white text-black max-h-[40vh] overflow-y-auto rounded-b-xl scrollbar-hide drop-shadow-xl space-y-2'>
                    {      
                        !searchIcon && searchTerm?.length > 0 && 
                            searchList?.map((movie)=>{
                                return (
                                    <section 
                                        key={movie?.id}
                                        onClick={()=>{
                                            setSearchMovie(movie)
                                            setSearchModal(true)
                                            }
                                        }
                                        className='flex space-x-3 p-2 cursor-pointer'
                                    >
                                            <Image 
                                                src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path || movie?.poster_path}`}
                                                alt=""
                                                width={0}
                                                height={0}
                                                sizes='100vw'
                                                className='object-contain w-9 h-9'
                                            />
                                        <div className='flex flex-col'>
                                            <h2 className="text-sm font-semibold">Title: {movie?.title || movie?.original_name}</h2>
                                            <p>{`${movie?.overview.substring(0, 100)}...`}</p>
                                        </div>
                                    </section>
                                )
                        })
                    }
                </section>
            </div>
            
        </aside>
       
    </header>
  )
}

export default Header