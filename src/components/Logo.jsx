import React from 'react'

function Logo(...props) {
  return (
    <img className='w-10 h-auto rounded-full' src='src\assets\logo.jpg'{...props} />
  )
}

export default Logo
