import React from 'react'
import Login from '../components/Login'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  if(authStatus) navigate('/') 
  return (
    <div className='relative min-h-screen flex items-center justify-center'>
      <div className='absolute inset-0 bg-[url("/src/assets/anime_background.png")] bg-cover bg-center z-0' />
      <div className='absolute inset-0 bg-black opacity-60 z-0' />

      <div className='relative z-10 min-w-100'>
        <Login />
      </div>
    </div>
  )
}

export default LoginPage
