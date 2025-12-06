import { useEffect, useState } from "react"
import { type UserProps } from "./AdminProtectedRoute"
import type { ProductsProps } from "./ListProducts"
export type MovementsProps={
    id:number
    product_id:number
    type:string
    quantity:number
    date:string
    user_id:number
}
export default function ListMovemements() {
const [allMovements,setAllMovements]=useState<MovementsProps[]|null>(null)
const [filtrados,setFiltrados]=useState<MovementsProps[]|null>(null)
const [allUsers,setAllUsers]=useState<UserProps[]|null>(null)
const [allProducts,setAllProducts]=useState<ProductsProps[]|null>(null)
const [buscador,setBuscador]=useState<string>('')

const getAllMovements=async()=>{
    const result=await fetch('http://localhost:5000/movements',{
        credentials:'include'
    })
    const data=await result.json()
    setAllMovements(data)
    setFiltrados(data)
}
const handleBuscador=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value}=e.target
    setBuscador(value)
}
const applySearch=()=>{
    if(!allMovements){
        setFiltrados(null)
        return;
    }
    const search=buscador.toLowerCase()
    setFiltrados(allMovements.filter(m=>m.id.toString().toLowerCase().includes(search)))
}
const getAllUsers=async()=>{
    const result=await fetch('http://localhost:5000/users',{
        credentials:'include'
    })
    const data=await result.json()
    setAllUsers(data)
}
const getAllProducts=async()=>{
    const result=await fetch('http://localhost:5000/products',{
        credentials:'include'
    })
    const data=await result.json()
    setAllProducts(data)
}   
useEffect(()=>{
    getAllUsers()
    getAllProducts()
})
useEffect(()=>{
    getAllMovements()
},[])
useEffect(()=>{
    applySearch()
},[buscador,allMovements])
  return (
    <div className="h-[50%]  w-[80%] bg-white rounded-xl shadow-xl flex flex-col justify-start py-5 items-center gap-2">
        <input onChange={handleBuscador} type="text" placeholder="Ingrese codigo de moviemiento"  className="px-2 py-1 border border-gray-400 rounded-xl w-80"/>
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold sticky top-0">
                    <tr>
                        <th className="px-4 py-3 text-center">Codigo</th>
                        <th className="px-4 py-3 text-center">Producto</th>
                        <th className="px-4 py-3 text-center">Tipo</th>
                        <th className="px-4 py-3 text-center">cantidad</th>
                        <th className="px-4 py-3 text-center">fecha</th>
                        <th className="px-4 py-3 text-center">usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtrados?.map(m=>(
                            <tr key={m.id} className="border-b last:border-none even:bg-sky-50 hover:bg-sky-100 transition">
                                <td className="px-4 py-2 text-center">{m.id}</td>
                                <td className="px-4 py-2 text-center">{allProducts?.find(p=>p.id===m.product_id)?.name}</td>
                                <td className="px-4 py-2 text-center">{m.type}</td>
                                <td className="px-4 py-2 text-center">{m.quantity}</td>
                                <td className="px-4 py-2 text-center">{m.date?new Date(m.date).toLocaleDateString('es-ES') :'Sin registro de fecha'}</td>
                                <td className="px-4 py-2 text-center">{allUsers?.find(u=>u.id===m.user_id)?.name||'Sin usuario'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
