import { useEffect } from 'react';
import styled from 'styled-components';
import {
  useRecipeContext,
  useUpdateRecipeContext,
} from '../../context/appContext';
import {
  useErrorHandlingContext,
  useUpdateErrorHandlingContext,
} from '../../context/ErrorHandlingContext';
import getData from '../../typescript/getData';
import LoaderCircle from '../LoaderCircle/LoaderCircle';

const Recipe = () => {
  const updateRecipe = useUpdateRecipeContext();
  const context = useRecipeContext();
  const setLoading = useUpdateErrorHandlingContext();
  const loading = useErrorHandlingContext();
  const { loadingRecipe } = loading;
  const data = context?.recipe!;

  useEffect(() => {
    window.addEventListener('hashchange', handleChange);

    return () => {
      window.removeEventListener('hashchange', handleChange);
    };
  });

  const handleChange = async () => {
    try {
      setLoading({ ...loading, loadingRecipe: true });
      updateRecipe({ ...context, recipe: undefined });
      const id = window.location.hash.substring(1);

      const res = await getData({ id: id });
      setLoading({ ...loading, loadingRecipe: false });
      if (Array.isArray(res)) throw new Error('Invalid Id');

      updateRecipe({ ...context, recipe: { ...res! } });
    } catch (err) {
      console.log(err);
    }
  };

  if (data) {
    return <Container>{data.id}</Container>;
  }

  if (loadingRecipe) {
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
