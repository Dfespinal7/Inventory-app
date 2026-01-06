import { useEffect, useState } from "react"
import type { ProductsProps } from "./ListProducts"
import type { CategoriesProps } from "./ListCategories"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import Swal from "sweetalert2"

//crear forumlario para añadir productos
export default function AdminListProducts() {
    const [allProducts, setAllProducts] = useState<ProductsProps[]>([])
    const [filtrados, setFiltrados] = useState<ProductsProps[]>([])
    const [allCategorias, setAllCategorias] = useState<CategoriesProps[]>([])
    const [showCategorias, setShowCategorias] = useState<CategoriesProps[]>([])
    const [buscador, setBuscador] = useState('')
    const [filterSelected, setFilterSelected] = useState<string | undefined>('')
    const getAllProducts = async () => {
        const result = await fetch('http://localhost:5000/products', {
            credentials: 'include'
        })
        const data = await result.json()
        setAllProducts(data)
        setFiltrados(data)
        setFilterSelected('todos')
    }
    const openFormCreateProduct = () => {
        const optionsHtml = allCategorias
            .map(c => `<option value="${c.id}">${c.name}</option>`)
            .join('');

        Swal.fire({
            title: 'Añadir Producto',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Añadir',
            html: `
            <div class=" w-full flex flex-col justify-center items-center gap-2 p-2 rounded-2xl shadow-lg">
                <input placeholder="Nombre del producto" class="border p-1 rounded-lg w-[70%] border-gray-400 " id="name">
                <input placeholder="Descripcion del producto" class="border p-1 rounded-lg w-[70%]  border-gray-400" id="description" >
                <div class="w-[70%] flex justify-between px-1 text-gray-400">
                    <label >Seleccione categoria</label>
                    <select id="categoria" class="border rounded-lg border-gray-400">
                        <option value="">Selecione</option>
                        ${optionsHtml}
                    </select>
                </div>
                <input placeholder="Stock actual del producto" class="border p-1 rounded-lg w-[70%] border-gray-400" id="stock">
                <input placeholder="Precio por unidad" class="border p-1 rounded-lg w-[70%] border-gray-400" id="unit_price">
            </div>
            `,
            preConfirm: () => {
                const nameInput = document.getElementById('name') as HTMLInputElement || null
                const descriptionInput = document.getElementById('description') as HTMLInputElement || null
                const categoriaInput = document.getElementById('categoria') as HTMLInputElement || null
                const stockInput = document.getElementById('stock') as HTMLInputElement || null
                const priceInput = document.getElementById('unit_price') as HTMLInputElement || null

                const name = nameInput.value.trim()
                const description = descriptionInput.value.trim()
                const category_id = parseInt(categoriaInput.value)
                const stock = parseInt(stockInput.value)
                const unit_price = priceInput.value

                if (!name || !description || !category_id || !stock || !unit_price) {
                    Swal.showValidationMessage('Debe ingresar todos los campos')
                    return false
                }
                const productObj = { name, description, category_id, stock, unit_price }
                return productObj
            }
        }).then(async (result) => {
            
            if (result.isConfirmed) {
                const productToSend = result.value
                const response = await fetch('http://localhost:5000/products', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productToSend)
                })
                const data = await response.json()
                
                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return;
                }
                
                setFiltrados([...filtrados, data.producto])
                setAllProducts([...allProducts, data.producto])
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    const handleBuscador = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setBuscador(value)
    }
    const handleClickFilter = (id: number | `${string}-${string}-${string}-${string}-${string}`) => {
        const filtro = showCategorias.find(c => c.id === id)
        setFilterSelected(filtro?.name)
        if (typeof id === 'number') {
            setFiltrados(allProducts.filter(p => p.category_id === id))
        } else {
            if (filtro?.name === 'todos') {
                setFiltrados(allProducts)
            } else if (filtro?.name.toLowerCase() === 'stock bajo') {

                setFiltrados(allProducts.filter(p => p.stock <= 12))
            }
            else if (filtro?.name.toLowerCase() === 'sin stock') {

                setFiltrados(allProducts.filter(p => p.stock === 0))
            }
        }
    }
    const getAllCategories = async () => {
        const response = await fetch('http://localhost:5000/categories', {
            credentials: 'include'
        })
        const data = await response.json()
        setAllCategorias(data)
    }
    const handleFilterSearch = () => {
        const busqueda = buscador.toLowerCase()
        const category_name = allCategorias.filter(cat => cat.name.toLowerCase().includes(busqueda)).map(cat => cat.id)
        const response = allProducts.filter(p => p.name.toLowerCase().includes(busqueda) || category_name.includes(p.category_id))
        setFiltrados(response)
    }
    const addCategories = () => {
        setShowCategorias([...allCategorias, { id: crypto.randomUUID(), name: 'sin Stock', description: '' }, { id: crypto.randomUUID(), name: 'todos', description: '' }, { id: crypto.randomUUID(), name: 'stock Bajo', description: '' }])
    }

    useEffect(() => {
        handleFilterSearch()
    }, [buscador, allProducts])
    useEffect(() => {
        getAllCategories()
        getAllProducts()
    }, [])
    useEffect(() => {
        addCategories()
    }, [allCategorias])
    return (
        <div className=" h-[90%] bg-gray-100 flex flex-col justify-start items-center gap-2 px-4 py-2">
            <div className="border-l-4 border-teal-400 shadow-md h-[12%] w-full flex justify-between items-center px-5 rounded-lg">
                <input onChange={handleBuscador} type="text" placeholder="Buscar Producto" className="border px-2 py-1 rounded-md w-[50%] border-gray-300" />
                <div className="flex gap-2">
                    <div className=" size-17 flex flex-col justify-center items-center rounded-lg bg-white shadow-md">
                        <h1 className="font-bold text-blue-500">11</h1>
                        <span className="font-light text-sm text-gray-500">Total</span>
                    </div>
                    <div className=" size-17 flex flex-col justify-center items-center rounded-lg bg-white shadow-md">
                        <h1 className="font-bold text-yellow-500">11</h1>
                        <span className="font-light text-sm text-gray-500">Stock Bajo</span>
                    </div>
                    <div className=" size-17 flex flex-col justify-center items-center rounded-lg bg-white shadow-md">
                        <h1 className="font-bold text-red-500">11</h1>
                        <span className="font-light text-sm text-gray-500">Sin stock</span>
                    </div>

                </div>
            </div>
            <div className=" w-full h-[10%] grid grid-cols-8 grid-rows-2 p-1 gap-1.5 shadow-xs">
                {
                    showCategorias.map(c => (
                        <div onClick={() => handleClickFilter(c.id)} key={c.id} className={`p-2 items-center ${filterSelected === c.name ? `bg-teal-200` : `bg-white`} rounded-lg flex justify-center font-semibold text-gray-500 cursor-pointer hover:scale-102 transition-all duration-500 hover:${filterSelected === c.name ? `bg-teal-200` : `bg-gray-300`}`}>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</div>
                    ))
                }
            </div>
            <div className=" w-full h-[5%] flex justify-center items-center">
                <button onClick={openFormCreateProduct} className="bg-sky-300 px-2 py-1 rounded-lg font-bold text-white cursor-pointer hover:scale-105 transition-all duration-500">Añadir Producto</button>
            </div>
            {
                filtrados.length === 0 ?
                    <h1 className="font-bold text-2xl text-red-300">No se encontraron resultados</h1> :
                    <h1><table>
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
                                        <td className="p-1.5 text-center "><span className="w-full bg-sky-200 p-0.5 rounded-lg border text-sky-700 font-semibold uppercase">{allCategorias.find(c => c.id === p.category_id)?.name || 'sin categoria'}</span></td>
                                        <td className="p-1.5 text-center"><span className={p.stock > 12 ? 'font-bold text-teal-400' : 'font-bold text-red-400'}>{p.stock}</span></td>
                                        <td className="p-1.5 text-center"><span className="font-bold text-teal-400">${Number(p.unit_price).toLocaleString('es-CL')}</span></td>
                                        <td className="p-1.5 text-center"><span className="font-bold text-amber-300">${(Number(p.stock) * Number(p.unit_price)).toLocaleString('es-CL')}</span></td>
                                        <td className="p-1.5 flex gap-1 justify-center items-center">
                                            <button className="bg-sky-500 p-1 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer text-white"><PencilIcon className="h-5 w-5"></PencilIcon></button>
                                            <button className="bg-red-500 p-1 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer text-white"><TrashIcon className="h-5 w-5"></TrashIcon></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table></h1>
            }
        </div>
    )
}
