import React, { useCallback, useState, useRef } from 'react';
import styled from 'styled-components';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import getData from '../../typescript/getData';
import {
  useRecipeContext,
  useUpdateRecipeContext,
} from '../../context/appContext';
import { useUpdateErrorHandlingContext } from '../../context/ErrorHandlingContext';

const NavBar = () => {
  const InputRef = useRef<HTMLInputElement>(null!);
  const [query, setSuery] = useState('');
  const updateSearch = useUpdateRecipeContext();
  const context = useRecipeContext();
  const setLoading = useUpdateErrorHandlingContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSuery(e.target.value);
  }, []);

  const handleClick = async () => {
    try {
      if (query === '') return;

      setLoading((prev) => !prev);
      const res = await getData({ query: query });

      setLoading((prev) => !prev);
      if (!Array.isArray(res)) throw new Error('Not an array');

      updateSearch({ ...context, searchResults: [...res] });

      InputRef.current.value = '';
      setSuery('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <LeftSection>
        <Logo>
          <div>
            <RestaurantIcon />
          </div>
          Forkify
        </Logo>
        <SearchContainer>
          <SearchButton onClick={handleClick}>
            <SearchOutlinedIcon />
            Search
          </SearchButton>
          <Search type="text" onChange={handleChange} ref={InputRef} />
        </SearchContainer>
      </LeftSection>
      <RightSection>
        <ManageButton>
          <InsertDriveFileOutlinedIcon />
          Add Recipe
        </ManageButton>
        <ManageButton>
          <BookmarkBorderIcon />
          Bookmarks
        </ManageButton>
      </RightSection>
    </Container>
  );
};

export default React.memo(NavBar);

const Container = styled.nav`
  width: 100%;
  position: absolute;
  height: 6rem;
  background: linear-gradient(to left, #ece9e6, #ffffff);
  display: flex;
`;

const LeftSection = styled.section`
  flex: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightSection = styled.section`
  flex: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Logo = styled.h1`
  flex: 2;
  float: left;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
  font-family: 'Shadows Into Light';
  color: #675544;

  > div {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: 0 0.8rem 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #fc4a1a, #f7b733);

    > svg {
      width: 60%;
      height: 60%;
      color: #ffffff;
    }
  }
`;

const SearchContainer = styled.span`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  position: relative;
  height: 2.6rem;
  margin-left: 1rem;
`;

const Search = styled.input`
  flex: 3;
  float: right;
  box-sizing: border-box;
  width: 15rem;
  height: 100%;
  outline: 0;
  border-radius: 2rem;
  border: 1px solid #f2851e;
  padding-left: 1rem;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  box-sizing: border-box;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 100%;
  background: #f2851e;
  border: 1px solid #f2851e;
  color: #ffffff;
  border-radius: 2rem;
  font-family: 'Ubuntu', sans-serif;
  text-transform: uppercase;
  cursor: pointer;

  > svg {
    margin: 0 0.5rem 0 0;
  }
`;

const ManageButton = styled.span`
  margin: 0 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Ubuntu', sans-serif;
  text-transform: uppercase;
  color: #675544;
  cursor: pointer;

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.6rem;
    color: #f2851e;
  }
`;
