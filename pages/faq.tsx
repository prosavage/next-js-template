import Head from "next/head";
import styled from "styled-components";
import PropsTheme from "../styles/theme/PropsTheme";
import Dropdown from "../components/pages/faq/faqDropdown"

const faqs = [
  {
    question: "Question #1",
    answer: "Answer #1"
  },
  {
    question: "Question #2",
    answer: "Answer #2"
  },
  {
    question: "Question #3",
    answer: "Answer #3"
  },
  {
    question: "Question #4",
    answer: "Answer #4"
  },
  {
    question: "Question #5",
    answer: "Answer #5a"
  },
];

export default function FAQ(props) {

  const getFAQs = () => {
    return faqs.map((entry) => {
      return (
        <Dropdown question={entry.question} answer={entry.answer} />
      );
    });
  };

  return (
    <>
    <Head>
      <title>FAQ - Marketplace</title>
      <meta name="description" content="Frequently Asked Questions" />
    </Head>
      <Wrapper>
          {getFAQs()}
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