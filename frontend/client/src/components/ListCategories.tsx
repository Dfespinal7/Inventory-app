import React, { useEffect, useState } from "react"
export type CategoriesProps={
    id:number
    name:string
    description:string
}
export default function ListCategories() {
    const [allCategories,setAllCategories]=useState<CategoriesProps[]|null>(null)
    const [allFiltrados,setAllFiltrados]=useState<CategoriesProps[]|null>(null)
    const [buscador,setBuscador]=useState('')

    const getAllCategories=async()=>{
        const result=await fetch('http://localhost:5000/categories',{
            credentials:'include'
        })
        const data=await result.json()
        setAllCategories(data)
    }
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target
        setBuscador(value)
    }
    const apllySearch=()=>{
        if(!allCategories){
            setAllFiltrados(null)
            return;
        }
        const searchFinal=buscador.toLowerCase()
        setAllFiltrados(allCategories.filter(c=>c.name.includes(searchFinal)))
    }
    useEffect(()=>{
        apllySearch()
    },[buscador,allCategories])
    useEffect(()=>{
        getAllCategories()
    },[])
  return (
    <div className="h-[40%] w-[80%] bg-white rounded-xl flex flex-col justify-start items-center shadow-xl gap-2 py-2">
        <input onChange={handleInputChange} type="text" placeholder="Ingrese nombre de la categoria" className="px-2 py-2 rounded-lg border border-gray-400 text-gray-400" />
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="text-gray-700 min-w-full text-sm">
            <thead className="uppercase font-semibold sticky top-0 bg-gray-100 text-gray-700 text-xs ">
                <tr>
                    <td className="px-4 py-3 text-center">id</td>
                    <td className="px-4 py-3 text-center">name</td>
                    <td className="px-4 py-3 text-center">description</td>
                </tr>
            </thead>
            <tbody>
                {
                    allFiltrados?.map(c=>(
                        <tr key={c.id} className="border-b last:border-none even:bg-sky-50 hover:bg-sky-100 transition">
                            <td className="px-4 py-2 text-center">{c.id}</td>
                            <td className="px-4 py-2 text-center">{c.name}</td>
                            <td className="px-4 py-2 text-center">{c.description}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}
