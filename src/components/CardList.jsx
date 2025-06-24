import Card from './Card';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

function CardList({ animeList = null, userCard = false, status = "all", className = "" }) {
  if (animeList === null) animeList = useSelector((state) => state.anime.trendingList);
  // console.log(`CardList :: status :: ${status}`);
  return (
    <ul className={`flex p-4 flex-wrap gap-2 sm:gap-4 md:gap-10 lg:gap-8 w-full ${className}`}>
      {animeList.map((anime, index) => {
        if (userCard) {
          if (status === 'all' || anime.status.toLowerCase() === status) {
            return (
              <li key={index}>
                <UserCard anime={anime} index={index} />
              </li>
            );
          }
        }
        else {
          return (
            <li key={index}>
              <Link to={`/search/${anime.title}`}>
                <Card anime={anime} />
              </Link>
            </li>
          )
        }
      }
      )}
    </ul>
  );
}

export default CardList
