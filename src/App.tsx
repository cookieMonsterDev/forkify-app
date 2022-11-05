import { AppContext } from './context/appContext';
import { ErrorHandlingContext } from './context/ErrorHandlingContext';
import NavBar from './components/NavBar/NavBar';
import SearchResultList from './components/Results/SearchResultList';
import Recipe from './components/Results/Recipe';
import styled from 'styled-components';


function App() {
  return (
    <AppContext>
      <ErrorHandlingContext>
        <Wrap>
          <NavBar />
          <ResultsWrap>
            <SearchResultList />
            <Recipe />
          </ResultsWrap>
        </Wrap>
      </ErrorHandlingContext>
    </AppContext>
  );
}

export default App;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ResultsWrap = styled.div`
  position: absolute;
  top: 6rem;
  width: 100vw;
  display: flex;
`;
