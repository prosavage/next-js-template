import { versions } from "process";
import React from "react";
import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { Resource } from "../../../types/Resource";
import { Version } from "../../../types/Version";
import getAxios from "../../../util/AxiosInstance";
import getStripe from "../../../util/GetStripe";
import Button from "../../ui/Button";
import ResourceIcon from "../../ui/ResourceIcon";
import FileDownload from "js-file-download";
import useToast from "../../../util/hooks/useToast";
import { loadStripe } from "@stripe/stripe-js";

export default function ResourceHeader(props: {
  resource: Resource;
  version: Version | undefined;
  onVersionPress: () => void;
}) {
  const renderButtons = () => {
    let text;
    if (props.resource?.price === 0) {
      text = "Download";
    } else {
      text = `$${props.resource?.price}`;
    }

    return (
      <>
        <DownloadButton onClick={() => onDownload()}>
          <p>{text}</p>
        </DownloadButton>
        <VersionButton onClick={() => props.onVersionPress()}>
          <p>Versions</p>
        </VersionButton>
      </>
    );
  };

  const toast = useToast();

  const onDownload = async () => {
    if (props.resource?.price > 0) {
      getAxios()
        .get(`/checkout/session/${props.resource?._id}`)
        .then(async (res) => {
          console.log(res.data)
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
          );
          stripe.redirectToCheckout({sessionId: res.data.payload.session.id}).then(res => console.log(res.error.message));
        }).catch(err => console.log(err.response));
    } else {
      download();
    }
  };

  const download = () => {
    getAxios()
      .get(`directory/versions/download/${props.version?._id}`)
      .then((res) =>
        FileDownload(
          res.data,
          `${props.resource?.name}-${props.version?.version}.jar`
        )
      )
      .catch((err) => {
        toast(err.response.data.error);
      });
  };

  return (
    <>
      <TitleContainer>
        <ResourceIcon resource={props.resource} size={"100px"} />
        <ContentContainer>
          <TextContainer>
            <HeaderContainer>
              <h1>{props.resource?.name}</h1>
              <VersionText>v{props.version?.version}</VersionText>
            </HeaderContainer>
            <Description>{props.resource?.description}</Description>
          </TextContainer>
          <DesktopButtonContainer>{renderButtons()}</DesktopButtonContainer>
        </ContentContainer>
      </TitleContainer>
      <MobileButtonContainer>{renderButtons()}</MobileButtonContainer>
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  padding: 1em;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
  width: 100%;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  margin: 0 1em;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

const Description = styled.p`
  line-height: 14px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  @media (max-width: 550px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const VersionText = styled.p`
  margin: 0 1em;

  @media (max-width: 550px) {
    margin: 0;
  }
`;
const DownloadButton = styled(Button)`
  background: ${(props: PropsTheme) => props.theme.oppositeColor} !important;
  color: ${(props: PropsTheme) => props.theme.accentColor} !important;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.28);
  padding: 10px 10px !important;
  margin: 0.5em 0;

  @media (max-width: 600px) {
    margin: 1em 0;
    width: 100%;
  }
`;

const VersionButton = styled(Button)`
  background: ${(props: PropsTheme) => props.theme.oppositeColor} !important;
  color: ${(props: PropsTheme) => props.theme.color} !important;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.28);
  padding: 10px 10px !important;
  margin: 0.5em 0;

  @media (max-width: 600px) {
    margin: 1em 0;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileButtonContainer = styled(ButtonContainer)`
  @media (min-width: 600px) {
    display: none;
  }
`;

const DesktopButtonContainer = styled(ButtonContainer)`
  @media (max-width: 600px) {
    display: none;
  }
`;
