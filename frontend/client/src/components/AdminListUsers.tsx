import { useEffect, useState } from "react";
import type { UserProps } from "./AdminProtectedRoute";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

type UserCompletedProps = Omit<UserProps, 'id'> & {
  password: string
  isactivate: boolean | undefined
}

//crear funcion para editar contraseña desde el admin y recuperar contraseña desde el user
// continuar e iniciar con el apartado de productos, listar,editar,crear,deliminar
export default function AdminListUsers() {
  const [allUsers, setAllUsers] = useState<UserProps[]>([]);
  const [filtrados, setFiltrados] = useState<UserProps[]>([]);
  const [buscador, setBuscador] = useState("");
  const [usersActivate, setUsersActivate] = useState<number>(0)
  const [usersDesactivate, setUserDesactivate] = useState<number>(0)
  const [newUser, setNewUser] = useState<UserCompletedProps>()

  const getAllusers = async () => {
    const result = await fetch("http://localhost:5000/users", {
      credentials: "include",
    });
    const data = await result.json();
    setAllUsers(data);
    setFiltrados(data);
  };

  const formCreateUser = () => {
    Swal.fire({
      title: 'Añadir usuario',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      html: `
      <div class="flex flex-col justify-center items-center gap-4">
        <div class="">
          <input placeholder="Ingrese nombre" class="swal2-input" id="name">
          <input placeholder="Ingrese email" class="swal2-input" id="email">
          <input placeholder="Ingrese password" class="swal2-input" id="password">
          <input placeholder="Ingrese teléfono" class="swal2-input" id="telefono">
        </div>
        <div class=" w-70 flex justify-between px-1">
          <label class="text-gray-400">Rol del usuario</label>
          <select class="border p-1 border-gray-200 rounded-lg text-gray-400" id="rol">
            <option value="">Seleccionar</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div class="  w-70 flex justify-between px-1">
          <label class="text-gray-400">Activo</label>
          <input type="checkbox"  checked="true" class="size-7 rounded-lg cursor-pointer" id="estado">
        </div>
      </div>
      `,
      preConfirm: () => {
        const nameInput = document.getElementById('name') as HTMLInputElement | null
        const emailInput = document.getElementById('email') as HTMLInputElement | null
        const passwordInput = document.getElementById('password') as HTMLInputElement | null
        const telefonoInput = document.getElementById('telefono') as HTMLInputElement | null
        const rolInput = document.getElementById('rol') as HTMLInputElement | null
        const estadoInput = document.getElementById('estado') as HTMLInputElement | null
        const name = nameInput?.value.trim()
        const email = emailInput?.value.trim()
        const password = passwordInput?.value.trim()
        const numberphone = telefonoInput?.value.trim()
        const isactivate = estadoInput?.checked
        const role = rolInput?.value.trim()
        if (!name || !email || !password || !role) {
          Swal.showValidationMessage('Debe ingresar todos los campos')
          return false
        }
        const user={ name, email, password, numberphone, isactivate, role }
        setNewUser(user)
        return user
      }
    }).then(async(result) => {
      if (result.isConfirmed) {
        const userPost=result.value
        const response=await fetch('http://localhost:5000/admin/register',{
          method:'POST',
          credentials:'include',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify(userPost)
        })
        const data=await response.json()
        if(response.status!==200){
          Swal.fire({
            icon:'error',
            title:'Error al crear usuario',
            text:data.message,
            showConfirmButton:false,
            timer:2000
          })
          console.log(newUser)
          return;
        }
        setFiltrados([...filtrados,data.user])
        setAllUsers([...allUsers,data.user])
        Swal.fire({
          title:'Todo salió bien',
          text:data.message,
          icon:'success',
          showConfirmButton:false,
          timer:2000
        })
      }
    })
  }



  const handleFilterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget
    if (id === 'todos') {
      setFiltrados(allUsers)
    }
    else if (id === 'activos') {
      setFiltrados(allUsers.filter(u => u.isactivate === true))
    } else if (id === 'desactivados') {
      setFiltrados(allUsers.filter(u => u.isactivate !== true))
    }
  }
  const handleActivate = () => {
    const activados = allUsers.filter(u => u.isactivate === true).length
    setUsersActivate(activados)
    const desactivados = allUsers.filter(u => u.isactivate !== true).length
    setUserDesactivate(desactivados)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuscador(e.target.value);
  };

  const buttonHandleUserActivate = async (id: number) => {
    const user = allUsers.find(u => u.id === id)
    const editUser = { ...user, isactivate: !user?.isactivate }
     await fetch(`http://localhost:5000/user/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(editUser)
    })
    
    const validate = allUsers.map(u => u.id === id ? { ...u, isactivate: !u.isactivate } : u) //debemos asegurarnos de que el estado de alluser cambie tambien porque ese el pilar de filtrados, recordemos que de alli se desprende el otro
    setFiltrados(validate)
    setAllUsers(validate)
  }

  const editUser=(id:number)=>{
    console.log(id)
    const userToEdit=allUsers.find(u=>u.id===id)
    Swal.fire({
      title:'Editar Usuario',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Editar',
      html:`
        <div class=" flex flex-col gap-4 items-center py-1">
          <input placeholder="name" class="border w-70 px-2 py-2 rounded-md border-gray-200" value=${userToEdit?.name} id="name">
          <input placeholder="name" class="border w-70 px-2 py-2 rounded-md border-gray-200" value=${userToEdit?.email} id="email">
          <input placeholder="name" class="border w-70 px-2 py-2 rounded-md border-gray-200" value=${userToEdit?.numberphone} id="contacto">
            <div class=" w-70 flex justify-between px-1">
            <label class="text-gray-400">Rol del usuario</label>
            <select class="border p-1 border-gray-200 rounded-lg text-gray-400" id="rol">
              <option value="">Seleccionar</option>
              <option value="admin" ${userToEdit?.role.toLowerCase()==='admin'?'selected':''}>Admin</option>
              <option value="user" ${userToEdit?.role.toLowerCase()==='user'?'selected':''}>User</option>
            </select>
          </div>
          <div class="  w-70 flex justify-between px-1">
            <label class="text-gray-400">Activo</label>
            <input type="checkbox" ${userToEdit?.isactivate ? 'checked' : ''}  class="size-7 rounded-lg cursor-pointer" id="estado">
          </div>
        </div
      `,
      preConfirm:()=>{
        const newNameInput=document.getElementById('name')as HTMLInputElement||null
        const newEmailInput=document.getElementById('email')as HTMLInputElement||null
        const newContactoInput=document.getElementById('contacto')as HTMLInputElement||null
        const newRoleInput=document.getElementById('rol')as HTMLInputElement||null
        const newActivoInput=document.getElementById('estado')as HTMLInputElement||null
        const name=newNameInput.value.trim()
        const email=newEmailInput.value.trim()
        const role=newRoleInput.value.trim()
        const numberphone=newContactoInput.value.trim()
        const isactivate=newActivoInput.checked
        const newUserEdit={id:userToEdit?.id,name,email,role,numberphone,isactivate}
        
        if (!name || !email || !role) {
          Swal.showValidationMessage('Debe ingresar todos los campos')
          return false
        }
        return newUserEdit;
      }
    }).then(async(result)=>{
      if(result.isConfirmed){
        const userNew=result.value
        const response=await fetch(`http://localhost:5000/user/${userNew.id}`,{
          method:'PUT',
          credentials:'include',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(userNew),
        })
        const data=await response.json()
        if(!response.ok){
          Swal.fire({
            title:'Hubo un error',
            icon:'error',
            text:data.message,
            showConfirmButton:true
          })
          return;
        }
        setAllUsers(allUsers.map(u=>u.id===userNew.id?userNew:u))
        setFiltrados(filtrados.map(u=>u.id===userNew.id?userNew:u))
        Swal.fire({
          title:'Todo salió bien',
          showConfirmButton:false,
          text:data.message,
          icon:'success',
          timer:2000
        })
      }
    })
  }
  
  const handleFilters = () => {
    setFiltrados(
      allUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(buscador.toLowerCase()) ||
          u.email.toLowerCase().includes(buscador.toLowerCase())
      )
    );
  };
  const deleteUser = async (id: number) => {

    const result = await Swal.fire({
      title: 'Advertencia',
      text: 'Esta seguro que desea eliminar este usuario? se borraran todos los datos del usuario',
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      showCancelButton: true
    })
    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:5000/user/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = await response.json()
      setFiltrados(filtrados.filter(u => u.id !== id))
      setAllUsers(allUsers.filter(u => u.id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Todo salió bien',
        text: data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }

  }
  useEffect(() => {
    handleActivate()
  }, [allUsers])
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
        <button onClick={formCreateUser} className="bg-sky-300 px-2 py-1 rounded-md text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500">
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

      
        {filtrados.length === 0 ? (
          <h1 className="text-3xl text-red-300 font-semibold text-center">
            Sin resultados encontrados
          </h1>
        ) : (
          <div className="h-[55%] w-full overflow-auto">
          <table className="min-w-[800px] w-full md:w-[80%] mx-auto border border-gray-400 table-auto">
            <thead className="text-white uppercase cursor-pointer sticky top-0 z-10">
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
                      <span onClick={() => buttonHandleUserActivate(u.id)} className="bg-green-200 p-1 rounded-lg font-bold text-green-500">
                        Activo
                      </span>
                    ) : (
                      <span onClick={() => buttonHandleUserActivate(u.id)} className="bg-red-200 p-1 rounded-lg font-bold text-red-500">
                        No activo
                      </span>
                    )}
                  </td>
                  <td className="p-1.5 text-center flex justify-center gap-2 text-white">
                    <button onClick={()=>editUser(u.id)} className="bg-sky-500 p-1 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => { deleteUser(u.id) }} className="bg-red-500 p-1 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      
    </div>
  );
}
