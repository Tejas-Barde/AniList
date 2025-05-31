import { useParams } from 'react-router-dom';
import CardList from './CardList';
import { useEffect, useState } from 'react';
import { Carousel } from '@material-tailwind/react';
import TrendingLayout from './TrendingLayout';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  console.log(`just before calling trending`)
  return (
    <div className='flex flex-col gap-4 h-full'>
      <h1 className='font-bold'>#Trending</h1>
      <TrendingLayout>
        <CardList/>
      </TrendingLayout>
    </div>
  )
}

export default Home;

