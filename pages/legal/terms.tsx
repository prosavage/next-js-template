import Head from "next/head";
import styled from "styled-components";
import LegalNavbar from "../../components/pages/legal/LegalNavbar"
import PropsTheme from "../../styles/theme/PropsTheme";
export default function Terms() {
  return (
    <>
    <Head>
      <title>Legal - Terms & Conditions</title>
      <meta name="description" content="Terms and Conditions" />
    </Head>
    <LegalNavbar />
      <Wrapper>
          <h1>Terms & Conditions</h1>
          /*
            Effective (date) // last Updated: (date)

            What is convered in these Terms

            Age Requirments

            Privacy
              View our privacy policy

            Our relationship
              What you can expect from us
              what we expect from you

            Using our platform
              Your account
              Organizations/Teams

            Content
              our Content
              your content
              OWNERSHIP
              others content
              Downloads
              Subscriptions
              Copyright
              Piracy
              License Terms
              Updates
              Ratings/Reviews

            Purchases/Payment
              Returns
              Support
              Disputes

            In case of problems or disagreements
              Disclaimers
              Liabilities
                For Users
                For Organizations
              Taking Action
                Removing your content
                Suspending or termiating access to our platform
              Settling diputes, govering law and courts

              About These terms

           */
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 2em;
  margin: 1em 0;
`;

