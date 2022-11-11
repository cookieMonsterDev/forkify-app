import { useState } from 'react';
import { SearchRecipeTypes } from '../../helpers/types';
import styled from 'styled-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RecipeView = (props: SearchRecipeTypes) => {
  const [data, setData] = useState<SearchRecipeTypes>(props);

  return (
    <Container>
      <ImageWrapper>
        <Image src={data.image} loading="lazy"/>
      </ImageWrapper>

      <Info>
        <Title>{data.title}</Title>
        <RecipeControls>
          <div></div>
          <div><AccessTimeIcon></AccessTimeIcon></div>
          <div></div>
        </RecipeControls>
        <RecipeIngredients>{data.title}</RecipeIngredients>
      </Info>
    </Container>
  );
};

export default RecipeView;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  background-position: center;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 2;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  position: absolute;
  top: -3.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(to right, #fe5858, #ee9617);
  color: #fafafa;
  font-size: 2.5rem;
  font-weight: 600;
  font-family: 'Ubuntu', sans-serif;
  text-transform: uppercase;
`;

const RecipeControls = styled.section`
  flex: 1;
  width: 100%;
  display: flex;

  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const RecipeIngredients = styled.section`
  flex: 6;
  width: 100%;
  background: green;
`