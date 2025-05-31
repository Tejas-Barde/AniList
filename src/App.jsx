import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form';
import Home from './components/Home';
import { Outlet } from 'react-router-dom';

import { Footer } from './components/Footer/Footer';
import Header from './components/Header/header';


function App() {
  return (
    <div className='h-fit w-full bg-blue-950'>
      <Header/>
      <main className='w-full h-fit'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
