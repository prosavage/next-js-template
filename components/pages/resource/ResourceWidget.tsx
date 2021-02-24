import React, { ReactFragment } from "react";
import { TrendingUp } from "react-feather";
import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";

export default function ResourceWidget(props: {
  header: string;
  children: ReactFragment;
}) {
  return (
    <Wrapper>
      <PluginInfoHeader>
        <WidgetIcon />
        <WidgetHeader>{props.header}</WidgetHeader>
      </PluginInfoHeader>
      <InfoDataContainer>
        {props.children}
      </InfoDataContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1em;
`;

const PluginInfoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
  background: ${(props: PropsTheme) => props.theme.accentColor};
  color: black;
`;

const InfoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const WidgetHeader = styled.h3`
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
`

const WidgetIcon = styled(TrendingUp)`
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
  margin: 0 1em
`
export const PluginInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
