import React from 'react'
import { BeatLoader } from 'react-spinners'

function Loader() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
      <h1>Loading</h1>
      <BeatLoader
      />
    </div>
  )
}

export default Loader
