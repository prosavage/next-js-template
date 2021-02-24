import React from "react";
import styled from "styled-components";
import Button from "../../../../components/ui/Button";

export default function Return() {
  return (
    <Wrapper>
      <VSpace>
      <Splash height={"450px"} src={"/marketplace/static/splash/stripe_success_splash.svg"}/>

      </VSpace>
      <h1>Success!</h1>
      <h2>Stripe is now successfully setup.</h2>
      <VSpace>
      <Button>Dashboard</Button>
      </VSpace>
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

const VSpace = styled.div`
  padding: 2em 0;
`
const Splash = styled.img`

max-width: 450px;

@media(max-width: 600px) {
  max-width: 200px;
}
`




