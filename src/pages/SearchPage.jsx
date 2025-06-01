import LargeCard from '../components/LargeCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CardList from '../components/CardList';

function SearchPage() {
  const { slug } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      if (!slug) return;
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(slug)}`);
        const json = await response.json();
        setAnimeList(json.data);
        setLoading(false); 
      } catch (error) {
        console.log(`search Page :: fetchAnime`, error);
      }
    };
    fetchAnime();
  }, [slug]);

  return loading ? (
    <div className='w-screen bg-red-900 text-white h-screen'>Loading</div>
  ) : (
    <div className="flex flex-col gap-4 w-full">
      {animeList.length > 0 && <LargeCard anime={animeList[0]} />}
      <h1 className='w-full'>Related Search</h1>
      {animeList.length > 0 && <CardList animeList={animeList.slice(1)} />}
    </div>
  );
}

export default SearchPage;
