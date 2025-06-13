import React, { useEffect, useState } from 'react';
import Button from './Button';
import AddAnimeBtn from './AddAnimeBtn';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RemoveAnimeBtn from './RemoveAnimeBtn';
import { Play } from 'lucide-react';


function LargeCard({ anime }) {
  // console.log(`inside large card - anime - ${anime}`);
  // console.log(anime);
  const authStatus = useSelector(state => state.auth.status)
  const userList = useSelector(state => state.anime.userList)
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (userList && userList.length > 0 && anime?.mal_id) {
      const exists = userList.some(item => item.anime_id === anime.mal_id || item.anime_id === anime.anime_id);
      setIsAdded(exists);
    } else {
      setIsAdded(false);
    }
  }, [userList, anime]);

  return (
    <div className="flex max-w-screen w-full lg:flex-nowrap bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl  py-16 gap-6 h-fit flex-wrap p-0 m-0">
      <div className="w-48 pl-8">
        {anime?.images?.jpg?.large_image_url && (
          <img
            src={anime.images.jpg.large_image_url}
            alt={`${anime.title || "Anime"} Poster`}
            className="rounded-lg shadow-md"
          />
        )}
        {anime?.source && (
          <div className="mt-2 text-sm text-center text-pink-300 font-semibold">
            {anime.source}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow w-full lg:w-2/3 px-12 text-white gap-4">
        {anime?.title && <h2 className="text-3xl font-bold mb-2">{anime.title}</h2>}

        <div className="flex flex-wrap gap-2 text-xs mb-4">
          {anime?.rating && (
            <span className="bg-yellow-500 text-black px-2 py-1 rounded">
              {anime.rating}
            </span>
          )}
          {anime?.type && (
            <span className="bg-green-600 px-2 py-1 rounded">{anime.type}</span>
          )}
          {anime?.duration && (
            <span className="bg-blue-600 px-2 py-1 rounded">{anime.duration}</span>
          )}
        </div>
        
        {anime?.synopsis && (
          <p className="text-gray-300 text-sm mb-4 justify-between w-full">{anime.synopsis}</p>
        )}

        <div className="flex gap-3 mt-4">
          <a
            href={anime?.trailer?.url || anime?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 py-2 transition duration-200"
          >
            <Play className="w-5 h-5" />
            Watch Now
          </a>

          {authStatus ? (
            !isAdded ? (
              <AddAnimeBtn
                className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200"
                anime={anime}
                isAdded={isAdded}
              >
                + Add to List
              </AddAnimeBtn>
            ) : (
              <RemoveAnimeBtn
                className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200"
                anime={anime}
                setIsAdded={setIsAdded}
              >
                Remove
              </RemoveAnimeBtn>
            )
          ) : (
            <Link to="/login">
              <Button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200">
                + Add to List
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="h-full flex flex-col align-middle items-center px-8 text-sm text-gray-400 mb-3 text-left items-start gap-3">
          {anime?.studios?.length > 0 && (
            <p>
              <span className="font-semibold text-white">Studios:</span>{" "}
              {anime.studios.map((studio) => studio.name).join(", ")}
            </p>
          )}
          {anime?.aired?.string && (
            <p>
              <span className="font-semibold text-white">Aired:</span> {anime.aired.string}
            </p>
          )}
          {anime?.status && (
            <p>
              <span className="font-semibold text-white">Status:</span> {anime.status}
            </p>
          )}
          {anime?.score && (
            <p>
              <span className="font-semibold text-white">MAL Score:</span> {anime.score}
            </p>
          )}
          {anime?.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto ">
              <p className='flex items-center text-white font-semibold'>Genre : </p>
              {anime.genres.map((genre, index) => (
                <span key={index} className="bg-gray-700 px-2 py-1 rounded-xl text-xs ">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

      </div>
    </div>
  );

}

export default LargeCard;
