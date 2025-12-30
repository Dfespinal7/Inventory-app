import {  CubeIcon, HomeIcon, UserIcon,ArrowsRightLeftIcon,TagIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { getContext } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import type { UserProps } from '../components/AdminProtectedRoute';
import { Link, Outlet } from 'react-router-dom';
export default function AdminDashboard() {
  const{logout}=getContext()
  const [userLog,setUserLog]=useState<UserProps|null>(null)
  const getInfoadmin=async()=>{
    const result=await fetch('http://localhost:5000/profile',{
      credentials:'include'
    })
    const data=await result.json()
    setUserLog(data)
  }
  useEffect(()=>{
    getInfoadmin()
  },[])
  return (
    <div className="border h-screen flex ">
      <div className=" w-[18%] bg-slate-800 text-white flex flex-col justify-start">
        <div className="border-b h-[10%] border-0.5 flex justify-center items-center border-white/10">
          <div className="flex gap-2">
            <span>👓</span>
            <div>
              <h1 className="text-2xl font-bold">Óptica tu vision</h1>
              <span className="text-sm font-light text-gray-100">Panel</span>
            </div>
          </div>

        </div>
        <div className=" h-[70%]">
          <ul className="flex flex-col justify-start py-5 px-8 gap-2 h-full">
            <Link to={'/admin-login/index'}><li className="flex gap-2 font-semibold hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1 hover:scale-105 transition-all duration-500"><span><HomeIcon className='size-5'></HomeIcon></span>Inicio</li></Link>
            <Link to={'/admin-login/users'}><li className="flex gap-2 font-semibold hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1 hover:scale-105 transition-all duration-500"><span><UserIcon className='size-5'></UserIcon></span>Usuarios</li></Link>
            <Link to={'/admin-login/products'}> <li className="flex gap-2 font-semibold hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1 hover:scale-105 transition-all duration-500"><span><CubeIcon className='size-5'></CubeIcon></span>Productos</li></Link>
            <li className="flex gap-2 font-semibold hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1 hover:scale-105 transition-all duration-500"><span><ArrowsRightLeftIcon className='size-5'></ArrowsRightLeftIcon ></span>Movimientos</li>
            <li className="flex gap-2 font-semibold hover:bg-white/10 cursor-pointer rounded-lg px-2 py-1 hover:scale-105 transition-all duration-500"><span><TagIcon className='size-5'></TagIcon ></span>Categorias</li>
            <li></li>
          </ul>
        </div>
        <div className='border-t h-[10%] border-0.5 flex justify-center items-center border-white/10'>
          <div onClick={logout} className=' w-full flex justify-start px-4 h-15 items-center text-red-500 bg-red-500/10 cursor-pointer font-bold hover:scale-105 transition-all duration-500' ><span><ArrowLeftStartOnRectangleIcon className='size-5'></ArrowLeftStartOnRectangleIcon></span>Logout</div>
        </div>
      </div>
      <div className="border w-[82%]">
        <div className=" h-[10%] px-5 shadow-md flex justify-between py-1">
          <h1 className='font-bold text-xl'>Dashboard Principal</h1>
          <div className=' w-40 h-10 bg-sky-100 rounded-b-lg flex gap-2 px-1 items-center py-2'>
            <div className='border size-7 rounded-full border-sky-800 shadow-sm'></div>
              <div className=''>
                <h1 className='font-semibold'>{userLog?.name}</h1>
                <span className='font-extralight text-sm'>{userLog?.role.toLocaleLowerCase()==='admin'?'Administrador':''}</span>
              </div>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
