import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import LightTheme from "../styles/theme/LightTheme";
import Navbar from "./../components/ui/Navbar";
import GlobalStyle from "../styles/GlobalStyle";
import { Sun, Moon } from "react-feather";
import DarkTheme from "../styles/theme/DarkTheme";
function MyApp({ Component, pageProps }) {

  const [darkTheme, setDarkTheme] = useState<Boolean>(false);

  const getTheme = () => {
    return darkTheme ? DarkTheme : LightTheme
  }

  return (
    <Wrapper>
      <ThemeProvider theme={getTheme()}>
        <GlobalStyle />
        <Navbar />
        <PageContainer>
          <Component {...pageProps} />
          <ThemeToggleContainer
            onClick={() => {
              setDarkTheme(!darkTheme)
            }}
          >
            {darkTheme ? <Moon/> : <Sun/>}
          </ThemeToggleContainer>
        </PageContainer>
      </ThemeProvider>
    </Wrapper>
  );
}



const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`

const ThemeToggleContainer = styled.div`
  /* Positioning. */
  position: absolute;
  right: 10px;
  bottom: 10px;
  
  /* Styling */
  padding: 4px;

  /* Usability */
  cursor: pointer;
`


export default MyApp;