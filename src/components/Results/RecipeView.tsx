import { useState } from 'react';
import { SearchRecipeTypes } from '../../helpers/types';
import { Fraction } from 'fractional';
import styled from 'styled-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';

const RecipeView = (props: SearchRecipeTypes) => {
  const [data, setData] = useState<SearchRecipeTypes>(props);

  const handleChangeServings = (action: string) => {
    if (action === 'inc') {
      setData((prev) => {
        return {
          ...prev,
          servings: prev.servings + 1,
          ingredients: updateServings(prev.ingredients, prev.servings),
        };
      });

      console.log(data.ingredients[0]);
      return;
    }

    if (action === 'dec' && data.servings !== 1) {
      setData((prev) => {
        return {
          ...prev,
          servings: prev.servings - 1,
          ingredients: updateServings(prev.ingredients, prev.servings),
        };
      });
      return;
    }

    return;
  };

  const updateServings = (arr: string[], servings: number) => {
    return arr.map((el: any) => {
      return {
        ...el,
        quantity: ((el.quantity * servings + 1) / servings),
      };
    });
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
            <RemoveCircleOutlineIcon
              onClick={() => handleChangeServings('dec')}
            />
            <ControlPointIcon onClick={() => handleChangeServings('inc')} />
          </RecipeControlsMiddle>
          <RecipeControlsRight>
            <AccountCircleOutlinedIcon />
            <BookmarkBorderIcon />
          </RecipeControlsRight>
        </RecipeControls>
        <RecipeIngredients>
          <IngredientsListCont>
            <IngredientsList>
              {data.ingredients.map((i: any) => {
                if (!i.quantity) {
                  return (
                    <li>
                      <CheckIcon />
                      <span>{i.unit}</span>
                      <span>{i.description}</span>
                    </li>
                  );
                }

                return (
                  <li>
                    <CheckIcon />
                    <span>
                      {i.quantity ? new Fraction(i.quantity).toString() : ''}
                    </span>
                    <span>{i.unit}</span>
                    <span>{i.description}</span>
                  </li>
                );
              })}
            </IngredientsList>
          </IngredientsListCont>
          <CookingDes>
            <h1>HOW TO COOK IT</h1>
            <h3>
              This recipe was carefully designed and tested by {data.publisher}.
              Please check out directions at their website.
            </h3>
            <a href="">To recipe description</a>
          </CookingDes>
        </RecipeIngredients>
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

  @media only screen and (max-width: 1450px) {
    font-size: 1rem;
    top: -2rem;
  }
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
  display: flex;
  width: 100%;
`;

const IngredientsListCont = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: auto;
`;

const IngredientsList = styled.ul`
  height: 100%;
  position: absolute;
  list-style: none;

  @media only screen and (max-width: 1180px) {
    padding: 1rem;
  }

  > li {
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0.5rem 0;

    > svg {
      margin: 0 1rem 0 1rem;
      width: 2rem;
      height: 2rem;
      color: #f2851e;
    }

    span {
      padding: 0 0.1rem;
      font-size: 1rem;
      font-weight: 600;
      color: #675544;
      font-family: 'Ubuntu', sans-serif;
    }
  }
`;

const CookingDes = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > h1 {
    margin-bottom: 1.6rem;
    color: #f2851e;
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Ubuntu', sans-serif;
  }

  > h3 {
    width: 70%;
    color: #3d332a;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Ubuntu', sans-serif;
    text-align: center;
  }

  > a {
    margin-top: 1rem;
    padding: 1rem;
    border: none;
    border-radius: 2rem;
    background: linear-gradient(to right, #fe5858, #ee9617);

    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Ubuntu', sans-serif;
  }
`;
