import React from 'react'
import { BeatLoader } from 'react-spinners'

function Loader({className,...props}) {
  return (
    <div className={`flex flex-col items-center text-amber-100 justify-center h-screen w-screen ${className}`} {...props}>
      <h1>Loading</h1>
      <BeatLoader
      />
    </div>
  )
}

export default Loader
