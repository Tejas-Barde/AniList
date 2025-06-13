import Card from './Card';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

function CardList({ animeList = null, userCard = false, status = "all" }) {
  if (animeList === null) animeList = useSelector((state) => state.anime.trendingList);
  // console.log(`CardList :: status :: ${status}`);
  return (
    <ul className="flex p-4 gap-x-12 gap-4 flex-wrap start-left w-full">
      {animeList.map((anime, index) =>{
        if(userCard){
          if(status === 'all' || anime.status.toLowerCase() === status) {
            return (
              <li key={index}>
                <UserCard anime={anime} index={index} />
              </li>
            );
          }
        }
        else{
          return(
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
