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
    setList(context?.searchResults);
  }, [context?.searchResults]);

  return (
    <Container>
      { !loading ? 
      <List>
        {list ? list?.map((item) => {
          return <ListItem key={item.id}>{item.title}</ListItem>;
        }) : 'NO SEARCH RESULTS YET'}
      </List>
      : <LoaderCircle duration={1500} delay={100}/>
}
    </Container>
  );
};

export default SearchResultList;

const Container = styled.div`
  flex: 1;
  background-color: red;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  background-color: yellow;
`;
