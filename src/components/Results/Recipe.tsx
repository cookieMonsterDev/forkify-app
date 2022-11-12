import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useRecipeContext,
  useUpdateRecipeContext,
} from '../../context/appContext';
import getData from '../../typescript/getData';
import LoaderCircle from '../LoaderCircle/LoaderCircle';
import RecipeView from './RecipeView';

const Recipe = () => {
  const updateRecipe = useUpdateRecipeContext();
  const context = useRecipeContext();
  const [loading, setLoading] = useState(false);
  const data = context?.recipe!;

  useEffect(() => {
    window.addEventListener('hashchange', handleChange);

    return () => {
      window.removeEventListener('hashchange', handleChange);
    };
  });

  useEffect(() => {
    handleLoad();
  }, []);

  const handleChange = async () => {
    try {
      setLoading(true);
      updateRecipe({ ...context, recipe: undefined });
      const id = window.location.hash.substring(1);

      const res = await getData({ id: id });
      setLoading(false);
      if (Array.isArray(res)) throw new Error('Invalid Id');

      updateRecipe({ ...context, recipe: { ...res! } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoad = async () => {
    try {
      const hash = window.location.hash.substring(1);
      if (!hash) return;

      await handleChange();
    } catch (err) {
      console.log(err);
    }
  };

  if (data) {
    return (
      <Container>
        <RecipeView {...data} />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <LoaderCircle color={'#f2851e'} duration={1500} delay={100} />
      </Container>
    );
  }

  return (
    <Container>
      <DefaultMessage>No recipe selected yet</DefaultMessage>
    </Container>
  );
};

export default Recipe;

const Container = styled.div`
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DefaultMessage = styled.span`
  padding: 2rem;
  border-radius: 0.3rem;
  background: lightgray;
  color: #675544;
  font-size: 1.5rem;
  font-weight: 200;
  font-family: 'Ubuntu', sans-serif;
  text-transform: uppercase;
`;
