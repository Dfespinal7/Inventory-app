import { useEffect, useState } from "react"
import {type MovementsProps } from "./ListMovemements"
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid"
import {type UserProps } from "./AdminProtectedRoute"
import {type ProductsProps } from "./ListProducts"


export default function AdminListMovimientos() {
    const [allMovements,setAllMovements]=useState<MovementsProps[]>([])
    const [allUsers,setAllUsers]=useState<UserProps[]>([])
    const [allFiltrados,setAllFiltrados]=useState<MovementsProps[]>([])
    const [allProducts,setAllProducts]=useState<ProductsProps[]>([])
    const getAllMovements=async()=>{
        const response=await fetch('http://localhost:5000/movements',{
            method:'GET',
            credentials:'include'
        })
        const data=await response.json()
        setAllMovements(data)
        setAllFiltrados(data)
    }
    const getAllusers=async()=>{
        const response=await fetch('http://localhost:5000/users',{
            credentials:'include'
        })
        const data=await response.json()
        setAllUsers(data)
    }
    const getAllProducts=async()=>{
        const response=await fetch('http://localhost:5000/products',{
            credentials:'include'
        })
        const data=await response.json()
        setAllProducts(data)
    }
    useEffect(()=>{
        getAllMovements()
        getAllusers()
        getAllProducts()
    },[])
  return (
    <div className='bg-gray-200 h-[90%] flex flex-col justify-center items-center py-2 px-4'>
        <div className='h-[55%] w-full overflow-auto'>
            <table className='min-w-[800px] w-full md:w-[80%] mx-auto  border-gray-300 table-auto'>
                <thead className='font bold uppercase bg-blue-400 text-white sticky top-0 z-10'>
                    <tr >
                        <th className='p-2'>Producto</th>
                        <th>tipo de moviemiento</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allFiltrados.map(m=>(
                            <tr key={m.id} className="border-b text-gray-400 bg-white cursor-pointer">
                                <td className="p-1.5 text-center">{allProducts.find(p=>p.id===m.product_id)?.name}</td>
                                <td className="p-1.5 text-center">{m.type}</td>
                                <td className="p-1.5 text-center">{m.quantity}</td>
                                <td className="p-1.5 text-center">{m.date?new Date(m.date).toLocaleDateString('es-CL'):'Sin fecha registrada'}</td>
                                <td className="p-1.5 text-center">{allUsers.find(u=>u.id===m.user_id)?.name||"sin usuario"}</td>
                                <td className="flex p-1.5 justify-center items-center gap-1">
                                    <button className="bg-sky-500 font-bold text-white p-1 rounded-lg cursor-pointer hover:scale-105 transition-all duration-500"><PencilIcon className="size-5"></PencilIcon></button>
                                    <button className="bg-red-500 font-bold text-white p-1 rounded-lg cursor-pointer hover:scale-105 transition-all duration-500"><TrashIcon className="size-5"></TrashIcon></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
