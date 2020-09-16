
import styled from "styled-components";
import Navbar from "./../components/ui/Navbar";
import GlobalStyle from "./../styles/GlobalStyle";
function MyApp({ Component, pageProps }) {
  return (
    <>
    <GlobalStyle/>
      <Navbar />
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default MyApp;