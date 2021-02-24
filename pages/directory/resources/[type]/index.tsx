import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import ResourcesView from "../../../../components/pages/home/ResourcesView";
import SubNavbar from "../../../../components/pages/home/SubNavbar";
import { Resource, ResourceType } from "../../../../types/Resource";
import getAxios from "../../../../util/AxiosInstance";

export default function Resources(props: { type: ResourceType }) {
 
  return (
    <>
    <Head>
      <title>{props.type} - Resources</title>
      <meta name="description" content={props.type + "Resources"} />
    </Head>
      <SubNavbar />
      <Wrapper>
        <ResourcesView type={props.type} category={undefined}/>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const resourceType = params.type as string;
  const resType = resourceType as ResourceType;
  return { props: { type: resType } };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 2em;
  margin: 1em 0;
`;
