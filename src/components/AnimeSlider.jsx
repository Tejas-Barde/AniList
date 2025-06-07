import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AnimeSlider = ({ 
  autoPlay = true, 
  autoPlayInterval = 5000,
  showSpotlight = true,
  onWatchClick = () => {},
  onDetailClick = () => {}
}) => {
  let animeData = useSelector(state => state.anime.trendingList)
  animeData = animeData.slice(0, 10);   
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-play functionality
 useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || animeData.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % animeData.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, animeData.length]);

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % animeData.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + animeData.length) % animeData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleWatchClick = (anime) => {
    onWatchClick(anime);
  };

  const handleDetailClick = (anime) => {
    onDetailClick(anime);
  };

  if (!animeData || animeData.length === 0) {
    return <div className="h-[400px] md:h-[600px] bg-gray-900 flex items-center justify-center">
      <p className="text-white">No anime data available</p>
    </div>;
  }

  const currentAnime = animeData[currentSlide];

  const getImageUrl = (anime) => {
    return anime.images?.jpg?.large_image_url || 
           anime.images?.jpg?.image_url || 
           anime.images?.webp?.large_image_url || 
           anime.images?.webp?.image_url || 
           'https://via.placeholder.com/400x600/1a1a2e/ffffff?text=No+Image';
  };

  return (
    <div className="relative w-full">
      <div className={`relative overflow-hidden w-full ${isMobile ? 'h-[500px]' : 'h-[600px]'}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${getImageUrl(currentAnime)})` 
          }}
        >
          <div className={`absolute inset-0 ${
            isMobile 
              ? 'bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30' 
              : 'bg-gradient-to-r from-black/90 via-black/70 to-black/30'
          }`} />
          {!isMobile && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />}
        </div>

        <div className="relative z-10 h-full flex items-end md:items-center">
          <div className={`w-full ${isMobile ? 'px-4 pb-6' : 'px-6 lg:px-12'}`}>
            <div className={isMobile ? 'max-w-full' : 'max-w-2xl'}>
              {showSpotlight && currentAnime.rank && currentAnime.rank <= 10 && (
                <div className={`flex items-center gap-2 ${isMobile ? 'mb-3' : 'mb-6'}`}>
                  <span className={`text-pink-400 font-bold ${isMobile ? 'text-sm' : 'text-sm'}`}>
                    #{currentAnime.rank} Spotlight
                  </span>
                </div>
              )}
              
              <h1 className={`font-bold leading-tight text-white ${
                isMobile 
                  ? 'text-2xl mb-3' 
                  : 'text-5xl lg:text-7xl mb-6'
              }`}>
                {currentAnime.title_english || currentAnime.title || 'Untitled'}
              </h1>
              
              {isMobile ? (
                <div className="flex items-center gap-2 mb-4 text-xs">
                  {currentAnime.type && (
                    <span className="px-2 py-1 bg-gray-800/80 border border-gray-600 text-white font-semibold rounded">
                      {currentAnime.type}
                    </span>
                  )}
                  {currentAnime.episodes && (
                    <span className="text-gray-300">{currentAnime.episodes} eps</span>
                  )}
                  {currentAnime.year && (
                    <span className="text-gray-300">{currentAnime.year}</span>
                  )}
                  {currentAnime.score && (
                    <span className="px-2 py-1 bg-green-500 text-white font-bold rounded flex items-center gap-1">
                      <span className="text-yellow-300">★</span> {currentAnime.score}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-4 flex-wrap text-sm">
                  {currentAnime.type && (
                    <span className="px-2 py-1 bg-gray-800/80 border border-gray-600 text-white text-xs font-semibold rounded">
                      {currentAnime.type}
                    </span>
                  )}
                  {currentAnime.episodes && (
                    <span className="text-white font-medium">{currentAnime.episodes} episodes</span>
                  )}
                  {currentAnime.duration && (
                    <span className="text-white font-medium">{currentAnime.duration}</span>
                  )}
                  {currentAnime.year && (
                    <span className="text-white font-medium">{currentAnime.year}</span>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {currentAnime.score && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded flex items-center gap-1">
                        <span className="text-yellow-300">★</span> {currentAnime.score}
                      </span>
                    )}
                    {currentAnime.rating && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                        {currentAnime.rating.replace('PG-13 - ', '')}
                      </span>
                    )}
                    {currentAnime.status && (
                      <span className={`px-2 py-1 text-white text-xs font-semibold rounded ${
                        currentAnime.status === 'Currently Airing' ? 'bg-red-500' : 
                        currentAnime.status === 'Finished Airing' ? 'bg-gray-500' : 'bg-yellow-500'
                      }`}>
                        {currentAnime.status.replace(' Airing', '')}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {currentAnime.synopsis && !isMobile && (
                <p className="text-gray-200 text-base leading-relaxed mb-8 max-w-2xl">
                  {currentAnime.synopsis.length > 250 
                    ? currentAnime.synopsis.substring(0, 250) + '...' 
                    : currentAnime.synopsis}
                </p>
              )}
              
              <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                <button 
                  onClick={() => handleWatchClick(currentAnime)}
                  className={`flex items-center gap-2 bg-pink-500 hover:bg-pink-600 rounded-full font-bold text-white transition-all duration-200 transform hover:scale-105 ${
                    isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3'
                  }`}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(autoPlay)}
                >
                  <Play className={`fill-white ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  Watch Now
                </button>
                <Link>
                
                </Link>
                <button 
                  onClick={() => handleDetailClick(currentAnime)}
                  className={`flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600/80 border border-gray-600 rounded-full font-semibold text-white transition-all duration-200 ${
                    isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'
                  }`}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(autoPlay)}
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        {!isMobile && animeData.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute right-8 top-[65%] -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-4 rounded-full transition-all duration-200 border border-white/30 hover:border-white/50 cursor-pointer"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(autoPlay)}
              type="button"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-8 top-[50%] -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-4 rounded-full transition-all duration-200 border border-white/30 hover:border-white/50 cursor-pointer"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(autoPlay)}
              type="button"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {animeData.length > 1 && (
          <div className={`absolute left-1/2 -translate-x-1/2 z-20 flex gap-2 ${
            isMobile ? 'right-4 left-auto translate-x-0 bottom-4' : 'bottom-8'
          }`}>
            {animeData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 border-2 ${
                  isMobile ? 'w-2 h-2' : 'w-4 h-4'
                } ${
                  index === currentSlide 
                    ? 'bg-pink-500 border-pink-500 scale-110' 
                    : 'bg-transparent border-white/60 hover:border-white hover:bg-white/20'
                }`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(autoPlay)}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeSlider;