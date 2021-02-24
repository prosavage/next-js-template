import { Tag } from "bbcode-to-react";
import styled from "styled-components";
import PropsTheme from "../../styles/theme/PropsTheme";

class QuoteTag extends Tag {
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
    border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
    color: ${(props: PropsTheme) => props.theme.color};
    padding: 0.5em;
    border-radius: 4px;
    margin: 1em 0;
`

export default QuoteTag;