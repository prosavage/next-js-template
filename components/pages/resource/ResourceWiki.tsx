import styled from "styled-components"
import PropsTheme from "../../../styles/theme/PropsTheme"

export default function ResourceWiki() {
    return <Wrapper>
        <p>Coming soon...</p>
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    border-radius: 4px;
    margin: 1em 0;
    border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
`