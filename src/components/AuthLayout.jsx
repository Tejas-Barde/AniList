import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AuthLayout({authentication = true,children}) {
  const authSatus = useSelector(state=>state.auth.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    if(authentication && authSatus !== authentication) navigate("/login")
    else if(!authentication && authSatus !== authentication) navigate("/")
    setLoading(false)
  },[authSatus,navigate,authentication])

  return loading ? 
    (<div className='h-full w-full text-shadow-red-700'>Loading</div>) 
    :
    (<div>
      {children}
    </div>)
}

export default AuthLayout
