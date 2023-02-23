import useAuth from '@/hooks/useAuth'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

type Props = {}
interface Inputs {
  email: string;
  password: string
}

function Login({}: Props) {

  const [login, setLogin] = useState(true);
  const { signIn, signUp, error, setError } = useAuth();
  const router = useRouter();


  useEffect(()=>{
    const timer = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timer);
  })

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async({email, password}) => {
    if (login) {
      await signIn(email, password)
    }
  };

  return (
    <main className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
        <Head>
            <title>Spawn</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Image 
            src="https://rb.gy/p2hphi"
            alt=""
            fill
            className='-z-10 !hidden opacity-60 sm:!inline object-cover'
        />

        <img 
          src="https://rb.gy/ulxxee" 
          alt="" 
          className='absolute left-4 top-3 cursor-pointer object-contain md:left-10 md:top-6' 
          height={150}
          width={150}
        />

        <form onSubmit={handleSubmit(onSubmit)} className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
          <h1 className='capitalize text-4xl font-semibold'>sign in <span className="text-[gray] text-sm">-welcome to spawn</span></h1>
          <div className='space-y-4'>
            <label className='inline-block w-full'>
              <input 
                type="email" 
                id="" 
                placeholder='Email'  
                className='inputForm'
                {...register("email",{required: true})}
              />
              {
                errors.email && 
                <p className='p-1 text-sm font-light text-orange-300'>This field is required</p>
              }
            </label>
            <label className='inline-block w-full'>
              <input 
                type="password" 
                id="" 
                placeholder='Password' 
                className='inputForm'
                {...register("password", {required: true})}
              />
              {
                errors.password && 
                <p className='p-1 text-sm font-light text-orange-300'>This field is required</p>
              }
            </label>
          </div>
              {error && <p className='text-red-700 '>{error}</p>}
          <button className='w-full rounded bg-[#e50914] py-3 font-semibold capitalize' 
            onClick={() => setLogin(true)}
          >
            sign in
          </button>

          <div className='text-[gray]'>
            New to Spawn? &nbsp;
            <button className='text-white hover:underline capitalize' onClick={() => {
              // setLogin(false)
              router.push("register")
            }}>sign up now</button>
          </div>
        </form>
    </main>
  )
}

export default Login