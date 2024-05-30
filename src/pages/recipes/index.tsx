import Link from "next/link";

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
  slug: string;
}

const Recipes: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <div className="" key={recipe.id}>
          <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
