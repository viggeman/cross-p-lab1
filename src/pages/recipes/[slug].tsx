import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from 'src/components/Modal/Modal';
import styles from 'src/styles/Slug.module.css';
import { useFavorites } from 'src/components/contexts/FavoritesContext';

interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  origin: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    preparation: string;
  }[];
  instructions: string[];
  category: string;
  servings: number;
  prep_time: number;
  cook_time: number;
}

interface RecipeProps {
  recipe: Recipe;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(recipe.id);
  const noCook = recipe.cook_time ? false : true;

  useEffect(() => {
    const { ingredients } = recipe;
    console.log(ingredients);
    const newIngredients = ingredients.map(formatIngredient);
    setIngredients(newIngredients);
  }, [recipe]);

  function formatIngredient(ingredient: {
    name: string;
    amount: number;
    unit: string;
    preparation: string;
  }) {
    const preparation = ingredient.preparation ? ` ${ingredient.preparation}` : '';
    const unit = ingredient.unit || '';
    const amount = ingredient.amount || '';

    return `${ingredient.name} - ${amount}${unit}${preparation}`;
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <h4 className={styles.title}>Ingredients</h4>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li className={styles.listItem} key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>Instructions</h4>
          <ol className={styles.instructions}>
            {recipe.instructions.map((instruction, index) => (
              <li className={styles.instructionsItem} key={index}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </Modal>

      <div className={styles.grid}>
        <div className={styles.gridImage}>
          <Image
            src="/image/chicken-feast.jpg"
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.gridContent}>
          <h3>Recipe: {recipe.title}</h3>
          <button className={styles.favoriteButton} onClick={() => toggleFavorite(recipe.id)}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <p>{recipe.short_description}</p>
          <div className={styles.infoBox}>
            <p>Origin: {recipe.origin}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Prep Time: {recipe.prep_time} minutes</p>
            {!noCook ? <p>Cook Time: {recipe.cook_time} minutes</p> : <p>No cooking time</p>}
          </div>
          <button className={styles.modalButton} onClick={() => setShowModal(true)}>
            View Ingredients & Instructions
          </button>
          <h3>Description:</h3>
          <p>{recipe.description}</p>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:4000/recipes');
  const recipes = await res.json();

  const paths = recipes.map((recipe: { slug: string }) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const res = await fetch(`http://localhost:4000/recipes?slug=${slug}`);
  const data = await res.json();
  return {
    props: { recipe: data[0] },
  };
};

export default Recipe;
