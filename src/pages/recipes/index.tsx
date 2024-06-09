import RecipeCard from "src/components/RecipeCard/RecipeCard";
import styles from 'src/styles/Recipes.module.css'

export const getStaticProps = async () => {
  try {
    const res = await fetch('http://localhost:4000/recipes');
    const data = await res.json();

    return {
      props: { recipes: data},
    };

  } catch (error) {
    console.error(error)
  }

}

interface Recipe {
  id: number;
  title: string;
  slug: string;
  servings: number;
  prep_time: number;
  cook_time: number;
}

const Recipes: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  return (
    <>
    <h1>Recipes</h1>

      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>

    </>
  );
};

export default Recipes;
