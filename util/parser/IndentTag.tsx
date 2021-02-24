import { Tag } from "bbcode-to-react";
import styled, { css } from "styled-components";

class IndentTag extends Tag {
  constructor(renderer, settings = {}) {
    super(renderer, settings);
  }
  toReact() {
    return <Wrapper>{this.getComponents()}</Wrapper>;
  }
}

const Wrapper = styled.div`
  padding-left: 25px;
`;

export default IndentTag;
