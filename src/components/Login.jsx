import { useForm } from 'react-hook-form'
import Button from './Button'
import auth from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/authSlice'
import { useState } from 'react'
import Logo from './Logo'


function Login() {
  const { handleSubmit, register } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("");
  const submit = async (input) => {
    console.log(input)
    setError("")
    try {
      const session = await auth.login({email : input.email,password : input.password})
      if (session) {
        const userData = await auth.getUser()
        console.log(`Login :: userData :: ${userData} `)
        console.log(userData)
        if (userData){
          dispatch(login(userData))
          console.log(`Login :: Inside Userdata if`)
          console.log(userData.$id)
        }
        navigate('/')
      }
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className='max-w-200 flex flex-col items-center'>
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {error && <div>Login Failed Try Again Error - {error}</div>}
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <label className="flex flex-row gap-5 text-sm font-medium flex-wrap">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
            className="border px-2 py-1 rounded"
          />
        </label>

        <label className="flex flex-col text-sm font-medium">
          Email
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
            className="border px-2 py-1 rounded"
          />
        </label>

        <label className="flex flex-col text-sm font-medium">
          Re-enter Password
          <input
            type="password"
            placeholder="Enter Password "
            {...register("password", { required: true })}
            className="border px-2 py-1 rounded"
          />
        </label>

        <Button type="submit" className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
