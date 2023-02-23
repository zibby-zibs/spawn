import React, { useState, createContext, useContext, useEffect, useMemo } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth'
import { useRouter } from 'next/router';
import { auth } from '../firebase'


interface Iauth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: ()=> Promise<void>
    error: string | null
    setError: React.Dispatch<React.SetStateAction<string>>
    loading: boolean
}
const AuthContext = createContext<Iauth>({} as Iauth) 

type Props = {
    children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter();

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            //the user exists and is logged in
            if (user) {
                setUser(user)
                setLoading(false)

                //not logged in
            } else {
                setUser(null)
                setLoading(true)
                router.push("/login")
            }

            setInitialLoading(false)
        })
    }, [auth])

    const signUp = async(email:string, password:string)=>{
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>{
            setUser(userCredential.user)
            router.push("/")
            setLoading(false)
        }).catch((error)=>{
            if (error.code=== "auth/email-already-in-use"){
                setError("This email is assigned to an account")  
            } else if (error.message === "auth/email-already-exists"){
                setError("Email already exists")
            } else if (error.message === "auth/internal-error"){
                setError("something went wrong, try again")
            } else if (error.message === "auth/invalid-email"){
                setError("Use a proper email")
            } else if (error.message === "auth/invalid-password") {
                setError("Your password must be atleast six characters")
            } else if (error.message === "auth/user-not-found") {
                setError("User not found")
            }
        })
        .finally(()=> setLoading(false))
    }
    const signIn = async(email:string, password:string)=>{
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) =>{
            setUser(userCredential.user)
            router.push("/")
            setLoading(false)
        })
        .catch((error)=>{
            if (error.code=== "auth/email-already-in-use"){
                setError("This email is assigned to an account")  
            } else if (error.message === "auth/email-already-exists"){
                setError("Email already exists")
            } else if (error.message === "auth/internal-error"){
                setError("something went wrong, try again")
            } else if (error.message === "auth/invalid-email"){
                setError("Use a proper email")
            } else if (error.message === "auth/invalid-password") {
                setError("Your password must be atleast six characters")
            } else if (error.message === "auth/user-not-found") {
                setError("User not found")
            }
        })
        .finally(()=> setLoading(false))
    }

    const logout = async ()=>{
        setLoading(true)

        signOut(auth).then(()=> {
            setUser(null)
        })
        .catch((error)=> alert(error.message))
        .finally(()=> setLoading(false))
    }

    // const memoValue = useMemo(()=> ({
    //     user, signUp, signIn, loading, logout, error,    }), [user, loading])

  return (
    <AuthContext.Provider value={{
        user, signUp, signIn, loading, logout, error,
        setError
    }}>
    {!initialLoading && children}
  </AuthContext.Provider>
  )
}

export default function useAuth(){
    return useContext(AuthContext)
}
