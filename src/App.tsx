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
          <SearchResultList />
          <Recipe />
        </Wrap>
      </ErrorHandlingContext>
    </AppContext>
  );
}

export default App;

const Wrap = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.7fr 1fr 1fr;
  grid-template-rows: 0.2fr 1.5fr;
  grid-template-areas: 
    "nav nav nav"
    "sidebar main main";
`;

