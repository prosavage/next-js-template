import { Tag } from "bbcode-to-react";
import styled from "styled-components";
import PropsTheme from "../../styles/theme/PropsTheme";

class LeftTag extends Tag {
    constructor(renderer, settings = {}) {
        super(renderer, settings);
      }
    toReact() {
        return <Wrapper>
            {this.getComponents()}
        </Wrapper>
    }
}


const Wrapper = styled.div`
    width: 100%;
    text-align: left;
    color: ${(props: PropsTheme) => props.theme.color};
`

export default LeftTag;