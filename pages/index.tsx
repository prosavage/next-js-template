import Head from 'next/head';
import Button from '../components/ui/Button'
import styled from "styled-components";
export default function Home() {
  <Head>
      <title>Next-JS Template</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Next-JS Template Home"></meta>
    </Head>
  return (
    <Wrapper>
      <h2>ProSavage's NextJS Template Application</h2>
      <p>Features</p>
      <ul>
        <li>TypeScript based.</li>
        <li>Preconfigured styled-components</li>
        <li>Dark & Lightmode using theme providers.</li>
        <li>Premade responsive navbar</li>
      </ul>
      <Button>Button</Button>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  padding: 4em;
`
