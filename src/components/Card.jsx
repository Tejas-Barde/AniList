import React, { useRef, useEffect, useState } from 'react';

function Card({ anime }) {
  const imageRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(100);

  useEffect(() => {
    if (imageRef.current) {
      setImgWidth(imageRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      className="flex h-fit border-gray-800 border-[0.1px] rounded-xl text-white shadow-md overflow-hidden p-2"
      style={{  width: `305px` }}
    >
      <div className="flex-shrink-0 h-fit">
        <img
          ref={imageRef}
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="h-[200px] w-auto max-w-[130px] rounded-md object-cover"
        />
      </div>

      <div className="flex flex-col justify-between pl-3 py-1 w-full text-sm">
        <div className="flex justify-between text-[11px] text-gray-300">
          <span className="bg-gray-700 px-2 py-[2px] rounded-full">{anime.status}</span>
          <span>{anime.episodes} Eps</span>
        </div>

       <h2 className="text-[15px] font-semibold leading-tight mt-1 line-clamp-2">
          {anime.title}
        </h2>

        <div className="flex justify-between text-[13px] mt-1 text-gray-200">
          <div className="flex flex-col items-center gap-1">
            <span className="flex font-medium">
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-yellow-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
              {anime.score}
            </span>
            <div className="text-[11px] text-gray-400">{anime.scored_by}</div>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <span>#{anime.rank}</span>
            <span>Ranking</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-1 text-[11px]">
          {anime.genres.slice(0, 2).map((genre,index=1) => (
            <span
              key={genre.mal_id || index}
              className="bg-[#2f2f33] px-2 py-[2px] rounded-md"
            >
              {(genre.name == 'Adventure')? genre.name.substring(0, 5) + '...' : genre.name}
            </span>
          ))}
          {anime.genres.length > 2 && (
            <span className="bg-[#2f2f33] px-2 py-[2px] rounded-md">
              +{anime.genres.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
