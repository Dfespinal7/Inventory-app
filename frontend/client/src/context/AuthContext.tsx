import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
type ContextCreatedProps = {
    user: string
    userLogin: LoginProps
    handleInputLogin: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClickLogin: (e: React.FormEvent<HTMLFormElement>) => void
    logout: () => void
}
type ChildrenProps = {
    children: ReactNode
}

type LoginProps = {
    email: string
    password: string
}

const ContextCreated = createContext<ContextCreatedProps | undefined>(undefined)

export const getContext = () => {
    const context = useContext(ContextCreated)
    if (!context) throw new Error('Error al obtener el contexto')
    return context
}


export function AuthContext({ children }: ChildrenProps) {
    const [userLogin, setUserLogin] = useState<LoginProps>({ email: '', password: '' })

    const navigate = useNavigate()

    const handleInputLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserLogin({ ...userLogin, [name]: value })
    }
    const handleClickLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userLogin),
            credentials: 'include'
        })
        const data = await result.json()
        if (!result.ok) {
            const message = data.message
            Swal.fire({
                title: "Error!",
                text: message,
                icon: 'error',
                timer:1500,
                showConfirmButton: false
            })
            if (data.message === 'Contraseña incorrecta') {
                setUserLogin({ ...userLogin, password: '' })
            } else {
                setUserLogin({ email: '', password: '' })
            }
            return;
        }
        setUserLogin({ email: '', password: '' })
        Swal.fire({
            title:data.message,
            icon:"success",
            timer:1500,
            showConfirmButton:false
        })
        const typeUser = data.userLog.role
        const route = typeUser.toLowerCase() === "admin" ? "/admin-login/index" : "/user-login";
        setTimeout(() => navigate(route), 1500);
    }
    const logout = async () => {
        const result = await Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Se cerrará tu sesión actual',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include'
            })

            const data = await response.json()
            console.log(data)

            Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Has cerrado sesión correctamente',
                timer: 1500,
                showConfirmButton: false
            })

            navigate('/login')
        }
    }
    return (
        <ContextCreated.Provider value={{ user: 'Daniel', userLogin, handleInputLogin, handleClickLogin, logout }}>
            {children}
        </ContextCreated.Provider>
    )
}