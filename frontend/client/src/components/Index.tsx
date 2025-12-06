import { Link } from "react-router-dom"

export default function Index() {
  
  return (
    <div className="w-[80%] h-[60%] bg-white rounded-lg grid grid-cols-4 p-4 gap-4">
      <div className="rounded-xl bg-gray-100 cursor-pointer hover:scale-103 transition-all duration-500 shadow-lg flex justify-center items-center font-semibold text-gray-700"><Link to={'/user-login/products'}>Ver Productos</Link></div>
      <div className="rounded-xl bg-gray-100 cursor-pointer hover:scale-103 transition-all duration-500 shadow-lg flex justify-center items-center font-semibold text-gray-700"><Link to={'/user-login/users'}>Ver Usuarios</Link></div>
      <div className="rounded-xl bg-gray-100 cursor-pointer hover:scale-103 transition-all duration-500 shadow-lg flex justify-center items-center font-semibold text-gray-700"><Link to={'/user-login/movements'}>Ver Movimientos</Link></div>
      <div className="rounded-xl bg-gray-100 cursor-pointer hover:scale-103 transition-all duration-500 shadow-lg flex justify-center items-center font-semibold text-gray-700"><Link to={'/user-login/categories'}>Ver Categorias</Link></div>
    </div>
  )
}
