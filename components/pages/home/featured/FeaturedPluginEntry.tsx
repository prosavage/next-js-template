import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tilt from 'react-parallax-tilt';
import PropsTheme from "../../../../styles/theme/PropsTheme";
import { DirectoryResource, Resource } from "../../../../types/Resource";
import ResourceIcon from "../../../ui/ResourceIcon";
import AuthorIcon from "../../../ui/AuthorIcon";

export default function FeaturedPluginEntry(props: { resource: DirectoryResource }) {

    const router = useRouter();

    const [author, setAuthor] = useState("ProSavage")

    useEffect(() => {
        setAuthor("ProSavage");
    }, [])
    
    return (
      <Tilt
        tiltReverse={true}
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        transitionSpeed={2800}
        scale={1.05}
      >
        <Wrapper onClick={() => router.push(`/resources/${props.resource._id}`)}>
            <ResourceIconWrapper>
                <ResourceIcon resource={props.resource} size={"75px"} />
            </ResourceIconWrapper>
            <RightWrapper>
                <TextWrapper>
                    <h3>{props.resource.name}</h3>
                    <DescText>{props.resource.description}</DescText>
                </TextWrapper>
                <AuthorWrapper onClick={() => router.push(`/users/${props.resource.owner}`)}>
                    <AuthorIcon size={"25px"} user={props.resource.owner}/>
                    <AuthorName>{author}</AuthorName>
                </AuthorWrapper>
            </RightWrapper>
        </Wrapper>
        </Tilt>
    )
}

const Wrapper = styled.div`
  display: flex;  
  align-items: center;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
  padding: .5em;
  background: ${(props: PropsTheme) => props.theme.backgroundPrimary};
  max-width: 300px;
  margin: 5px 0;
  cursor: pointer;


/* parent container will put it into column, so use all width. */
  @media(max-width: 800px) {
    width: 100%;
    max-width: 100%;
  }

`

const ResourceIconWrapper = styled.div`
    margin: .5em 0.75em;
    @media(max-width: 500px) {
        display: none;
    }
`

const TextWrapper = styled.div`
  margin-bottom: .2rem;
  word-break: break-word;
`


const DescText = styled.p`
  font-size: 13px;
  line-height: 1.2em;
  color: ${(props: PropsTheme) => props.theme.color}
`

const AuthorWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  bottom: 0;
`

const TempAuthorIcon = styled.div`
  border-radius: 50%;
  height: 24px;
  width: 24px;
  background: ${(props: PropsTheme) => props.theme.accentColor};
  color: ${(props: PropsTheme) => props.theme.accentColor}
`

const AuthorName = styled.p`
  margin-left: .5em;
  font-size: 13px;
  line-height: 2em;
  text-decoration: none;
`

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    width: 100%;
`