import React, { useRef, useEffect, useState } from 'react';

function Card({ anime, compact }) {
  const imageRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(100);

  useEffect(() => {
    if (imageRef.current) {
      setImgWidth(imageRef.current.offsetWidth);
    }
  }, []);

  if (compact) {
    return (
      <div
        className="flex flex-col items-center w-full max-w-[150px] hover:scale-[1.05] transition-transform duration-300"
      >
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <img
            ref={imageRef}
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="aspect-[2/3] object-cover w-full rounded-lg"
          />

          {/* Optional badge (e.g. for age rating or type) */}
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1 py-[1px] rounded-sm">
            {anime.type || 'TV'}
          </span>
        </div>

        {/* Title below the image */}
        <h2 className="mt-2 text-center font-semibold text-sm leading-tight line-clamp-2">
          {anime.title}
        </h2>
      </div>
    );
  }


  return (
    <div
      className="flex h-fit w-[322px] border border-gray-700 rounded-xl text-white
        shadow-gray-800/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]
        hover:border-blue-500 hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]
        transition duration-300 ease-in-out overflow-hidden p-2"
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

        <h2 className="text-[1.3em] font-semibold leading-tight mt-1 line-clamp-2">
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

        <div className="flex flex-wrap gap-2 mt-1 text-[11.5px] font-medium">
          {anime.genres.slice(0, 2).map((genre, index) => (
            <span
              key={genre.mal_id || index}
              className="bg-gray-700 px-2 py-[2px] rounded-lg max-w-[60px] truncate"
            >
              {genre.name}
            </span>
          ))}
          {anime.genres.length > 2 && (
            <span className="bg-gray-700 px-2 py-[2px] rounded-lg">
              +{anime.genres.length - 2}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

export default Card;
