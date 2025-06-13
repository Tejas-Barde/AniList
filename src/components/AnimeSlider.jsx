import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useSelector } from 'react-redux';

const AnimeSlider = ({
  autoPlay = true,
  autoPlayInterval = 5000,
  showSpotlight = true,
  onWatchClick = () => { },
  onDetailClick = () => { },
}) => {
  let animeData = useSelector(state => state.anime.trendingList);
  animeData = animeData.slice(0, 10);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || animeData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % animeData.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, animeData.length]);

  const currentAnime = animeData[currentSlide];

  const getImageUrl = anime =>
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    anime.images?.webp?.large_image_url ||
    anime.images?.webp?.image_url ||
    'https://via.placeholder.com/400x600/1a1a2e/ffffff?text=No+Image';

  const goToSlide = index => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % animeData.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + animeData.length) % animeData.length);

  const handleWatchClick = anime => onWatchClick(anime);
  const handleDetailClick = anime => onDetailClick(anime);

  if (!currentAnime) return null;

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-[#201f31]">
      {/* Right-side image with gradient fade */}
      <div className="absolute inset-0 flex justify-end">
        <div className="w-full max-w-[800px] h-full relative z-0">
          <img
            src={getImageUrl(currentAnime)}
            alt={currentAnime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#201f31]/80 to-[#201f31]" />
        </div>
      </div>

      {/* Left overlay content */}
      <div className={`relative z-10 h-full flex ${isMobile ? 'items-end pb-6' : 'items-center'} px-6 lg:px-12`}>
        <div className={isMobile ? 'max-w-full' : 'max-w-2xl text-white'}>
          {/* Spotlight */}
          {showSpotlight && currentAnime.rank && currentAnime.rank <= 10 && (
            <div className={`text-pink-400 font-bold text-sm ${isMobile ? 'mb-3' : 'mb-4'}`}>
              #{currentAnime.rank} Spotlight
            </div>
          )}

          {/* Title */}
          <h1 className={`font-bold leading-tight text-white ${isMobile ? 'text-2xl mb-3' : 'text-4xl lg:text-6xl mb-4'}`}>
            {currentAnime.title_english || currentAnime.title || 'Untitled'}
          </h1>

          {/* Metadata pills */}
          <div className="flex items-center gap-3 mb-4 flex-wrap text-sm text-white">
            {currentAnime.type && (
              <span className="px-2 py-1 bg-gray-800/80 border border-gray-600 text-xs font-semibold rounded">
                {currentAnime.type}
              </span>
            )}
            {currentAnime.episodes && <span>{currentAnime.episodes} episodes</span>}
            {currentAnime.duration && <span>{currentAnime.duration}</span>}
            {currentAnime.year && <span>{currentAnime.year}</span>}
            {currentAnime.score && (
              <span className="px-2 py-1 text-white text-xs font-bold rounded flex items-center gap-1">
                <span className="text-yellow-300">★</span> {currentAnime.score}
              </span>
            )}
            {currentAnime.rating && (
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                {currentAnime.rating.replace('PG-13 - ', '')}
              </span>
            )}
            {currentAnime.status && (
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  currentAnime.status === 'Currently Airing'
                    ? 'bg-red-500'
                    : currentAnime.status === 'Finished Airing'
                    ? 'bg-gray-500'
                    : 'bg-yellow-500'
                }`}
              >
                {currentAnime.status.replace(' Airing', '')}
              </span>
            )}
          </div>

          {/* Synopsis */}
          {!isMobile && currentAnime.synopsis && (
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
              {currentAnime.synopsis.length > 250
                ? currentAnime.synopsis.slice(0, 250) + '...'
                : currentAnime.synopsis}
            </p>
          )}

          {/* Buttons */}
          <div className={`flex ${isMobile ? 'gap-2' : 'gap-4'}`}>
            <button
              onClick={() => handleWatchClick(currentAnime)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(autoPlay)}
              className={`flex items-center gap-2 bg-pink-500 hover:bg-pink-600 rounded-full font-bold text-white transition-all duration-200 hover:scale-105 ${isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3'}`}
            >
              <Play className={`fill-white ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              Watch Now
            </button>
            <button
              onClick={() => handleDetailClick(currentAnime)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(autoPlay)}
              className={`cursor-pointer bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-semibold transition-all duration-200 ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}
            >
              Detail
            </button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {/* {!isMobile && animeData.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute right-4 top-[90%] -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-4 rounded-full border border-white/30 hover:border-white/50 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-[80%] -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-4 rounded-full border border-white/30 hover:border-white/50 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )} */}

      {/* Dots */}
      {animeData.length > 1 && (
        <div
          className={`absolute z-20 flex gap-2 ${isMobile ? 'bottom-4 right-4' : 'bottom-8 left-1/2 -translate-x-1/2'}`}
        >
          {animeData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(autoPlay)}
              className={`cursor-pointer rounded-full transition-all duration-300 border-2 ${
                isMobile ? 'w-2 h-2' : 'w-4 h-4'
              } ${
                index === currentSlide
                  ? 'bg-pink-500 border-pink-500 scale-110'
                  : 'bg-transparent border-white/60 hover:border-white hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeSlider;
