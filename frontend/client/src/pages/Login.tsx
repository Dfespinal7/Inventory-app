import Alert from '../components/Alert'
import { getContext } from '../context/AuthContext'

export default function Login() {
  const { handleInputLogin, handleClickLogin, alert, messageAlert, userLogin } = getContext()

  return (
    <div className='bg-gray-200 h-screen flex flex-col justify-center items-center'>
      <div className='h-10 my-2'>
          {alert && (
            <Alert style={messageAlert?.style || 'vacio'} description={messageAlert?.description || 'vacio'}></Alert>
          )}
        </div>
      <div className='h-60 w-100 py-8 px-12 flex flex-col justify-center items-center gap-2 bg-white/50 rounded-xl shadow-lg'>
        <h1 className='text-4xl font-bold text-gray-400'>Login</h1>
        
        <form onSubmit={handleClickLogin} action="" className='flex flex-col gap-2 items-center w-full'>
          <input value={userLogin.email} onChange={handleInputLogin} name='email' type="email" placeholder='Enter your email' className='w-full border px-2 py-1 rounded-xl border-gray-400 text-gray-400 hover:scale-102 transition-all duration-500' />
          <input value={userLogin.password} onChange={handleInputLogin} name='password' type="password" placeholder='Enter your password' className='w-full border px-2 py-1 rounded-xl border-gray-400 text-gray-400 hover:scale-102 transition-all duration-500' />
          <button className=' px-2 shadow-lg py-1 rounded-lg bg-sky-600 text-white font-bold cursor-pointer  hover:scale-105 transition-all duration-500' >Login</button>
        </form>
      </div>
    </div>
  )
}
