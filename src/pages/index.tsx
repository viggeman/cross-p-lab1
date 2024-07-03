import Hightlight from 'src/components/Hightlight/Hightlight';
import styles from '../styles/Index.module.scss';

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
  short_description: string;
  vegan: boolean;
  vegetarian: boolean;
  slug: string;
}

interface Props {
  recipes: Recipe[];
}

/*
1. Hero image > Recipes
2. Highlight modul > Recept
*/

const Index: React.FC<Props> = (props) => {
  const { recipes } = props;
  const highlightRecipes = recipes.slice(0, 4);
  console.log('highlights', highlightRecipes);
  console.log(recipes);

  return (
    <>
      <h1>Hej</h1>
      <div className={styles.grid}>
        {highlightRecipes.map((recipe: Recipe) => {
          const { id, title, short_description, vegan, vegetarian, slug } = recipe;
          return (
            <Hightlight
              key={id}
              id={id}
              title={title}
              short_description={short_description}
              vegan={vegan}
              vegetarian={vegetarian}
              slug={slug}
            />
          );
        })}
      </div>
    </>
  );
};

export default Index;
