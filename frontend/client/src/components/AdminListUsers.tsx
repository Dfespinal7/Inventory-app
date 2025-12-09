import { useEffect, useState } from "react"
import type { UserProps } from "./AdminProtectedRoute"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
//crear funcion de buscar usuario
export default function AdminListUsers() {
  const [allUsers, setAllUsers] = useState<UserProps[]>([])
  const getAllusers = async () => {
    const result = await fetch('http://localhost:5000/users', {
      credentials: 'include'
    })
    const data = await result.json()
    setAllUsers(data)
  }
  useEffect(() => {
    getAllusers()
  }, [])
  return (
    <div className="bg-gray-100 h-[90%] flex flex-col px-5 py-2 gap-2.5">
      <div className="h-[10%] rounded-lg bg-white shadow-lg flex items-center px-4 justify-between">
        <div>
          <h1 className="font-bold text-2xl">👥 Gestion de Usuarios</h1>
          <span className="text-gray-400 text-sm">Administra y gestiona los usuarios del sistema</span>
        </div>
        <button className="bg-sky-300 px-2 py-1 rounded-md text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500">Nuevo Usuario</button>
      </div>
      <div className=" h-[18%] flex items-center px-4 gap-2">
        <div className="border size-30 bg-white rounded-lg shadow-lg border-gray-300 flex justify-center items-center flex-col">
          <h1 className="font-bold text-xl text-blue-400">{allUsers.length}</h1>
          <span className="font-light text-gray-400">Total</span>
        </div>
        <div className="border size-30 bg-white rounded-lg shadow-lg border-gray-300 flex justify-center items-center flex-col">
          <h1 className="font-bold text-xl text-green-400">Por definir</h1>
          <span className="font-light text-gray-400">Activos</span>
        </div>
        <div className="border size-30 bg-white rounded-lg shadow-lg border-gray-300 flex justify-center items-center flex-col">
          <h1 className="font-bold text-xl text-red-500">Por definir</h1>
          <span className="font-light text-gray-400">Inactivos</span>
        </div>
        <input type="text" className="border p-2 w-[60%] rounded-lg border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Buscar por nombre o email" />
      </div>
      <div className=" h-[60%] flex justify-center items-center w-full">
        <div className="overflow-auto w-full flex justify-center">
          <table className=" w-[80%] rounded-t-xl border border-gray-400">
            <thead className="text-white uppercase rounded-t-xl cursor-pointer" >
              <tr>
                <th className="bg-blue-400 p-1.5">Foto</th>
                <th className="bg-blue-400 p-1.5">Usuario</th>
                <th className="bg-blue-400 p-1.5">Email</th>
                <th className="bg-blue-400 p-1.5">Rol</th>
                <th className="bg-blue-400 p-1.5">Contacto</th>
                <th className="bg-blue-400 p-1.5">Estado</th>
                <th className="bg-blue-400 p-1.5">Accion</th>
              </tr>
            </thead>
            <tbody>
              {
                allUsers.map(u => (
                  <tr key={u.id} className="border-b border-gray-200 bg-white text-gray-500 cursor-pointer">
                    <td className="p-1.5 text-center">Sin foto</td>
                    <td className="p-1.5 text-center">{u.name}</td>
                    <td className="p-1.5 text-center">{u.name}</td>
                    <td className="p-1.5 text-center"><span className={u.role.toLowerCase() === 'admin' ? 'bg-green-200 p-1 rounded-lg text-green-500 font-bold uppercase text-sm' : 'bg-yellow-200 p-1 rounded-lg text-yellow-500 font-bold uppercase text-sm'}>{u.role}</span></td>
                    <td className="p-1.5 text-center">Sin contacto aun</td>
                    <td className="p-1.5 text-center">Sin estado aun</td>
                    <td className="p-1.5 text-center flex justify-center gap-2 text-white">
                      <button className="bg-sky-500 p-1 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer"><PencilIcon className="size-5"></PencilIcon></button>
                      <button className="bg-red-500 p-1 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer"><TrashIcon className="size-5"></TrashIcon></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
