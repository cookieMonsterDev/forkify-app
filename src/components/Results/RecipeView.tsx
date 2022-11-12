import { useState } from 'react';
import { SearchRecipeTypes } from '../../helpers/types';
import styled from 'styled-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const RecipeView = (props: SearchRecipeTypes) => {
  const [data, setData] = useState<SearchRecipeTypes>(props);

  const handleChangeServings = (action: string) => {
    if (action === 'inc') {
      setData((prev) => {
        return { ...prev, servings: prev.servings + 1 };
      });
      return;
    }

    if (action === 'dec' && data.servings !== 1) {
      setData((prev) => {
        return { ...prev, servings: prev.servings - 1 };
      });
      return;
    }

    return;
  };

  return (
    <Container>
      <ImageWrapper>
        <Image src={data.image} loading="lazy" />
      </ImageWrapper>

      <Info>
        <Title>{data.title}</Title>
        <RecipeControls>
          <RecipeControlsLeft>
            <AccessTimeIcon /> {data.cookingTime} 
            <label>MINUTES</label>
          </RecipeControlsLeft>
          <RecipeControlsMiddle>
            <PeopleAltOutlinedIcon />
            {data.servings}
            <label>SERVINGS</label>
            <RemoveCircleOutlineIcon onClick={() => handleChangeServings('dec')}/>
            <ControlPointIcon onClick={() => handleChangeServings('inc')} />
          </RecipeControlsMiddle>
          <RecipeControlsRight>
            <AccountCircleOutlinedIcon />
            <BookmarkBorderIcon />
          </RecipeControlsRight>
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
  top: -4rem;
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
`;

const RecipeControlsLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #3d332a;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Ubuntu', sans-serif;
  text-transform: uppercase;

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
    color: #f2851e;
  }

  > label {
    font-size: 1rem;
    font-weight: 600;
    margin-left: 0.5rem;
    color: #675544;
  }
`;

const RecipeControlsMiddle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #3d332a;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Ubuntu', sans-serif;
  text-transform: uppercase;

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
    color: #f2851e;
  }

  > label {
    font-size: 1rem;
    font-weight: 600;
    margin-left: 0.5rem;
    margin-right: 1rem;
    color: #675544;
  }
`;

const RecipeControlsRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    color: #f2851e;
  }
`;

const RecipeIngredients = styled.section`
  flex: 6;
  width: 100%;
  background: green;
`;
