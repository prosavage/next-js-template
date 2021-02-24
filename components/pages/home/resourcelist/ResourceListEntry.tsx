import styled from "styled-components";
import { DirectoryResource } from "../../../../types/Resource";
import ResourceIcon from "../../../ui/ResourceIcon";
import Link from "next/link";
import { themeState } from "../../../../atoms/theme";
import timeago from "time-ago";
import { useRecoilValue } from "recoil";
import renderReviewDroplets from "../../../../util/Review";
import PropsTheme from "../../../../styles/theme/PropsTheme";
import FadeDiv from "../../../ui/FadeDiv";

function ResourceListEntry(props: { resource: DirectoryResource }) {
  const theme = useRecoilValue(themeState);

  return (
    <Wrapper>
        <ResourceIcon resource={props.resource} size={"75px"} />
      <Metadata>
        <ResourceInfo>
          <TitleArea>
            <Link
              href={`/resources/[id]`}
              as={`/resources/${props.resource._id}`}
            >
              <ResourceTitle>{props.resource.name}</ResourceTitle>
            </Link>
            <Link
              href={`/users/[id]`}
              as={`/users/${props.resource.owner?._id}`}
            >
              <AuthorLink>{props.resource.owner?.username}</AuthorLink>
            </Link>
          </TitleArea>
          <Description>{props.resource.description}</Description>
        </ResourceInfo>
        <ResourceStats>
          <Review>
            <ReviewDropsContainer>
              {renderReviewDroplets(theme, props.resource.rating)}
            </ReviewDropsContainer>
            <ReviewCount>
              {new Intl.NumberFormat().format(props.resource.reviewCount)}{" "}
              ratings
            </ReviewCount>
          </Review>
          <DataEntryBottom>
            <DataEntry>
              <Label>Downloads:</Label>
              <Label>
                {new Intl.NumberFormat().format(props.resource.downloads)}
              </Label>
            </DataEntry>
            <DataEntry>
              <Label>Updated:</Label>
              <Label>{timeago.ago(props.resource.updated)}</Label>
            </DataEntry>
          </DataEntryBottom>
        </ResourceStats>
      </Metadata>
    </Wrapper>
  );
}

export default ResourceListEntry;

const Wrapper = styled(FadeDiv)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
`;

const ResourceTitle = styled.h2`
  transition: 250ms ease-in-out;
  &:hover {
    color: ${(props: PropsTheme) => props.theme.accentColor};
  }
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 1em;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const ResourceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const AuthorLink = styled.p`
  color: ${(props: PropsTheme) => props.theme.secondaryAccentColor};
  font-size: 10px;
  line-height: 13px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ResourceStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 12rem;

  @media (max-width: 650px) {
    min-width: auto;
  }
`;

const Review = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ReviewDropsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 0.5em;
`;

const ReviewCount = styled.p`
  font-size: 14px;
`;

const DataEntry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DataEntryBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;
