import { useEffect, useState } from "react"
import { type UserProps } from "../components/AdminProtectedRoute"
import user from '../img/user.png'
import { Link, Outlet } from "react-router-dom"
import { getContext } from "../context/AuthContext"

export default function UserDashboar() {
  const [userLog,setUserLog]=useState<UserProps|null>(null)
  

  const{logout}=getContext()

  const getUser=async()=>{
    const result=await fetch('http://localhost:5000/profile',{
      credentials:'include'
    })
    const data=await result.json()
    setUserLog(data)
  }
  
  useEffect(()=>{
    getUser()
  },[])
  return (
    <div className="border flex h-screen">
      <div className=" w-[20%] flex flex-col items-center py-10 justify-between bg-gray-200 text-gray-700">
        <h1 className="text-3xl font-bold cursor-pointer hover:scale-105 transition-all duration-500"><Link to={'/user-login'}>Dashboard</Link></h1>
        <ul className="flex flex-col gap-3">
          <Link to={'/user-login'}><li className="cursor-pointer hover:bg-gray-300 px-2 rounded-2xl hover:scale-105 transition-all duration-500">Index</li></Link>
          <Link to={'/user-login/products'}><li className="cursor-pointer hover:bg-gray-300 px-2 rounded-2xl hover:scale-105 transition-all duration-500">Products</li></Link>
          <Link to={'/user-login/users'}><li className="cursor-pointer hover:bg-gray-300 px-2 rounded-2xl hover:scale-105 transition-all duration-500">Users</li></Link>
          <Link to={'/user-login/movements'}><li className="cursor-pointer hover:bg-gray-300 px-2 rounded-2xl hover:scale-105 transition-all duration-500">Movements</li></Link>
          <Link to={'/user-login/categories'}><li className="cursor-pointer hover:bg-gray-300 px-2 rounded-2xl hover:scale-105 transition-all duration-500">Categories</li></Link>
        </ul>
        <button onClick={logout} className="bg-red-400 p-2 rounded-lg cursor-pointer font-bold hover:scale-105 transition-all duration-500 text-white">Logout</button>
      </div>
      <div className="bg-gray-100 w-full flex flex-col items-center py-10 gap-2">
        <div className=" w-[80%] h-[40%] rounded-xl bg-white px-10 flex items-center gap-3 shadow-lg ">
          <div className="size-30 p-5 rounded-full bg-gray-100 shadow-md">
            <img src={user} alt="" className="rounded-full"/>
          </div>
          <div className="w-[80%] h-[60%] py-5 px-4 flex flex-col gap-2">
              <span className="bg-gray-200 p-2 rounded-2xl font-bold">{userLog?.name}</span>
              <span className="p-2 text-gray-400">{userLog?.email}</span>
              <span className="p-2 text-gray-400">{userLog?.role}</span>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
