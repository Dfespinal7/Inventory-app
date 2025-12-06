
export default function AdminListUsers() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col px-5 py-2 gap-2">
        <div className="h-[10%] rounded-lg bg-white shadow-lg flex items-center px-4 justify-between">
            <div>
                <h1 className="font-bold text-2xl">👥 Gestion de Usuarios</h1>
                <span className="text-gray-400 text-sm">Administra y gestiona los usuarios del sistema</span>
            </div>
            <button className="bg-sky-300 px-2 py-1 rounded-md text-white font-bold cursor-pointer hover:scale-105 transition-all duration-500">Nuevo Usuario</button>
        </div>
    </div>
  )
}
