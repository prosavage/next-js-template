import Head from "next/head";
import styled from "styled-components";
import FeaturedPlugins from "../components/pages/home/featured/FeaturedPlugins";
import ResourcesView from "../components/pages/home/ResourcesView";
import SubNavbar from "../components/pages/home/SubNavbar";
import { ResourceType } from "../types/Resource";
export default function Home() {
  return (
    <>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Marketplace" />
      </Head>
      <SubNavbar />
      <Wrapper>
        <FeaturedPlugins />
        <ResourcesView type={ResourceType.PLUGIN} category={undefined} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 2em;
  margin: 1em 0;
`;
