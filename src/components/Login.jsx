import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useState } from 'react'
import auth from '../appwrite/auth'
import { FaUser, FaLock } from 'react-icons/fa'

function Login() {
  const { handleSubmit, register } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")

  const submit = async (input) => {
    setError("")
    try {
      const session = await auth.login({ email: input.email, password: input.password })
      if (session) {
        const userData = await auth.getUser()
        if (userData) {
          dispatch(login(userData))
          navigate('/')
        }
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-sm w-full text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">

        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="email"
            placeholder="Username"
            {...register("email", { required: true })}
            className="w-full pl-10 pr-3 py-2 rounded-full bg-white/20 placeholder-white/80 text-white focus:outline-none"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full pl-10 pr-3 py-2 rounded-full bg-white/20 placeholder-white/80 text-white focus:outline-none"
          />
        </div>

        <div className="flex justify-between text-sm text-white/80">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-white" />
            Remember me
          </label>
          <span className="hover:underline cursor-pointer">Forgot password?</span>
        </div>

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button type="submit" className="bg-white text-purple-700 font-bold py-2 rounded-full hover:bg-purple-200 transition">
          Login
        </button>

        <p className="text-center text-sm text-white/80">
          Don’t have an account?&nbsp;
          <Link to="/signup" className="text-white font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
