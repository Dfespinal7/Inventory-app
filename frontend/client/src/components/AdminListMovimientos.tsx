import React, { useEffect, useState } from "react"
import { type MovementsProps } from "./ListMovemements"
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid"
import { type UserProps } from "./AdminProtectedRoute"
import { type ProductsProps } from "./ListProducts"


export default function AdminListMovimientos() {
    const [allMovements, setAllMovements] = useState<MovementsProps[]>([])
    const [allUsers, setAllUsers] = useState<UserProps[]>([])
    const [allFiltrados, setAllFiltrados] = useState<MovementsProps[]>([])
    const [allProducts, setAllProducts] = useState<ProductsProps[]>([])
    const [buscador,setBuscador]=useState('')


    const handleChangeSearh=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target
        setBuscador(value)
    }
    const aplyFilter=()=>{
        const busqueda=buscador.toLowerCase()//pasamos buscador a minuscula
        const product_name=allProducts.filter(p=>p.name.toLowerCase().includes(busqueda)).map(pro=>pro.id)//filtramos en busqueda por medio del nombre del producto, los nombres que coincidan con la busqueda, va a guardar sus ids en un array llamado product name
        setAllFiltrados(allMovements.filter(m=>product_name.includes(m.product_id)))
    }
    const getAllMovements = async () => {
        const response = await fetch('http://localhost:5000/movements', {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json()
        setAllMovements(data)
        setAllFiltrados(data)
    }
    const getAllusers = async () => {
        const response = await fetch('http://localhost:5000/users', {
            credentials: 'include'
        })
        const data = await response.json()
        setAllUsers(data)
    }
    const getAllProducts = async () => {
        const response = await fetch('http://localhost:5000/products', {
            credentials: 'include'
        })
        const data = await response.json()
        setAllProducts(data)
    }
    useEffect(() => {
        getAllMovements()
        getAllusers()
        getAllProducts()
    }, [])
    useEffect(()=>{
        aplyFilter()
        
    },[buscador])
    return (
        <div className='bg-gray-200 h-[90%] flex flex-col justify-center items-center py-2 px-4 gap-2'>
            <div className="border w-full h-[10%] flex gap-2 justify-center items-center">
                <h1>Movimientos</h1>
                <input onChange={handleChangeSearh} type="text" placeholder="ingrese nombre del producto" />
            </div>
            <div className='h-[55%] w-full overflow-auto'>
                <table className="min-w-[800px] w-full text-sm">
                    <thead className="bg-sky-600 text-white uppercase text-xs sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left">Producto</th>
                            <th className="px-4 py-3 text-center">Movimiento</th>
                            <th className="px-4 py-3 text-center">Cantidad</th>
                            <th className="px-4 py-3 text-center">Fecha</th>
                            <th className="px-4 py-3 text-left">Usuario</th>
                            <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {allFiltrados.map(m => (
                            <tr
                                key={m.id}
                                className="hover:bg-sky-50 transition-colors even:bg-gray-50"
                            >
                                <td className="px-4 py-2 font-semibold text-sky-600">
                                    {allProducts.find(p => p.id === m.product_id)?.name}
                                </td>

                                <td className="px-4 py-2 text-center">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full 
              ${m.type.toLowerCase() === "entra"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {m.type}
                                    </span>
                                </td>

                                <td
                                    className={`px-4 py-2 text-center font-bold ${m.type.toLowerCase() === "entra"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {m.quantity}
                                </td>

                                <td className="px-4 py-2 text-center text-gray-600">
                                    {m.date
                                        ? new Date(m.date).toLocaleDateString("es-CL")
                                        : "Sin fecha"}
                                </td>

                                <td className="px-4 py-2 text-gray-700">
                                    {allUsers.find(u => u.id === m.user_id)?.name || "Sin usuario"}
                                </td>

                                <td className="px-4 py-2">
                                    <div className="flex justify-center gap-2">
                                        <button className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition">
                                            <PencilIcon className="size-4" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                                            <TrashIcon className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
