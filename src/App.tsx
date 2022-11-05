
import { AppContext } from './context/appContext';
import styled from 'styled-components';
import LoaderCircle from './components/LoaderCircle/LoaderCircle';
import NavBar from './components/NavBar/NavBar';

function App() {

  return (
    <AppContext>
      <Wrap>
        <NavBar />
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