import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecipeContext } from '../../context/appContext';
import { useErrorHandlingContext } from '../../context/ErrorHandlingContext';
import { SearchRecipeListTypes } from '../../helpers/types';
import LoaderCircle from '../LoaderCircle/LoaderCircle';

const SearchResultList = () => {
  const context = useRecipeContext();
  const [list, setList] = useState<SearchRecipeListTypes[] | undefined>();
  const loading = useErrorHandlingContext();

  useEffect(() => {
    setList(context?.searchResults?.slice(0, 10));
  }, [context?.searchResults]);

  return (
    <Container>
      {!loading ? (
        <List>
          {list
            ? list?.map((item) => {
                return (
                  <a href={`#${item.id}`}>
                    <ListItem key={item.id}>
                      <Info1>
                        <figure>
                          <Img src={item.image} loading="lazy" />
                        </figure>
                      </Info1>
                      <Info2>
                        <h3>{item.title}</h3>
                        <Publisher>{item.publisher}</Publisher>
                      </Info2>
                    </ListItem>
                  </a>
                );
              })
            : 'NO SEARCH RESULTS YET'}
        </List>
      ) : (
        <LoaderCircle color={'#f2851e'} duration={1500} delay={100} />
      )}
    </Container>
  );
};

export default SearchResultList;

const Container = styled.div`
  grid-area: sidebar;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 0.5rem;
  align-items: center;
`;

const Info1 = styled.span`
  flex: 1;

  > figure {
    overflow: hidden;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin: auto;
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  background-position: center;
  object-fit: cover;
`;

const Info2 = styled.span`
  overflow: hidden;
  padding: 0 0.5rem 0 0;
  flex: 2;

  > h3 {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #f2851e;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: 'Ubuntu', sans-serif;
    text-transform: uppercase;
  }
`;

const Publisher = styled.p`
  margin-top: 0.2rem;
  color: #675544;
  font-size: 0.9rem;
  font-weight: 200;
  font-family: 'Ubuntu', sans-serif;
`;
