import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../atoms/user";
import ProfilePicture from "../components/pages/account/ProfilePicture";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import getAxios from "../util/AxiosInstance";
import useToast from "../util/hooks/useToast";
import { setToken } from "../util/TokenManager";
import SecondaryButton from "./../components/ui/Secondarybutton";

export default function Account(props) {
  const [user, setUser] = useRecoilState(userState);

  const [account, setAccount] = useState<any>();

  const router = useRouter();

  const toast = useToast();

  const connectStripe = () => {
    getAxios()
      .get(`/checkout/stripe/setup/create`)
      .then((res) => {
        router.push(res.data.payload.accountLink.url);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Something went wrong...");
      });
  };

  const logout = () => {
    setToken("");
    setUser(undefined);
    getAxios().post("/auth/logout");
    router.push("/");
  };

  useEffect(() => {
    getAxios()
      .get("/checkout/stripe/setup/verify")
      .then((res) => {
        if (res.data.payload.account!!.charges_enabled) {
          setAccount("Payments are enabled.");
        } else {
          setAccount("Payments DISABLED, reconnect stripe.");
        }
      })
      .catch((err) => {
        setAccount(err.response.data.error);
      });
  }, [user]);

  const getStripeIntegration = () => {
    if (account === undefined) {
      return <p>Loading stripe account info...</p>;
    } else {
      return (
        <>
          <p>Stripe Integration:</p>
          <p>{account}</p>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>User - Marketplace</title>
        <meta name="description" content="Account Page" />
      </Head>
      <Wrapper>
        <VSpace>
          <h1>Account</h1>
          <hr />
        </VSpace>
        <VSpace>
          <Row>
            <ProfilePicture/>
          </Row>
          <Row>
            <SecondaryButton onClick={logout}>LOG OUT</SecondaryButton>
          </Row>
        </VSpace>
        <VSpace>
          <h1>Payments</h1>
          <hr />
        </VSpace>
        <VSpace>
          <Row>
            Stripe Integration:{" "}
            <Button onClick={connectStripe}>Connect Stripe</Button>
          </Row>
          <Row>{getStripeIntegration()}</Row>
        </VSpace>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`;

const VSpace = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 0;
`;
