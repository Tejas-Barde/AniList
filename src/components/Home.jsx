import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { useSelector } from 'react-redux';
import TrendingLayout from './TrendingLayout';
import AnimeSlider from './AnimeSlider';
import CardList from './CardList';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const handleWatchClick = (anime) => {
    console.log('Watch clicked for:', anime.title);
  };

  const handleDetailClick = (anime) => {
    console.log('Detail clicked for:', anime.title);
    navigate(`/search/${anime.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Poppins']">
      {/* Full Width Featured Carousel Section - No heading, no padding */}
      <TrendingLayout>
        <AnimeSlider 
          autoPlay={true}
          autoPlayInterval={5000}
          showSpotlight={true}
          onWatchClick={handleWatchClick}
          onDetailClick={handleDetailClick}
        />
      </TrendingLayout>

      <div className="">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 pl-6 pt-6">
            <div className="w-1 h-6 bg-red-500 rounded-sm" />
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide ">
              Trending Now
            </h1>
          </div>
        </div>
        <CardList className='justify-around'/>
      </div>
    </div>
  );
};

export default Home;