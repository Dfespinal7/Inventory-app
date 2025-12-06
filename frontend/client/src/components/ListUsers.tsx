import { useEffect, useState } from "react"
export type UserProps = {
  id: number
  name: string
  email: string
  role: string
}
export default function ListUsers() {
  const [listUsers, setListUsers] = useState<UserProps[] | null>(null)
  const [filtrados, setFiltrados] = useState<UserProps[] | null>(null)
  const [buscador,setBuscador]=useState('')

  const getAllUsers = async () => {
    const result = await fetch('http://localhost:5000/users')
    const data = await result.json()
    setFiltrados(data)
    setListUsers(data)
  }
  const handleBuscador=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setBuscador(e.target.value)
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  useEffect(()=>{
    if(!listUsers){
      setFiltrados(null)
      return;
    }
    const searchh=buscador.toLowerCase()
    setFiltrados(listUsers.filter(u=>u.name.toLowerCase().includes(searchh)||u.email.toLowerCase().includes(searchh)))
  },[buscador,listUsers])
  return (
    <div className="h-[50%]  w-[80%] bg-white rounded-xl shadow-xl flex flex-col justify-start py-5 items-center gap-2">
      <input onChange={handleBuscador} type="text" placeholder="Ingrese nombre o email del usuario" className="px-2 py-1 rounded-lg border-gray-500 border" />
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold sticky top-0">
            <tr>
              <th className="px-4 py-3 text-center">id</th>
              <th className="px-4 py-3 text-center">name</th>
              <th className="px-4 py-3 text-center">email</th>
              <th className="px-4 py-3 text-center">role</th>
            </tr>
          </thead>
          <tbody>
            {
              filtrados?.map(u => (
                <tr key={u.id} className="border-b last:border-none even:bg-sky-50 hover:bg-sky-100 transition">
                  <td className="px-4 py-2 text-center"> {u.id}</td>
                  <td className="px-4 py-2 text-center"> {u.name}</td>
                  <td className="px-4 py-2 text-center"> {u.email}</td>
                  <td className="px-4 py-2 text-center"> {u.role}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
