import React from 'react'

function Button({
  children=null,  
  className="",
  ...props
}) {
  return (
    <button className={`${className}`}>
      {children}
    </button>
  )
}

export default Button
