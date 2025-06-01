import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useSelector } from 'react-redux';

function CardList({ animeList = useSelector((state)=>state.anime.trendingList)}) {
    // console.log(`CardList :: `)
    // console.log(animeList)
    return (
        <ul className='flex gap-4 flex-wrap justify-center-safe w-full'>
            {animeList && (
                animeList.map((anime) => (
                    <li key={`${anime.mal_id}`}>
                        <Card
                            anime={anime}
                        />
                    </li>
                ))
            )}
        </ul>
    )
}

export default CardList
