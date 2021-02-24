import { useEffect, useState } from "react";
import styled from "styled-components";
import PropsTheme from "../../../../styles/theme/PropsTheme";
import { DirectoryResource, Resource } from "../../../../types/Resource";
import getAxios from "../../../../util/AxiosInstance";
import FeaturedPluginEntry from "./FeaturedPluginEntry";

export default function FeaturedPlugins() {
  const [resources, setResources] = useState<DirectoryResource[]>([]);

  useEffect(() => {
    getAxios()
      .get(`/directory/featured`)
      .then((res) => {
        setResources(res.data.payload.resources);
        console.log(res.data.payload.resources)
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  return (
    <Wrapper>
      <Header>
        <h2>Featured Plugins</h2>
      </Header>
      <ContentWrapper>
        {resources.map((entry) => (
          <FeaturedPluginEntry key={entry._id} resource={entry} />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  /* box-shadow: 0px 7px 16px rgba(168, 168, 168, 0.22); */
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
`;

const Header = styled.div`
  padding: 1em 1.5em;
  background: ${(props: PropsTheme) => props.theme.accentColor};
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
`;

const ContentWrapper = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  background: ${(props: PropsTheme) => props.theme.backgroundSecondary};
  border-radius: 0 0 4px 4px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
