import Link from 'next/link';
import Image from 'next/image';
import styles from './RecipeCard.module.css';
import { useMemo } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

interface RecipeCardProps {
  id: string;
  title: string;
  slug: string;
  servings: number;
  prep_time: number;
  cook_time: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  slug,
  servings,
  prep_time,
  cook_time,
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  const noCook = cook_time === 0 ? true : false;

  const totalTime: string = useMemo(() => {
    const cookAndPrepTime = cook_time + prep_time;
    if (cookAndPrepTime === 60) {
      return `${Math.floor(cookAndPrepTime / 60)}h`;
    } else if (cookAndPrepTime > 60) {
      return `${Math.floor(cookAndPrepTime / 60)}h ${cookAndPrepTime % 60}min`;
    } else {
      return `${cookAndPrepTime}min`;
    }
  }, [cook_time, prep_time]);

  return (
    <div className={styles.recipeCard}>
      <Image src="/image/food.jpg" alt={title} width={300} height={200} />

      <button className={styles.favoriteButton} onClick={() => toggleFavorite(id)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link href={`/recipes/${slug}`}>
        <div className={styles.cardContent}>
          <h3>{title}</h3>
          <p>Servings: {servings}</p>
          <p>Prep Time: {prep_time} minutes</p>
          {!noCook ? <p>Cook Time: {cook_time} minutes</p> : <p>No cook time</p>}
          <p>Total Time: {totalTime}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
