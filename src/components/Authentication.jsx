import React from 'react'
import { useForm } from 'react-hook-form'


function Authentication() {
  const { handleSubmit, register } = useForm()
  const submit = (input) => {
    console.log(input)
    
  }
  return (
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

      <button type="submit" className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
        Submit
      </button>
    </form>

  )
}

export default Authentication
