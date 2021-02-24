import styled from "styled-components";
import PropsTheme from "../../styles/theme/PropsTheme";

const Button = styled.button`
  background: ${(props: PropsTheme) => props.theme.backgroundSecondary};
  color: ${(props: PropsTheme) => props.theme.accentColor};
  font-weight: bold;
  padding: 10px;
  outline: none;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.28);

  transition: 250ms ease-in-out;
  &:hover {
    border: 1px solid ${(props: PropsTheme) => props.theme.accentColor};
  }
`;

export default Button;

