import { useForm } from 'react-hook-form'
import Button from './Button'
import auth from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useState } from 'react'
import Logo from './Logo'
import { MdErrorOutline } from 'react-icons/md'


function SignUp() {
  const { handleSubmit, register } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("");
  const submit = async (input) => {
    if (input.password === input["re-password"]) {
      try {
        const user = await auth.signUp({
          name: input.name,
          email: input.email,
          password: input.password
        })
        if(user){
          const session = await auth.login()
          if(session){
            const userData = await auth.getUser();
            dispatch(login(userData))
            navigate('/')
          }
        }
      } catch (error) {
        console.log(`SingUp :: Submit :: ${error}`)
        setError(error.message)
      }
    }
    else {
      setError(`Re-Enter the Password Correctly`)
    }
  }
  return (
    <div className='max-w-200 flex flex-col items-center'>
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <label className="flex flex-col text-sm font-medium">
          Name
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
          Password
          <input
            type="password"
            placeholder="Enter Your Password"
            {...register("password", { required: true })}
            className="border px-2 py-1 rounded"
          />
        </label>

        <label className="flex flex-col text-sm font-medium">
          Re-enter Password
          <input
            type="password"
            placeholder="Enter Password Again"
            {...register("re-password", { required: true })}
            className="border px-2 py-1 rounded"
          />
        </label>

        <Button type="submit" className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default SignUp
