import { useEffect, useState } from "react"
import type { ProductsProps } from "./ListProducts"
import type { CategoriesProps } from "./ListCategories"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"

export default function AdminListProducts() {
    const [allProducts, setAllProducts] = useState<ProductsProps[]>([])
    const [filtrados, setFiltrados] = useState<ProductsProps[]>([])
    const [allcartegorias, setAllCategorias] = useState<CategoriesProps[]>([])
    const [buscador,setBuscador]=useState('')
    const getAllProducts = async () => {
        const result = await fetch('http://localhost:5000/products', {
            credentials: 'include'
        })
        const data = await result.json()
        setAllProducts(data)
        setFiltrados(data)
    }
    const handleBuscador=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target
        setBuscador(value)
    }
    const getAllCategories = async () => {
        const response = await fetch('http://localhost:5000/categories', {
            credentials: 'include'
        })
        const data = await response.json()
        setAllCategorias(data)
    }
    const handleFilterSearch=()=>{
        const busqueda=buscador.toLowerCase()
        const category_name=allcartegorias.filter(cat=>cat.name.toLowerCase().includes(busqueda)).map(cat=>cat.id)
        const response=allProducts.filter(p=>p.name.toLowerCase().includes(busqueda)||category_name.includes(p.category_id))
        setFiltrados(response)
    }
    useEffect(()=>{
        handleFilterSearch()
    },[buscador,allProducts])
    useEffect(() => {
        getAllCategories()
        getAllProducts()
    }, [])
    return (
        <div className=" h-[90%] bg-gray-100 flex flex-col justify-start items-center gap-2 px-4 py-2">
            <div className="border-l-4 border-teal-400 shadow-md h-[12%] w-full flex justify-between items-center px-5 rounded-lg">
                <input onChange={handleBuscador} type="text" placeholder="Buscar Producto" className="border px-2 py-1 rounded-md w-[50%] border-gray-300" />
                <div className="flex gap-2">
                    <div className="border size-15 flex flex-col justify-center items-center">div</div>
                    <div className="border size-15 flex flex-col justify-center items-center">div</div>
                    <div className="border size-15 flex flex-col justify-center items-center">div</div>
                    
                </div>
            </div>
            <table>
                <thead className="uppercase text-white">
                    <tr>
                        <th className="bg-blue-400 p-2">Nombre</th>
                        <th className="bg-blue-400 p-2">DESCRIPCION</th>
                        <th className="bg-blue-400 p-2">CATEGORIA</th>
                        <th className="bg-blue-400 p-2">STOCK</th>
                        <th className="bg-blue-400 p-2">PRECIO POR UNIDAD</th>
                        <th className="bg-blue-400 p-2">TOTAL</th>
                        <th className="bg-blue-400 p-2">ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtrados.map(p => (
                            <tr key={p.id} className="border-b border-gray-200 bg-white text-gray-500 cursor-pointer">
                                <td className="p-1.5 text-center" >{p.name}</td>
                                <td className="p-1.5 text-center text-sm">{p.description}</td>
                                <td className="p-1.5 text-center"><span className="bg-sky-200 p-0.5 rounded-lg border text-sky-700 font-semibold uppercase">{allcartegorias.find(c => c.id === p.category_id)?.name || 'sin categoria'}</span></td>
                                <td className="p-1.5 text-center"><span className="font-bold text-teal-400">${Number(p.unit_price).toLocaleString('es-CL')}</span></td>
                                <td className="p-1.5 text-center"><span className={p.stock > 10 ? 'font-bold text-teal-400' : 'font-bold text-red-400'}>{p.stock}</span></td>
                                <td className="p-1.5 text-center"><span className="font-bold text-amber-300">${(Number(p.stock) * Number(p.unit_price)).toLocaleString('es-CL')}</span></td>
                                <td className="p-1.5 flex gap-1 justify-center items-center">
                                    <button className="bg-sky-500 p-1 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer text-white"><PencilIcon className="h-5 w-5"></PencilIcon></button>
                                    <button className="bg-red-500 p-1 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer text-white"><TrashIcon className="h-5 w-5"></TrashIcon></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
