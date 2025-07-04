import React, { useState } from 'react';
import EditDetails from './EditDetails';
import { FiMoreVertical } from 'react-icons/fi';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const UserCard = React.memo(({ anime, index }) => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/search/${anime.title}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="flex flex-col items-center w-full max-w-[150px] hover:scale-[1.05] transition-transform duration-300 cursor-pointer"
      >
        {/* Poster with badge + edit */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <img
            src={anime.image_url}
            alt={anime.title}
            className="aspect-[2/3] object-cover w-full rounded-lg"
          />

          {/* Type badge */}
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1 py-[1px] rounded-sm">
            {anime.type || 'TV'}
          </span>

          {/* Edit button */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setEdit(true);
            }}
            className="absolute top-1 right-1 p-1 bg-gray-800/60 hover:bg-gray-700 rounded-md"
          >
            <FiMoreVertical className="text-white w-4 h-4" />
          </Button>
        </div>

        {/* Status and Rating below image */}
        <div className="mt-1 flex justify-between w-full text-[11px] text-gray-300 px-[2px]">
          <span className="bg-gray-700 px-2 py-[2px] rounded-full">
            {anime.status}
          </span>
          <div className="flex items-center gap-[2px]">
            <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] fill-yellow-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
            <span>{anime.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-1 text-center font-semibold text-sm leading-tight line-clamp-2 px-[2px]">
          {anime.title}
        </h2>
      </div>

      {/* Edit Modal */}
      {edit && (
        <EditDetails
          anime={anime}
          index={index}
          onClose={() => setEdit(false)}
        />
      )}
    </>
  );
});

export default UserCard;
