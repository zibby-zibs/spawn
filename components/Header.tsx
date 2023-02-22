import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsFillBellFill } from 'react-icons/bs'
import Link from 'next/link'

type Props = {}

function Header({}: Props) {

    const [isScrolled, setIsScrolled] = useState(false);

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
            <FiSearch className='hidden h-6 w-6 sm:inline '/>
            <p className='hidden lg:inline capitalize'>kids</p>
            <BsFillBellFill className='h-6 w-6'/>
            <Link href='/account'>
                <img 
                    src="https://rb.gy/g1pwyx"
                    alt="kids" 
                    className='cursor-pointer rounded'
                />
            </Link>
        </aside>
    </header>
  )
}

export default Header