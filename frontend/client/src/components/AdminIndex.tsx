import { useEffect, useState } from "react"
import { type ProductsProps } from "./ListProducts"
import {type MovementsProps } from "./ListMovemements"
import { Link } from "react-router-dom"


export default function AdminIndex() {
  
  const [totalStock, setTotalStock] = useState(0)
  const [totalUsers,setTotalUsers]=useState(0)
  const [totalProducts,setTotalProducts]=useState(0)
  const [totalSalida,setTotalSalida]=useState(0)
  const [horaLocal,setHoraLocal]=useState<any>()
  const [allProducts,setAllProducts]=useState<ProductsProps[]>([])
  const sumStock = async () => {
    const result = await fetch('http://localhost:5000/products')
    const data = await result.json()
    const suma = data.reduce(
      (acc: number, d: { stock: number; unit_price: number }) =>
        acc + d.stock * Number(d.unit_price),
      0
    );
    setTotalStock(suma)
  }
  const sumtotalUsers=async()=>{
      const result=await fetch('http://localhost:5000/users')
      const data=await result.json()
      setTotalUsers(data.length)
      console.log(new Date().toLocaleTimeString())
  }
  const sumTotalProducts=async()=>{
    const result=await fetch('http://localhost:5000/products')
    const data=await result.json()
    setAllProducts(data)
    setTotalProducts(data.length)
  }
  const sumTotalSalida=async()=>{
    const result=await fetch('http://localhost:5000/movements')
    const movements=await result.json()
    const total=movements.reduce((acc:number,m:MovementsProps)=>{
      if(m.type.toLowerCase()==='sale'){
        const product=allProducts.find(p=>p.id===m.product_id)
        if(product){
          const unitPrice=parseFloat(product.unit_price)
          acc+=m.quantity*unitPrice
        }
      } return acc
    },0)
    setTotalSalida(total)
  }
  useEffect(() => {
    sumStock()
    sumtotalUsers()
    sumTotalProducts()
  }, [])
  useEffect(()=>{
    sumTotalSalida()
  },[allProducts])
  useEffect(()=>{
    const interval = setInterval(() => {
    setHoraLocal(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(interval); 
  },[])
  return (
    <div className=" h-[90%] flex flex-col px-2 py-2 gap-2 bg-gray-100">
      <div className=" h-[15%] bg-linear-to-br to-purple-800 via-purple-600 from-purple-700 text-white flex items-center px-5 justify-between rounded-md">
        <div>
          <h1 className="font-bold text-xl ">Bienvenido, Admin! 👋🏻</h1>
          <span className="font-light">Panel de control de tu inventario - Resumen general del {new Date().toLocaleDateString()} </span>
        </div>
        <div className=" p-2 rounded-full bg-white/15">
          {new Date().toLocaleDateString()} - {horaLocal}
        </div>
      </div>
      <div className=" w-full h-[40%] grid grid-cols-4 gap-2 px-1">
        <div className="bg-white border-l-5 border-teal-200 shadow-md rounded-xl flex justify-center flex-col px-2">
          <span className="size-10">💳</span>
          <p className="font-bold text-xl">${totalStock.toLocaleString('es-CL')}</p>
          <p className="text-gray-400 font-light">Total de inventario</p>
          <button className="border w-33 px-2 py-1 rounded-lg bg-teal-200 text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500">Ver inventario</button>
        </div>
        <div className="bg-white border-l-5 border-sky-200 shadow-md rounded-xl flex justify-center flex-col px-2">
          <span className="size-10">👥</span>
          <p className="font-bold text-xl">{totalUsers}</p>
          <p className="text-gray-400 font-light">Total de Usuarios registrados</p>
          <button className="border w-33 px-2 py-1 rounded-lg bg-sky-200 text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500"><Link to={'/admin-login/users'}>Ver Usuarios</Link></button>
        </div>
        <div className="bg-white border-l-5 border-red-200 shadow-md rounded-xl flex justify-center flex-col px-2">
          <span className="size-10">💳</span>
          <p className="font-bold text-xl">{totalProducts}</p>
          <p className="text-gray-400 font-light">Productos en stock</p>
          <button className="border w-33 px-2 py-1 rounded-lg bg-red-200 text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500">Ver inventario</button>
        </div>
        <div className="bg-white border-l-5 border-yellow-200 shadow-md rounded-xl flex justify-center flex-col px-2">
          <span className="size-10">💳</span>
          <p className="font-bold text-xl">${totalSalida.toLocaleString('es-CL')}</p>
          <p className="text-gray-400 font-light">Total salidas</p>
          <button className="border w-33 px-2 py-1 rounded-lg bg-yellow-200 text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500">Ver inventario</button>
        </div>

      </div>
    </div>
  )
}
