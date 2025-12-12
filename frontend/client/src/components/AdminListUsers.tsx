import { useEffect, useState } from "react";
import type { UserProps } from "./AdminProtectedRoute";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function AdminListUsers() {
  const [allUsers, setAllUsers] = useState<UserProps[]>([]);
  const [filtrados, setFiltrados] = useState<UserProps[]>([]);
  const [buscador, setBuscador] = useState("");
  const [usersActivate,setUsersActivate]=useState<number>(0)
  const [usersDesactivate,setUserDesactivate]=useState<number>(0)

  const getAllusers = async () => {
    const result = await fetch("http://localhost:5000/users", {
      credentials: "include",
    });
    const data = await result.json();
    setAllUsers(data);
    setFiltrados(data);
  };


  const handleFilterClick=(e:React.MouseEvent<HTMLDivElement>)=>{
    const {id}=e.currentTarget
    if(id==='todos'){
      setFiltrados(allUsers)
    }
    else if(id==='activos'){
      setFiltrados(allUsers.filter(u=>u.isactivate===true))
    }else if(id==='desactivados'){
      setFiltrados(allUsers.filter(u=>u.isactivate!==true))
    }
  }
  const handleActivate=()=>{
    const activados=allUsers.filter(u=>u.isactivate===true).length
    setUsersActivate(activados)
    const desactivados=allUsers.filter(u=>u.isactivate!==true).length
    setUserDesactivate(desactivados)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuscador(e.target.value);
  };

  const handleFilters = () => {
    setFiltrados(
      allUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(buscador.toLowerCase()) ||
          u.email.toLowerCase().includes(buscador.toLowerCase())
      )
    );
  };
  useEffect(()=>{
    handleActivate()
  },[allUsers])
  useEffect(() => {
    getAllusers();
  }, []);

  useEffect(() => {
    handleFilters();
  }, [buscador, allUsers]);

  return (
    <div className="bg-gray-100 h-[90%] flex flex-col px-5 py-2 gap-2.5">
      <div className="h-[10%] rounded-lg bg-white shadow-lg flex items-center px-4 justify-between">
        <div>
          <h1 className="font-bold text-2xl">👥 Gestión de Usuarios</h1>
          <span className="text-gray-400 text-sm">
            Administra y gestiona los usuarios del sistema
          </span>
        </div>
        <button className="bg-sky-300 px-2 py-1 rounded-md text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500">
          Nuevo Usuario
        </button>
      </div>

      
      <div className="h-[18%] flex flex-wrap items-center px-4 gap-2 mb-2">
        <div onClick={handleFilterClick} id="todos" className=" cursor-pointer border size-30 bg-white rounded-lg shadow-lg border-gray-300 flex justify-center items-center flex-col">
          <h1 className="font-bold text-xl text-blue-400">{allUsers.length}</h1>
          <span className="font-light text-gray-400">Total</span>
        </div>
        <div onClick={handleFilterClick} id="activos" className="cursor-pointer border size-30 bg-white rounded-lg shadow-lg border-gray-300 flex justify-center items-center flex-col">
          <h1 className="font-bold text-xl text-green-400">{usersActivate}</h1>
          <span className="font-light text-gray-400">Activos</span>
        </div>
        <div onClick={handleFilterClick} id="desactivados" className="cursor-pointer border size-30 bg-white rounded-lg shadow-lg border-gray-300 flex justify-center items-center flex-col">
          <h1 className="font-bold text-xl text-red-500">{usersDesactivate}</h1>
          <span className="font-light text-gray-400">Inactivos</span>
        </div>
        <input
          onChange={handleSearch}
          type="text"
          className="border p-2 flex-1 min-w-[200px] rounded-lg border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Buscar por nombre o email"
        />
      </div>

      <div className="h-[55%] w-full overflow-auto">
        {filtrados.length === 0 ? (
          <h1 className="text-3xl text-red-300 font-semibold text-center">
            Sin resultados encontrados
          </h1>
        ) : (
          <table className="min-w-[800px] w-full md:w-[80%] mx-auto border border-gray-400 table-auto">
            <thead className="text-white uppercase cursor-pointer">
              <tr>
                <th className="bg-blue-400 p-2">Foto</th>
                <th className="bg-blue-400 p-2">Usuario</th>
                <th className="bg-blue-400 p-2">Email</th>
                <th className="bg-blue-400 p-2">Rol</th>
                <th className="bg-blue-400 p-2">Contacto</th>
                <th className="bg-blue-400 p-2">Estado</th>
                <th className="bg-blue-400 p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-200 bg-white text-gray-500 cursor-pointer"
                >
                  <td className="p-1.5 text-center">Sin foto</td>
                  <td className="p-1.5 text-center">{u.name}</td>
                  <td className="p-1.5 text-center">{u.email}</td>
                  <td className="p-1.5 text-center">
                    {u.role.toLowerCase() === "admin" ? (
                      <span className="bg-green-200 p-1 rounded-lg font-bold text-green-500 uppercase text-sm">
                        {u.role}
                      </span>
                    ) : (
                      <span className="bg-yellow-200 p-1 rounded-lg font-bold text-yellow-500 uppercase text-sm">
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="p-1.5 text-center">{u.numberphone}</td>
                  <td className="p-1.5 text-center">
                    {u.isactivate ? (
                      <span className="bg-green-200 p-1 rounded-lg font-bold text-green-500">
                        Activo
                      </span>
                    ) : (
                      <span className="bg-red-200 p-1 rounded-lg font-bold text-red-500">
                        No activo
                      </span>
                    )}
                  </td>
                  <td className="p-1.5 text-center flex justify-center gap-2 text-white">
                    <button className="bg-sky-500 p-1 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="bg-red-500 p-1 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
