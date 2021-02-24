import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

export default function Cancel() {


  const router = useRouter();

  

  return (
    <Wrapper>
      <ImageContainer>
      <Splash src={"/marketplace/static/splash/checkout_success_splash.svg"}/>
      </ImageContainer>
      <h1>Purchase Successful</h1>
      <h2>You have purchased ___</h2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2em;
  margin: 1em 0;
`;

const ImageContainer = styled.div`
  padding: 2em 0;
`

const Splash = styled.img`

  max-width: 550px;

  @media(max-width: 600px) {
    max-width: 200px;
  }
`

