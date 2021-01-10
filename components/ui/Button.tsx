import styled, { css } from "styled-components";
import PropsTheme from "../../styles/theme/PropsTheme";

const Button = (props) => {
  return <StyledButton secondary={props.secondary}>{props.children}</StyledButton>
}

export default Button;


export const StyledButton = styled.button`
  flex: 1 1 auto;
  color: ${(props: PropsTheme) => props.theme.buttonColor};
  background-color: ${(props: PropsTheme) => props.theme.buttonBackground};
  padding: 12px 20px;
  border-radius: 5px;
  border: 2px solid ${(props: PropsTheme) => props.theme.buttonColor};
  text-decoration: none;
  cursor: pointer;
  transition: 250ms ease-in-out;
  &:hover {
    background-color: ${(props: PropsTheme) => props.theme.buttonBackgroundHover};
    color: ${(props: PropsTheme) => props.theme.buttonColorHover} !important;
    
  }
`