import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

function CardList({ animeList = null, className = "", userCard = false, status = "all" }) {
  const defaultList = useSelector((state) => state.anime.trendingList);
  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (userCard) return; // skip compact logic for UserCard

    const LARGE_CARD_WIDTH = 322;

    const cardsPerRow = Math.floor(containerWidth / LARGE_CARD_WIDTH);
    const usedWidth = cardsPerRow * LARGE_CARD_WIDTH;
    const remaining = containerWidth - usedWidth;

    const isEven = remaining < LARGE_CARD_WIDTH / 2;
    setIsCompact(!isEven);
  }, [containerWidth, userCard]);

  if (!animeList) animeList = defaultList;

  const gridTemplate = userCard
    ? 'repeat(auto-fill, minmax(150px, 1fr))' // always compact for UserCard
    : isCompact
    ? 'repeat(auto-fill, minmax(150px, 1fr))'
    : 'repeat(auto-fill, minmax(322px, 1fr))';

  return (
    <ul
      ref={containerRef}
      className={`grid gap-[1.2em] place-items-center px-[0.6em] py-6 ${className}`}
      style={{ gridTemplateColumns: gridTemplate }}
    >
      {animeList.map((anime, index) => {
        if (userCard) {
          if (status === 'all' || status === anime.status?.toLowerCase()) {
            return (
              <li key={anime.mal_id || index} className="flex justify-center">
                <UserCard anime={anime} index={index} />
              </li>
            );
          }
          return null;
        }

        return (
          <li key={anime.mal_id} className="flex justify-center">
            <Link to={`/search/${anime.title}`}>
              <Card anime={anime} compact={isCompact} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CardList;
