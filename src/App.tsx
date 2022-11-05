
import { AppContext } from './context/appContext';
import styled from 'styled-components';
import LoaderCircle from './components/LoaderCircle/LoaderCircle';
import NavBar from './components/NavBar/NavBar';
import SearchResultList from './components/Results/SearchResultList';
import Recipe from './components/Results/Recipe';

function App() {

  return (
    <AppContext>
      <Wrap>
        <NavBar />
        <ResultsWrap>
          <SearchResultList />
          <Recipe />
        </ResultsWrap>
      </Wrap>
    </AppContext>
  );
}

export default App;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

const ResultsWrap = styled.div`
  position: absolute;
  top: 6rem;
  width: 100vw;
  display: flex;
`