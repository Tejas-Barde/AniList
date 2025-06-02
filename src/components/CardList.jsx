import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

function CardList({ animeList = null, userCard = false }) {
  // console.log(`CardList :: `)
  // console.log(animeList)
  if(animeList === null) animeList = useSelector((state) => state.anime.trendingList)
  return (
    <ul className='flex gap-4 flex-wrap justify-center-safe w-full'>
      {animeList && (
        animeList.map((anime,index) => (
          <li key={index}>
          {userCard ?
              (
                <UserCard
                  anime={anime}
                />
              ) :
              (<Card
                anime={anime}
              />)
            }
          </li>
        ))
      )}
    </ul>
  )
}

export default CardList
