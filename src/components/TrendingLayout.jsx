import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fillTrendingList } from '../store/animeSlice'
import Loader from './Loader';

function TrendingLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    const trendingList = useSelector((state) => state.anime.trendingList);

    useEffect(() => {
        if (trendingList.length === 0) {
            const fetchAnime = async () => {
                try {
                    const response = await fetch(`https://api.jikan.moe/v4/top/anime`);
                    const json = await response.json();
                    dispatch(fillTrendingList(json.data));
                    console.log(`home Page :: fetchAnime`, json.data);
                } catch (error) {
                    console.log(`home Page :: fetchAnime`, error);
                }
            };
            fetchAnime();
        } else {
            setLoading(false);
        }
    }, [trendingList, dispatch]);

    useEffect(() => {
        if (trendingList && trendingList.length > 0) {
            setLoading(false)
        }
    }, [trendingList])

    return loading ? (
        <div className='h-screen w-screen bg-blue-400 text-black'><Loader></Loader></div>
    ) : (
        <>{children}</>
    );
}

export default TrendingLayout;
