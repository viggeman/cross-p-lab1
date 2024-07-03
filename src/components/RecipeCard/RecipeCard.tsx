import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './RecipeCard.module.scss';

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
      <Link href={`/recipes/${slug}`}>
        <Image src="/image/food.jpg" alt={title} width={300} height={200} />
      </Link>

      <div className={styles.cardContent}>
        <button
          className={[styles.favoriteButton, isFavorite ? styles.isFavorite : ''].join(' ')}
          onClick={() => toggleFavorite(id)}
        >
          {isFavorite ? 'Favorite' : 'Add to Favorites'}
        </button>
        <h4>{title}</h4>
        <p>Servings: {servings}</p>
        <p>Total Time: {totalTime}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
