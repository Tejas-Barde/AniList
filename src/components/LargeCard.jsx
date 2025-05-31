import React from 'react';
import Button from './Button';


function LargeCard({ anime }) {
  console.log(`inside large card - anime - ${anime}`);
  console.log(anime);

  return (
    <div className="flex flex-wrap  bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-xl p-6 gap-6  m-8 h-fit">
      <div className="w-48 flex-shrink-0">
        <img
          src={anime.images.jpg.large_image_url}
          alt={`${anime.title} Poster`}
          className="rounded-lg shadow-md"
        />
        <div className="mt-2 text-sm text-center text-pink-300 font-semibold">
          {anime.source}
        </div>
      </div>

      <div className="flex flex-col flex-grow flex-wrap flex-1">
        <h2 className="text-3xl font-bold mb-2">{anime.title}</h2>
        <div className="flex flex-wrap gap-2 text-xs mb-4">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded">
            {anime.rating}
          </span>
          <span className="bg-green-600 px-2 py-1 rounded">{anime.type}</span>
          <span className="bg-blue-600 px-2 py-1 rounded">{anime.duration}</span>
        </div>

        <p className="text-gray-300 text-sm mb-4 justify-between w-full">{anime.synopsis}</p>



        <div className="flex gap-3 mt-4">
          <a
            href={anime.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          >
            ▶ Watch now
          </a>
          <Button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200">
            + Add to List
          </Button>
        </div>
      </div>
      <div className='h-full flex flex-col align-middle items-center'>
        <div className="text-sm text-gray-400 mb-3 text-left">
          <p>
            <span className="font-semibold text-white">Studios:</span>{' '}
            {anime.studios.map((studio) => studio.name).join(', ')}
          </p>
          <p>
            <span className="font-semibold text-white">Aired:</span> {anime.aired.string}
          </p>
          <p>
            <span className="font-semibold text-white">Status:</span> {anime.status}
          </p>
          <p>
            <span className="font-semibold text-white">MAL Score:</span> {anime.score}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto text-xs">
          {anime.genres.map((genre, index) => (
            <span key={index} className="bg-purple-700 px-2 py-1 rounded">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LargeCard;
