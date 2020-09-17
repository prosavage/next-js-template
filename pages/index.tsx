import Head from 'next/head'
import styled from "styled-components";
export default function Home() {
  return (
    <Wrapper>
      <h2>ProSavage's NextJS Template Application</h2>
      <p>Features</p>
      <ul>
        <li>TypeScript based.</li>
        <li>Preconfigured styled-components</li>
        <li>Dark & Lightmode using theme providers.</li>
        <li>Premade resposive navbar</li>

      </ul>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  padding: 4em;
`
