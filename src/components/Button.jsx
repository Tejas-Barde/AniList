
function Button({
  children=null,  
  className="",
  ...props
}) {
  return (
    <button className={`${className} cursor-pointer`} {...props}>
      {children}
    </button>
  )
}

export default Button
