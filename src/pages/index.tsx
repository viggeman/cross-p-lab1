import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  gap: 2rem;
  width: 70vw;
`;

const Card = styled.div`
  background-color: tomato;
  height: 20rem;
  width: 20rem;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Info = styled.p`
  font-size: rem;
`;

interface Recipe {
  id: string;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
}

const Index: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/recipes');
        const data = await response.json();
        setRecipes(data);
        console.log(recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Wrapper>
        {recipes.map((recipe, index) => (
          <Card key={recipe.id}>
            <Title key={recipe.title}>{recipe.title}</Title>
            {recipe.vegetarian && <Info>Vegetarian</Info>}
            {recipe.vegan && <Info>Vegan</Info>}
          </Card>
        ))}
      </Wrapper>
    </>
  );
};

export default Index;
