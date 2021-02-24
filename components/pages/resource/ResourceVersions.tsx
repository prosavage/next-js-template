import { useRouter } from "next/router";
import { useEffect, useState, version } from "react";
import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { Resource } from "../../../types/Resource";
import { Version } from "../../../types/Version";
import getAxios from "../../../util/AxiosInstance";
import { ArrowLeft, ArrowRight } from "react-feather";
import ResourceVersionEntry from "./ResourceVersionEntry";

export default function ResourceVersions({
  resource,
  onVersionSelect,
}: {
  onVersionSelect: (version: Version) => void;
  resource: Resource | undefined;
}) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!resource) return;
    getAxios()
      .get(`/directory/versions/resource/${resource._id}/${page}`)
      .then((res) => setVersions(res.data.payload.versions))
      .catch((err) => console.log(err.response.data));
  }, [page, resource]);

  const renderPageControls = () => {
    return (
      <PageControlsWrapper>
        <BackArrow
          onClick={() => {
            if (page <= 1) {
              return;
            }
            setPage(page - 1);
          }}
        >
          &larr;
        </BackArrow>
        <CenterContainer>{page}</CenterContainer>
        <ForwardArrow onClick={() => setPage(page + 1)}>&rarr;</ForwardArrow>
      </PageControlsWrapper>
    );
  };

  return (
    <Wrapper>
      <Header>
        <h2>Versions</h2>
        {renderPageControls()}
      </Header>
      {versions.length > 0 ? (
        versions.map((entry) => (
          <ResourceVersionEntry
            resource={resource}
            onVersionSelect={onVersionSelect}
            key={entry._id}
            version={entry}
          />
        ))
      ) : (
        <p>No versions found.</p>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
  margin: 1em 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`;

const PageControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
`;

const BackArrow = styled(ArrowLeft)`
  cursor: pointer;
  transition: 250ms ease-in-out;
  &:hover {
    stroke-width: 3;
  }
`;
const ForwardArrow = styled(ArrowRight)`
  cursor: pointer;
  transition: 250ms ease-in-out;
  &:hover {
    stroke-width: 3;
  }
`;

const CenterContainer = styled.div`
  margin: 0 1em;
  display: flex;
`;
