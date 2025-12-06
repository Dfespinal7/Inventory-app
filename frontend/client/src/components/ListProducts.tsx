import { useEffect, useState } from "react"
export type ProductsProps = {
    id: number
    name: string
    description: string
    category_id: number
    stock: number,
    unit_price: string
}
type CategoryProps={
    id:number
    name:string
    description:string
}
export default function ListProducts() {
    const [products, setProducts] = useState<ProductsProps[] | null>(null)
    const [filtrados, setFiltrados] = useState<ProductsProps[] | null>(null)
    const [categories,setCategories]=useState<CategoryProps[]|null>(null)
    const [buscador, setBuscador] = useState<string>('')
    const [totalStock,setTotalStock]=useState(0)

    const getAllProducts = async () => {
        const result = await fetch('http://localhost:5000/products', {
            credentials: 'include'
        })
        const data = await result.json()
        setProducts(data)
        setFiltrados(data)
    }
    const getAllCategories=async()=>{
        const result=await fetch('http://localhost:5000/categories',{
            credentials:'include'
        })
        const data=await result.json()
        setCategories(data)
    }
    const handleBuscador = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscador(e.target.value)
    }
    const sumStock=()=>{
        const suma=products?.reduce((acc,p)=>acc+p.stock* Number(p.unit_price),0)
        setTotalStock(suma??0)
        console.log('suma',suma)
    }
    useEffect(() => {
        getAllProducts()
        getAllCategories()
        sumStock()
    }, [])
    useEffect(()=>{
        sumStock()
    },[products])
    useEffect(() => {
        console.log(buscador)
        if (!products) {
            setFiltrados(null);
            return;
        }
        const resultado = products?.filter(p => p.name.toLocaleLowerCase().includes(buscador.toLocaleLowerCase()))
        setFiltrados(resultado)
    }, [buscador, products])
    return (
        <div className="h-[50%]  w-[80%] bg-white rounded-xl shadow-xl flex flex-col justify-start py-3 items-center gap-2">
            <div className=" w-full px-20 flex justify-between items-center">
                <input onChange={handleBuscador} type="text" placeholder="Buscar Producto" className="border px-2 py-1 rounded-lg border-gray-300 text-gray-600" />
                <p className="font-bold text-blue-700">Total:${totalStock.toLocaleString('es-CL')}</p>
            </div>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full text-sm text-gray-700">

                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold sticky top-0">
                        <tr>
                            <th className="px-4 py-3 text-center">ID</th>
                            <th className="px-4 py-3 text-center">Name</th>
                            <th className="px-4 py-3 text-center">Description</th>
                            <th className="px-4 py-3 text-center">Category</th>
                            <th className="px-4 py-3 text-center">Stock</th>
                            <th className="px-4 py-3 text-center">Unit Price</th>
                            <th className="px-4 py-3 text-center">Total stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtrados?.map((p) => (
                            <tr
                                key={p.id}
                                className="border-b last:border-none even:bg-sky-50 hover:bg-sky-100 transition"
                            >
                                <td className="px-4 py-2 text-center">{p.id}</td>
                                <td className="px-4 py-2 text-center">{p.name}</td>
                                <td className="px-4 py-2 text-center">{p.description}</td>
                                <td className="px-4 py-2 text-center">{categories?.find(c => c.id === p.category_id)?.name || 'Sin categoría'}</td>
                                <td className="px-4 py-2 text-center">{p.stock}</td>
                                <td className="px-4 py-2 text-right">
                                    ${Number(p.unit_price).toLocaleString('es-CL')}
                                </td>
                                <td className="px-4 py-2 text-center"> ${(p.stock * Number(p.unit_price)).toLocaleString('es-CL')}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
