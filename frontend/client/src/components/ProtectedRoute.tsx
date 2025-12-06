import { useEffect, type ReactNode } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"

type ProtectedRouteProps={
    children:ReactNode
}

export default function ProtectedRoute({children}:ProtectedRouteProps) {
  const token=Cookies.get('token')
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
        navigate('/login')
    }
  },[token,navigate])
  return children
}
