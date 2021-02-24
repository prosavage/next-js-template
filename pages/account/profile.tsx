import styled from "styled-components";

export default function Profile() {
  return (
    <Wrapper>
      <h2>Profile</h2>
      <hr />
      <p>Yeah</p>
    </Wrapper>
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


