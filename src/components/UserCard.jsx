import React from 'react'

function UserCard({anime}) {
  // console.log(`UserCard :: Anime`)
  // console.log(anime)
  return (
    <div className="flex gap-5 w-80 h-[214px] bg-gray-900 text-white p-2 rounded-md items-stretch">
      <div className='w-full h-full'>
        <img className='w-auto h-full ' src={anime.image_url} alt="image" />
      </div>
      <div className="w-full flex flex-col gap-2 justify-between align-middle text-[10px]">
        <div className="flex gap-2 items-start align-baseline">
          <span className="bg-gray-600 px-2 py-0.5 rounded-full text-white">{anime.status}</span>
          <small className='text-xs'>Ep {anime.episodes}</small>
        </div>
        <div className='flex min-h-[3.5em] items-center'>
          <p className="font-bold text-[1.5em]  line-clamp-2">{anime.title}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-yellow-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
            <span>{anime.rating}</span>
          </div>
        </div>

        <div className="flex gap-1 flex-wrap">
          {anime?.genres?.slice(0, 2).map((genre, index) => (
            <span className='border-1 border-solid bg-auto border-sky-800 rounded p-1.5' key={index}>{genre}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserCard
