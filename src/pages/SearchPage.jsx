import LargeCard from '../components/LargeCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import { Loader } from 'lucide-react';

function SearchPage() {
  const { slug } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      if (!slug) return;
      try {
        // setAnimeList([])
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
    <Loader className='text-white'></Loader>
  ) : (
    <div className="pt-20 flex flex-col gap-4 w-full mb-4 bg-gradient-to-br from-[#0A121D] via-[#131C2B] to-[#1B2A3C] text-white">
      {animeList.length > 0 && <LargeCard anime={animeList[0]} />}
      {animeList.length > 0 && (
        <div >
          <div className="flex ml-7 items-center gap-2">
            <div className="w-1 h-6 bg-red-500 rounded-sm" />
            <h1 className="text-xl md:text-2xl font-bold text-amber-100 uppercase tracking-wide">Related Search</h1>
          </div>
          <CardList animeList={animeList.slice(1)} />
        </div>
      )}
      {animeList.length === 0 && (
        <>
          <div className='bg-[url("/src/assets/bennbechman.jpg")] bg-cover bg-center h-screen w-full flex items-center justify-center'>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">Type Properly</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;
