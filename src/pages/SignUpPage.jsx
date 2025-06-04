import React from 'react'
import SignUp from '../components/SignUp'

function SignUpPage() {
  return (
    <div className='relative min-h-screen flex items-center justify-center'>
      <div className='absolute inset-0 bg-[url("/src/assets/anime_background.png")] bg-cover bg-center z-0' />
      <div className='absolute inset-0 bg-black opacity-60 z-0' />

      <div className='relative z-10 min-w-100'>
        <SignUp />
      </div>
    </div>
  )
}

export default SignUpPage
