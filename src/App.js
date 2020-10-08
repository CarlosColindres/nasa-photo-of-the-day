import React from "react";
import NasaApi from "./components/NasaApi";
import styled from 'styled-components'

const AppContainer = styled.div`
  height:100%;
`

function App() {
  return (
    <AppContainer className="App">
      <NasaApi />
    </AppContainer>
  );
}

export default App;
