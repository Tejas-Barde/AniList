import { useParams } from 'react-router-dom';
import CardList from './CardList';
import { useEffect, useState } from 'react';
import { Carousel } from '@material-tailwind/react';
import TrendingLayout from './TrendingLayout';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  return (
    <div className="flex flex-col gap-4 h-full px-6 py-4 text-white font-['Poppins']">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-sm" />
          <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide">Trending Now</h1>
        </div>
        {/* <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-1">
          View All <span className="text-lg">→</span>
        </a> */}
      </div>
      
      <TrendingLayout>
        <CardList />
      </TrendingLayout>
    </div>
  );
}


export default Home;

