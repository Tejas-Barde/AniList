import React from 'react'

function Button({
  children=null,  
  className="",
  ...props
}) {
  return (
    <button className={`${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
