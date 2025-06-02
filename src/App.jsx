import './App.css'
import { Outlet } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { useEffect, useState } from 'react';
import auth from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import service from './appwrite/service';
import { fillUserList } from './store/animeSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    try {
      auth.getUser()
        .then(async (user)=>{
          if(user){
            dispatch(login(user));
            const response = await service.getAnimeList({userId : user.$id})
            // console.log(`App :: Promise ::`)
            // console.log(promise)
            console.log(`App :: Promise :: response `)
            console.log(response)
            dispatch(fillUserList(response))
          }
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
      <main className='w-full min-h-screen max-h-fit'>
        <Outlet/>
      </main>
      <FooterComponent/>
    </div>
  )
}

export default App
