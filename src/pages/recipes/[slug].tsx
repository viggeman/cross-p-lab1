import { useState, useEffect } from 'react';
import Modal from "src/components/Modal/Modal";
import styles from 'src/styles/Slug.module.css'

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
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const res = await fetch(`http://localhost:4000/recipes?slug=${slug}`);
  const data = await res.json();
  console.log(data);
  return {
    props: { recipe: data[0] },
  };
}

interface RecipeProps {
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

const Recipe: React.FC<{recipe: RecipeProps}> = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const newIngredients = recipe.ingredients.map(ingredient => {
      const preparationText = ingredient.preparation ? ` ${ingredient.preparation}` : '';
      const unit = ingredient.unit ? `${ingredient.unit}` : '';
      const amount = ingredient.amount ? `${ingredient.amount}` : '';
      return `${ingredient.name} - ${amount} ${unit} ${preparationText}`;
    });

    setIngredients(newIngredients);
  }, [recipe.ingredients]);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        View Ingredients & Instructions
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <h4 className={styles.title}>Ingredients</h4>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li className={styles.listItem} key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>Instructions</h4>
          <ol className={styles.instructions}>
            {recipe.instructions.map((instruction, index) => (
              <li className={styles.instructionsItem} key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </Modal>
      <h3>Recipe: {recipe.title}</h3>
      <p>{recipe.short_description}</p>
      <p>{recipe.description}</p>
      <p>Origin: {recipe.origin}</p>
      <p>Category: {recipe.category}</p>
      <p>Servings: {recipe.servings}</p>
      <p>Prep Time: {recipe.prep_time} minutes</p>
      <p>Cook Time: {recipe.cook_time} minutes</p>
      <button onClick={() => setShowModal(true)}>
        View Ingredients & Instructions
      </button>
    </div>
  );
};

export default Recipe;
