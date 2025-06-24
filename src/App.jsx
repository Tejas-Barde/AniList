import './App.css'
import { Outlet, useLocation } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { useEffect, useState } from 'react';
import auth from './appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/authSlice';
import service from './appwrite/service';
import { fillUserList } from './store/animeSlice';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation()
  const hiddenLayout = ['/login', '/signup']
  const hidden = hiddenLayout.includes(location.pathname)
  const userData = useSelector(state => state.auth.userData)
  useEffect(() => {

    try {
      auth.getUser()
        .then(async (user) => {
          if (user) dispatch(login(user));
          else dispatch(logout());
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      console.log(`App :: ${error}`);
    }
  }, [])

  useEffect(() => {
    if (!userData || !userData.$id) return;

    const fetchUserList = async () => {
      try {
        const response = await service.getAnimeList({ userId: userData.$id });
        console.log(`App :: Promise :: response `);
        console.log(response);
        dispatch(fillUserList(response));
      } catch (error) {
        console.error(`App :: Promise :: Error`, error);
      }
    };

    fetchUserList();
  }, [userData]);
  
  return loading ? (<Loader />) : (
    <div className='h-full w-full '>
      {!hidden && <HeaderComponent />}
      <main className='w-full min-h-screen max-h-fit'>
        <Outlet />
      </main>
      {!hidden && <FooterComponent />}
    </div>
  )
}

export default App
