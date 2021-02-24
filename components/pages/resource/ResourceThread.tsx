import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { Resource } from "../../../types/Resource";
import parser from "./../../../util/parser/Parser";


export default function ResourceThread(props: {
  resource: Resource | undefined;
}) {

  return <Wrapper>{parser.toReact(props.resource?.thread ? props.resource?.thread : "")}</Wrapper>;
}

const Wrapper = styled.div`
  padding: 1em;
  margin: 1em 0;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;

  img {
    width: 100%;
  }

  * > img {
    width: 100%;
  }
`;
