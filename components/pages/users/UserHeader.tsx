import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { User, UserStats } from "../../../types/User";
import useToast from "../../../util/hooks/useToast";
import AuthorIcon from "../../ui/AuthorIcon";
import Button from "../../ui/Button";

export default function UserHeader(props: {
  user: User | undefined;
  stats: UserStats | undefined;
}) {

  const toast = useToast();

  return (
    <Wrapper>
      <ImgContainer>
        <AuthorIcon user={props.user} size={"220px"} />
      </ImgContainer>
      <TextContainer>
        <MetaContainer>
          <MetaSubContainer>
            <Header>{props.user?.username}</Header>
            <Date>Member since April 1, 2020</Date>
          </MetaSubContainer>
          <StatsContainer>
            <Stat>
              <h2>
                {props.stats?.resourceCount
                  ? new Intl.NumberFormat().format(props.stats?.resourceCount)
                  : 0}
              </h2>
              <StatText>RESOURCES</StatText>
            </Stat>
            <Stat>
              <h2>
                {props.stats?.downloads
                  ? new Intl.NumberFormat().format(props.stats?.downloads)
                  : 0}
              </h2>
              <StatText>DOWNLOADS</StatText>
            </Stat>
            <Stat>
              <h2>
                {props.stats?.avgReviewScore
                  ? props.stats?.avgReviewScore.toFixed(3)
                  : 0}
              </h2>
              <StatText>RATING</StatText>
            </Stat>
          </StatsContainer>
        </MetaContainer>
        <ReportButton onClick={() => toast("Coming soon!")}>Report</ReportButton>
      </TextContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  padding: 1.5em;
  margin: 1em 0;
  border-radius: 4px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Header = styled.h1`
  font-size: 44px;
  line-height: 40px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2em 0.5em;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 35%;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0.5em;
`;

const MetaSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;

  @media (max-width: 800px) {
    justify-content: center;
    text-align: center;
    padding: 0.5em 0;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 2em;

  @media (max-width: 800px) {
    text-align: center;
    padding: 0.5em 0;
  }
`;

const ReportButton = styled(Button)`
  padding: 17.5px 27.5px !important;
  align-self: flex-start;
  margin: 1em 0;

  @media (max-width: 800px) {
    align-self: auto;
  }
`;

const StatText = styled.p`
  font-weight: 200;
`;

const Date = styled.p`
  font-weight: 200;
`;
