import { useEffect, useState, type ReactNode } from "react"

type AdminProps={
    children:ReactNode
}
export type  UserProps={
    id:number
    name:string
    email:string
    role:string
    isactivate?:boolean|undefined
    numberphone?:string
}
export default function AdminProtectedRoute({children}:AdminProps) {
    const [user,setUser]=useState<UserProps|null>(null)
    const getUser=async()=>{
        const result=await fetch('http://localhost:5000/profile',{
            credentials:'include'
        })
        const data=await result.json()
        setUser(data)
    }
    useEffect(()=>{
       getUser() 
    },[])
    if(!user||user.role.toLowerCase()!=='admin'){
        return(
            <div>
                Advertencia:usuario sin permiso para acceder a esta pagina
            </div>
        )
    }
    return children
}
