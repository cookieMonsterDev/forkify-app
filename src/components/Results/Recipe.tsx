import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useRecipeContext,
  useUpdateRecipeContext,
} from '../../context/appContext';
import getData from '../../typescript/getData';
import LoaderCircle from '../LoaderCircle/LoaderCircle';

const Recipe = () => {
  const updateRecipe = useUpdateRecipeContext();
  const context = useRecipeContext();
  const [loading, setLoading] = useState(false)
  const data = context?.recipe!;

  useEffect(() => {
    window.addEventListener('hashchange', handleChange);

    return () => {
      window.removeEventListener('hashchange', handleChange);
    };
  });

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

  if (data) {
    return <Container>{data.id}</Container>;
  }

  if (loading) {
    return (
      <Container>
        <LoaderCircle color={'#f2851e'} duration={1500} delay={100} />
      </Container>
    );
  }

  return <Container>No data yet</Container>;
};

export default Recipe;

const Container = styled.div`
  flex: 3;
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
`;
