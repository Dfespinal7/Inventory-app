import { Link } from "react-router-dom";
import { getContext } from "../context/AuthContext";

export default function RegisterPage() {
    const{handleSubmitRegister,handleInputRegister,registerUser}=getContext()
  return (
    <div className="p-8 h-screen bg-gray-300">
        <div className=" h-full flex rounded-xl bg-white ">
        <div className=" w-[50%] rounded-r-4xl rounded-l-xl flex flex-col justify-center items-center bg-slate-900 text-white">
            <h1 className="text-3xl font-bold">Create your Account!</h1>
            <p className="font-light">handle your products with our System</p>
        </div>
        <div className=" w-[50%]  flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-3xl">Sign Up</h1>
            <div className="rounded-lg border-gray-400  p-8 h-[50%] w-[50%] flex justify-center items-center">
                <form onSubmit={handleSubmitRegister} action="" className="flex flex-col gap-3 h-full w-full justify-between items-center  ">
                    <input onChange={handleInputRegister} value={registerUser.name}  name="name" type="text" placeholder="Enter your name" className="border px-2 py-1 rounded-lg border-gray-400 w-full shadow-md"/>
                    <input onChange={handleInputRegister} value={registerUser.email} name="email" type="text" placeholder="Enter your email"  className="border px-2 py-1 rounded-lg border-gray-400 w-full shadow-md"/>
                    <input onChange={handleInputRegister} value={registerUser.password} name="password" type="text" placeholder="Enter your password" className="border px-2 py-1 rounded-lg border-gray-400 w-full shadow-md" />
                    <input onChange={handleInputRegister} value={registerUser.numberphone} name="numberphone" type="text" placeholder="Enter your phone number " className="border px-2 py-1 rounded-lg border-gray-400 w-full shadow-md"/>
                    <button className=" w-full px-2 py-1 transition-all rounded-2xl bg-slate-800 text-white font-bold cursor-pointer hover:scale-105 duration-500">Join us</button>
                </form>
            </div>
            <p>Already do you have an Account? <Link to={'/login'} className="text-blue-400">Click on me</Link></p>
        </div>
    </div>
    </div>
  )
}
