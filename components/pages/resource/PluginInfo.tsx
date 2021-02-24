import React from "react";
import { TrendingUp } from "react-feather";
import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { Resource } from "../../../types/Resource";
import { Version } from "../../../types/Version";
import renderReviewDroplets from "../../../util/Review";
import { useRecoilValue } from "recoil";
import { themeState } from "../../../atoms/theme";
import ResourceWidget, { PluginInfoRow } from "./ResourceWidget";
import timeago from "time-ago";
import { User } from "../../../types/User";
import Link from "next/link";

export default function PluginInfo(props: {
  author: User | undefined;
  resource: Resource | undefined;
  firstVersion: Version | undefined;
}) {
  const theme = useRecoilValue(themeState);

  return (
    <ResourceWidget header={"PLUGIN INFO"}>
      <PluginInfoRow>
        <p>Author:</p>{" "}
        <Link href={`/users/[id]`} as={`/users/${props.author?._id}`}>
          <AuthorLink>{props.author?.username}</AuthorLink>
        </Link>
      </PluginInfoRow>
      <PluginInfoRow>
        <p>Downloads:</p>
        <p>{new Intl.NumberFormat().format(props.resource?.downloads)}</p>
      </PluginInfoRow>
      <PluginInfoRow>
        <p>Released:</p>
        <p>{timeago.ago(props.firstVersion?.timestamp)}</p>
      </PluginInfoRow>
      <PluginInfoRow>
        <p>Updated:</p>
        <p>{timeago.ago(props.resource?.updated)}</p>
      </PluginInfoRow>
      <PluginInfoRow>
        <p>Rating:</p>
        <DropletsContainer>{renderReviewDroplets(theme, props.resource?.rating)}</DropletsContainer>
      </PluginInfoRow>
    </ResourceWidget>
  );
}

const DropletsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorLink = styled.p`
  color: ${(props: PropsTheme) => props.theme.secondaryAccentColor};
  cursor: pointer;
`;
