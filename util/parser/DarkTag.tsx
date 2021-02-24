import { Tag } from "bbcode-to-react";
import styled, { css } from "styled-components";
import DarkTheme from "../../styles/theme/DarkTheme";
import LightTheme from "../../styles/theme/LightTheme";
import PropsTheme from "../../styles/theme/PropsTheme";

class DarkTag extends Tag {
  constructor(renderer, settings = {}) {
    super(renderer, settings);
  }
  toReact() {
    return <Wrapper>{this.getComponents()}</Wrapper>;
  }
}

const Wrapper = styled.div`
  ${(props) =>
    props.theme === LightTheme &&
    css`
      display: none;
    `}
`;

export default DarkTag;
