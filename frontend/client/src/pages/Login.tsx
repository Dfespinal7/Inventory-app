import { Link } from 'react-router-dom'
import { getContext } from '../context/AuthContext'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/16/solid'

export default function Login() {
  const { handleInputLogin, handleClickLogin, userLogin } = getContext()

  return (
    <div className='bg-gray-200 h-screen flex flex-col justify-center items-center gap-2'>
      <div className='h-75 w-100 py-8 px-12 flex flex-col justify-center items-center gap-2 bg-white/50 rounded-xl shadow-lg'>
        <span className='size-12 bg-gray-200 flex justify-center items-center rounded-xl shadow-lg'><ArrowRightEndOnRectangleIcon className='size-9'></ArrowRightEndOnRectangleIcon></span>
        <h1 className='font-bold text-2xl'>Sign in with Email</h1>
        <form action="" onSubmit={handleClickLogin} className=' h-[60%] w-full flex flex-col gap-3'>
          <input onChange={handleInputLogin} name='email' value={userLogin.email} type="text" placeholder='Enter your email' className='w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm' />
          <input onChange={handleInputLogin} name='password' value={userLogin.password} type="text" placeholder='Enter your password' className='w-full px-2 py-1 border border-gray-200 rounded-lg shadow-sm' />
          <button className='bg-slate-800 font-bold text-white px-2 py-1 rounded-lg cursor-pointer hover:scale-105 transition-all duration-500'>Get started</button>
        </form>
      </div>
      <span>Do you have an Account? <Link to={'/register'} className='text-blue-400'>Click on me</Link></span>
    </div>
  )
}
