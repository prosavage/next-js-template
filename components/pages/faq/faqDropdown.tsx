import styled from "styled-components";
import { useState } from "react";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { ChevronDown, ChevronUp } from "react-feather";

export default function faqDropdown(props) {

  const [toggled, setToggled] = useState(false);

  return (
    <>
      <Box>
        <QuestionWrapper>
          <Question>{props.question}</Question>
          <ButtonWrapper>
            {!toggled &&
            <ChevronDown style={{color: `${(props: PropsTheme) => props.theme.color}`}} size="24px" onClick={() => setToggled(!toggled)}/>
            }
            {toggled &&
            <ChevronUp style={{color: `${(props: PropsTheme) => props.theme.color}`}} size="24px" onClick={() => setToggled(false)}/>
            }
          </ButtonWrapper>
        </QuestionWrapper>
        {toggled &&
        <AnswerWrapper>
          <Answer>{props.answer}</Answer>
        </AnswerWrapper>
        }
      </Box>
      <br />
    </>
  );
}

const Box = styled.div`
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 8px;
`
const QuestionWrapper = styled.div`
  display: flex;
`
const Question = styled.h3`
  display: flex;
  flex: 0 0 50%;
  justify-content: flex-start;
  font-weight: 600;
  padding-left: 10px;
`
const AnswerWrapper = styled.div`
  border-top: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
`
const Answer = styled.p`
  padding-left: 20px;
`
const ButtonWrapper = styled.div`
  display: flex;
  flex: 0 0 50%;
  justify-content: flex-end;
  padding-right: 10px;
`