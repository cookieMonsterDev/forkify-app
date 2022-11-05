import React from 'react';
import styled from 'styled-components';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const NavBar = () => {
  return (
    <Container>
      <LeftSection>
        <Logo>
          <circle>
            <RestaurantIcon />
          </circle>
          Forkify
        </Logo>
        <SearchContainer>
          <SearchButton>
            <SearchOutlinedIcon /> 
          </SearchButton>
          <Search type="text" />
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

export default NavBar;

const Container = styled.nav`
  position: absolute;
  width: 100vw;
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
  flex: 4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Logo = styled.h1`
  float: left;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-family: 'Shadows Into Light';
  color: #675544;

  > circle {
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
`;

const Search = styled.input`
  flex: 3;
  float: right;
  width: 15rem;
  height: 2rem;
  outline: 0;
  border-radius: 2rem;
  border: 1px solid #f2851e;
`;

const SearchButton = styled.button`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  background: #f2851e;
  border: 1px solid #f2851e;
  color: #ffffff;
  border-radius: 1rem 1rem 1rem 1rem;
`

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
