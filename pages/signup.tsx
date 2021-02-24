import React, { useState } from "react";
import { Check, X } from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Input from "../components/ui/Input";
import { themeState } from "../atoms/theme";
import PropsTheme from "../styles/theme/PropsTheme";
import {
  containsNumbers,
  containsSpecialCharacters,
  hasPasswordLength,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../util/Validation";
import Link from "next/link";
import Button from "../components/ui/Button";
import getAxios, { buildAxios } from "../util/AxiosInstance";
import { setToken } from "../util/TokenManager";
import { userState } from "../atoms/user";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Signup(props) {
  const theme = useRecoilValue(themeState);

  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");

  const renderStatus = (state: boolean) => {
    return state ? <Check color={theme.accentColor} /> : <X color={"red"} />;
  };

  const signup = () => {
    if (
      !validateUsername(username) ||
      !validatePassword(password) ||
      !validateEmail(email)
    ) {
      return;
    }

    getAxios()
      .post("/auth/signup", {
        email,
        username,
        password,
      })
      .then((res) => {
        setToken(res.data.payload.token);
        setUser(res.data.payload.user);
        buildAxios();
        router.push("/");
      })
      .catch((err) => setErr(err.response.data.error));
  };

  return (
    <>
    <Head>
      <title>Signup - Marketplace</title>
      <meta name="description" content="Create an Account" />
    </Head>
    <Wrapper>
      <SignupContainer>
        <Header>Create account</Header>
        <Link href={"/login"}>
          <p>
            Already have an account? <SignIn>Log in</SignIn>
          </p>
        </Link>
        <Error>{err}</Error>
        <VerticalMarginContainer>
          <label>EMAIL ADDRESS</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder={"Enter an email address"}
            invalid={!validateEmail(email)}
          />
        </VerticalMarginContainer>
        <VerticalMarginContainer>
          <label>USERNAME</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder={"Enter a cool username"}
            invalid={!validateUsername(username)}
          />
        </VerticalMarginContainer>
        <VerticalMarginContainer>
          <label>PASSWORD</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={"Enter a password"}
            invalid={!validatePassword(password)}
          />
        </VerticalMarginContainer>
        <VerticalMarginContainer>
          <label>CONFIRM PASSWORD</label>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder={"Enter your password again"}
            invalid={
              !(validatePassword(password) && confirmPassword === password)
            }
          />
        </VerticalMarginContainer>
        <VerticalMarginContainer>
          <RequirementsContainer>
            <label>SIGNUP REQUIREMENTS:</label>
            <VerticalMarginContainer style={{ marginTop: "1em" }}>
              <RequirementEntry>
                {renderStatus(validateEmail(email))}
                <RequirementText>Email must be valid.</RequirementText>
              </RequirementEntry>
              <RequirementEntry>
                {renderStatus(validateUsername(username))}
                <RequirementText>
                  Username must be between 3 - 20 characters long.
                </RequirementText>
              </RequirementEntry>
              <RequirementEntry>
                {renderStatus(hasPasswordLength(password))}
                <RequirementText>
                  Password must be at least 8 characters long
                </RequirementText>
              </RequirementEntry>
              <RequirementEntry>
                {renderStatus(containsSpecialCharacters(password))}
                <RequirementText>
                  Password must contain atleast one special character
                </RequirementText>
              </RequirementEntry>
              <RequirementEntry>
                {renderStatus(containsNumbers(password))}
                <RequirementText>
                  Password must contain atleast one number
                </RequirementText>
              </RequirementEntry>
              <RequirementEntry>
                {renderStatus(
                  password.length > 0 && password === confirmPassword
                )}
                <RequirementText>Passwords must match</RequirementText>
              </RequirementEntry>
            </VerticalMarginContainer>
          </RequirementsContainer>
        </VerticalMarginContainer>
        <VerticalMarginContainer>
          <input type="checkbox" id="test1" />
          <label htmlFor="test1">
            I agree to Marketplace's <SignIn>Terms of Service</SignIn> and{" "}
            <SignIn>Privacy Policy</SignIn>
          </label>
        </VerticalMarginContainer>
        <VerticalMarginContainer>
          <ButtonWrapper>
          <SignUpButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              signup();
            }}
          >
            Create my account
          </SignUpButton>
          </ButtonWrapper>
        </VerticalMarginContainer>
      </SignupContainer>
    </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Header = styled.h1`
  font-size: 56px;
`;

const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2em;
`;

const SignIn = styled.span`
  cursor: pointer;
  color: ${(props: PropsTheme) => props.theme.accentColor};
`;

const VerticalMarginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  width: 100%;
`;
const RequirementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
`;

const RequirementEntry = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RequirementText = styled.p`
  padding: 0 0.5em;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SignUpButton = styled(Button)`
  width: 75%;
  color: ${(props: PropsTheme) => props.theme.accentColor} !important;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.18);
  padding: 12px !important;

  transition: 500ms ease-in-out;
  &:hover {
    color: ${(props: PropsTheme) => props.theme.secondaryAccentColor} !important;
  }
`;

const Error = styled.p`
  color: ${(props: PropsTheme) => props.theme.errorColor};
`;
