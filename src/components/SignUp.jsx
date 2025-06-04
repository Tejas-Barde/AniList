import { useForm } from 'react-hook-form'
import auth from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useState } from 'react'
import { FaLock, FaMailBulk, FaUser } from 'react-icons/fa'

function SignUp() {
  const { handleSubmit, register } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")

  const submit = async (input) => {
    if (input.password === input["re-password"]) {
      try {
        const user = await auth.signUp({
          name: input.name,
          email: input.email,
          password: input.password
        })
        console.log(`Sign Up :: Submit :: user :: ${user}`)
        if (user) {
          const session = await auth.login({
            email: input.email,
            password: input.password
          })

          console.log("Sign Up :: Session ::", session)

          if (session) {
            const userData = await auth.getUser()
            dispatch(login(userData))
            navigate('/')
          }
        }
      } catch (error) {
        console.log("SignUp :: Submit ::", error)
        setError(error.message || "Something went wrong during signup.")
      }
    } else {
      setError("Re-Enter the Password Correctly")
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-sm w-full text-white">
      <h2 className="text-3xl font-bold text-center mb-6">SignUp</h2>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
            className="w-full pl-10 pr-3 py-2 rounded-full bg-white/20 placeholder-white/80 text-white focus:outline-none"
          />
        </div>

        <div className="relative">
          <FaMailBulk className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="email"
            placeholder="Enter Email"
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

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="password"
            placeholder="Re-Enter the Password"
            {...register("re-password", { required: true })}
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

        <button
          type="submit"
          className="bg-white text-purple-700 font-bold py-2 rounded-full hover:bg-purple-200 transition"
        >
          SignUp
        </button>
      </form>
    </div>
  )
}

export default SignUp
