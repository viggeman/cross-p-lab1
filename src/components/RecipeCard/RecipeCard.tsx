import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCard.module.css";


interface Recipe {
  id: number;
  title: string;
  slug: string;
  servings: number;
  prep_time: number;
  cook_time: number;
}

const RecipeCard: React.FC<Recipe> = ({
  title,
  slug,
  servings,
  prep_time,
  cook_time,
}) => {
  return (
    <Link href={`/recipes/${slug}`}>
    <div className={styles.recipeCard}>
      <Image
        src='/image/food.jpg'
        alt={title}
        width={300}
        height={200}
        />
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>Servings: {servings}</p>
        <p>Prep Time: {prep_time} minutes</p>
        <p>Cook Time: {cook_time} minutes</p>
      </div>
    </div>
    </Link>
  );
};

export default RecipeCard;
