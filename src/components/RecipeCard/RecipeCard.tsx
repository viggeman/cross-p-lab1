import Link from "next/link";
import Image from "next/image";
import styles from "./RecipeCard.module.css";
import { use, useEffect, useState } from "react";


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

  const [totalTime, setTotalTime] = useState<string>();
  let noCook = false;
  if (cook_time === 0) {
    noCook = true;
  }

  useEffect(() => {
    const time = cook_time + prep_time;
    let string = ''
    if (time === 60) {
      string = `${Math.floor(time / 60)}h`;
      setTotalTime(string)
    } else if (time > 60) {
        string = `${Math.floor(time / 60)}h ${time % 60}min`
        setTotalTime(string)
    } else {
      string = `${time}min`;
      setTotalTime(string)
    }

  })

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
        {!noCook ? <p>Cook Time: {cook_time} minutes</p> : <p>No cook time</p>}
        <p>Total Time: {totalTime}</p>
      </div>
    </div>
    </Link>
  );
};

export default RecipeCard;
