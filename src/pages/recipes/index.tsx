export const getStaticProps = async () => {
  const res = await fetch('http://localhost:4000/recipes');
  const data = await res.json();

  return {
    props: { recipes: data},
  };
}

interface Recipe {
  id: number;
  title: string;
  description: string;
}

const Recipes: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
