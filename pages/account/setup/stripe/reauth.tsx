import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import getAxios from "../../../../util/AxiosInstance";
import useToast from "../../../../util/hooks/useToast";

export default function Reauth() {


  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    connectStripe();
  }, [])

  const connectStripe = () => {
    getAxios().get(`/checkout/stripe/setup/create`).then(res => {
      router.push(res.data.payload.accountLink.url);
    }).catch(err => {
      console.log(err.response.data)
      toast("Something went wrong...")
    })
  }

  return (
    <Wrapper>
      <ImageContainer>
      <Splash src={"/marketplace/static/splash/stripe_error_splash.svg"}/>
      </ImageContainer>
      <h1>Whoops!</h1>
      <h2>Stripe Link was expired/visited.</h2>
      <p>Redirecting to stripe...</p>
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

  max-width: 450px;

  @media(max-width: 600px) {
    max-width: 200px;
  }
`