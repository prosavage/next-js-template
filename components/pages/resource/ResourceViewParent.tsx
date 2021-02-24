import { useRouter } from "next/router";
import React, { ReactFragment, useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import styled, { css } from "styled-components";
import ResourceHeader from "./ResourceHeader";
import Button from "../../ui/Button";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { Resource } from "../../../types/Resource";
import { User } from "../../../types/User";
import { Version } from "../../../types/Version";
import getAxios from "../../../util/AxiosInstance";
import PluginInfo from "./PluginInfo";
import ResourceThread from "./ResourceThread";
import DiscordInfo from "./DiscordInfo";
import ResourceRating from "./ResourceRating";
import { useRecoilValue } from "recoil";
import { userState } from "../../../atoms/user";
import { Category } from "../../../types/Category";

const resourceViews = [
  { label: "thread", href: "", admin: false },
  { label: "versions", href: "versions", admin: false },
  { label: "update", href: "update", admin: true },
  { label: "icon", href: "icon", admin: true },
  { label: "edit", href: "edit", admin: true },
];

export default function ResourceId({
  children,
  resource,
  author,
  versions,
  category,
}: {
  category: Category;
  children: ReactFragment;
  resource: Resource;
  author: User;
  versions: Version[];
}) {
  const router = useRouter();

  const user = useRecoilValue(userState);

  const viewerOwnsResource = () => {
    // both can be undefined if loading, and return true, causing a flicker.
    if (!resource || !user) return false;
    return resource?.owner === user?._id;
  };

  const getFirstVersion = () => {
    return versions[versions.length - 1];
  };

  const renderViewController = () => {
    return (
      <ViewController>
        {resourceViews
          .filter((e) => !(!viewerOwnsResource() && e.admin))
          .map((entry) => (
            <ViewEntry
              key={entry.label}
              //   selected={view === viewEntry.toLowerCase()}
              selected={undefined}
              onClick={() =>
                router.push(`/resources/${resource._id}/${entry.href}`)
              }
            >
              {entry.label.toUpperCase()}
            </ViewEntry>
          ))}
      </ViewController>
    );
  };

  return (
    <Wrapper>
      <div>
        <BackButton
          onClick={() =>
            router.push(
              `/directory/resources/${category.type}/${category.name}`
            )
          }
        >
          <BackArrow size={"15px"} /> <ButtonText>Return to plugins</ButtonText>
        </BackButton>
      </div>
      <ResourceContentContainer>
        <ResourceBody>
          <ResourceHeader
            resource={resource}
            version={versions[0]}
            onVersionPress={() => {
              router.push(`/resources/${resource._id}/versions`);
            }}
          />
          {renderViewController()}
          {children}
          <ResourceRating resource={resource} />
        </ResourceBody>
        <MetadataContainer>
          <PluginInfo
            author={author}
            resource={resource}
            firstVersion={getFirstVersion()}
          />
          <DiscordInfo discordServerId={author?.discordServerId} />
        </MetadataContainer>
      </ResourceContentContainer>
    </Wrapper>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id as string;

  return { props: { id } };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2em;
`;

const BackButton = styled(Button)`
  width: auto;
  padding: 12px 20px !important;
  color: black !important;
  background: ${(props: PropsTheme) => props.theme.accentColor} !important;
  box-shadow: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BackArrow = styled(ArrowLeft)`
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
`;

const ButtonText = styled.p`
  margin: 0 0.5em;
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
`;

const ResourceContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2em 0;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const ResourceBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
`;

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  margin: 0 1em;
`;

const ViewController = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  margin-top: 1em;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
`;

const ViewEntry = styled.p`
  padding: 0 0.5em;
  transition: 250ms ease-in-out;
  cursor: pointer;

  ${(props: { selected: boolean | undefined }) =>
    props.selected &&
    css`
      color: ${(props: PropsTheme) => props.theme.secondaryAccentColor};
    `}

  &:hover {
    color: ${(props: PropsTheme) => props.theme.secondaryAccentColor};
  }
`;
