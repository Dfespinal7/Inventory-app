import { createContext, useContext, useState, type ReactNode } from "react";
import { type AlertProps } from "../components/Alert";
import { useNavigate } from "react-router-dom";
type ContextCreatedProps={
    user:string
    userLogin:LoginProps
    handleInputLogin:(e:React.ChangeEvent<HTMLInputElement>)=>void
    handleClickLogin:(e:React.FormEvent<HTMLFormElement>)=>void
    alert:boolean
    messageAlert:AlertProps|undefined
    logout:()=>void
}
type ChildrenProps={
    children:ReactNode
}

type LoginProps={
    email:string
    password:string
}

const ContextCreated=createContext<ContextCreatedProps|undefined>(undefined)

export const getContext=()=>{
    const context=useContext(ContextCreated)
    if(!context) throw new Error('Error al obtener el contexto')
    return context
}


export function AuthContext({children}:ChildrenProps){
    const [userLogin,setUserLogin]=useState<LoginProps>({email:'',password:''})
    const [alert,setAlert]=useState(false)
    const [messageAlert,setMessageAlert]=useState<AlertProps|undefined>(undefined)

    const navigate=useNavigate()

     const handleInputLogin=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setUserLogin({...userLogin,[name]:value})
    }
    const handleClickLogin=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const result=await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(userLogin),
            credentials:'include'
        })
        const data=await result.json()
        if(!result.ok){
            setAlert(true)
            setMessageAlert({style:'bg-red-200 text-red-500 p-1 rounded lg my-2',description:data.message})
            if(data.message==='Contraseña incorrecta'){
                setUserLogin({...userLogin,password:''})
            }else{
                setUserLogin({email:'',password:''})
            }
            setTimeout(()=>{
                setAlert(false)
            },2000)
            return;
        }
        setAlert(true)
        setUserLogin({email:'',password:''})
        setMessageAlert({style:'bg-green-200 text-green-500 p-1 rounded lg my-2',description:data.message})
        const typeUser=data.userLog.role
        const route = typeUser.toLowerCase() === "admin" ? "/admin-login/index" : "/user-login";
        setTimeout(() => setAlert(false), 1500);
        setTimeout(() => navigate(route), 1500);
    }
    const logout=async()=>{
    if(window.confirm('Seguro que desea cerrar sesión?')){
      const result=await fetch('http://localhost:5000/logout',{
      method:'POST',
      credentials:'include'
    })
    const data=await result.json()
    console.log(data)
    navigate('/login')
    }
  }
    return(
        <ContextCreated.Provider value={{user:'Daniel',userLogin,handleInputLogin,handleClickLogin,alert,messageAlert,logout}}>
            {children}
        </ContextCreated.Provider>
    )   
}