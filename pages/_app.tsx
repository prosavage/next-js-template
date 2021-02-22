import styled, { ThemeProvider } from "styled-components";
import Navbar from "./../components/ui/Navbar";
import GlobalStyle from "../styles/GlobalStyle";
import { RecoilRoot } from "recoil";
import { themeState } from "../atoms/theme";
import Footer from "../components/ui/Footer";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import { useEffect } from "react";
import getToken, { setToken } from "../util/TokenManager";
import getAxios, { buildAxios } from "../util/AxiosInstance";
import { NextWebVitalsMetric } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import useStoredTheme from "../util/hooks/useStoredTheme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <RecoilRoot>
        <WrappedApp Component={Component} pageProps={pageProps} />
      </RecoilRoot>
    </Wrapper>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {}

function WrappedApp({ Component, pageProps }) {
  const [theme, setTheme] = useRecoilState(themeState);
  const [storedTheme, setStoredTheme] = useStoredTheme();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setTheme(storedTheme);
  }, [storedTheme]);

  useEffect(() => {
    if (user) {
      console.log("user is already logged in.");
      return;
    }
    const token = getToken();
    if (!token) {
      console.log("token not found...");
      return;
    }

    getAxios()
      .post("/auth/validate", {
        token,
      })
      .then((res) => {
        setUser(res.data.payload.user);
        buildAxios();
        console.log("successfully logged in using localstorage token.");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          // if this exists the token is bad/malformed or edited.
          setToken("");
          console.log("token was malformed, or edited, resetting...");
        }
        if (err.response.data.error === "token is invalid") {
          setToken("");
          console.log("token was invalid.");
        }
      });
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NextNprogress color={theme.accentColor} startPosition={0.3} stopDelayMs={10}  height={3} />
        <PageContainer>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </PageContainer>
        <ToastContainer position={"bottom-right"} />
      </ThemeProvider>
    </>
  );
}

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
`;

const Wrapper = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default MyApp;
