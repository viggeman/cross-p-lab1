import { useState } from 'react';
import Modal from 'src/components/Modal/Modal';
import RecipeCard from 'src/components/RecipeCard/RecipeCard';
import styles from 'src/styles/Recipes.module.css';
import { useFavorites } from 'src/components/contexts/FavoritesContext';
import { useActiveModal } from 'src/components/contexts/ModalContext';

export const getStaticProps = async () => {
  try {
    const res = await fetch('http://localhost:4000/recipes');
    const data = await res.json();

    return {
      props: { recipes: data },
    };
  } catch (error) {
    console.error(error);
  }
};

interface Recipe {
  id: string;
  title: string;
  slug: string;
  servings: number;
  prep_time: number;
  cook_time: number;
}

interface Props {
  recipes: Recipe[];
}

const Recipes: React.FC<Props> = (props) => {
  const { favorites } = useFavorites();
  const { recipes } = props;
  const { activeModal, setActiveModal } = useActiveModal();

  const favoriteRecipes = favorites.map((id) => {
    const recipe = recipes.find((r: Recipe) => r.id === id);
    return recipe?.title;
  });
  return (
    <>
      <Modal isOpen={activeModal === 'favorites'} onClose={() => setActiveModal('')}>
        <h4>Favorite Recipes</h4>
        {favoriteRecipes.map((recipeName) => (
          <li key={recipeName}>{recipeName}</li>
        ))}
      </Modal>
      <h1>Recipes</h1>
      <button className={styles.modalButton} onClick={() => setActiveModal('favorites')}>
        Favorites
      </button>

      <div className={styles.grid}>
        {recipes.map((recipe: Recipe) => {
          const { id, title, slug, servings, prep_time, cook_time } = recipe;
          return (
            <RecipeCard
              key={id}
              id={id}
              title={title}
              slug={slug}
              servings={servings}
              prep_time={prep_time}
              cook_time={cook_time}
            />
          );
        })}
      </div>
    </>
  );
};

export default Recipes;
