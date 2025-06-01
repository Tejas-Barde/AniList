import './App.css'
import { Outlet } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { useEffect, useState } from 'react';
import auth from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { BiLogoGit } from 'react-icons/bi';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    try {
      auth.getUser()
        .then(response=>{
          if(response) dispatch(login(response));
          else dispatch(logout());
        })
        .finally(()=>{
          setLoading(false)
        })
    } catch (error) {
      console.log(`App :: ${error}`);
    } 
  },[])  

  return loading ? (<div>Loading</div>) : (
    <div className='h-full w-full bg-blue-950'>
      <HeaderComponent/>
      <main className='w-full h-full'>
        <Outlet/>
      </main>
      <FooterComponent/>
    </div>
  )
}

export default App
