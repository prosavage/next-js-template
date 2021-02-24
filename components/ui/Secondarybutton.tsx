import styled from "styled-components";
import PropsTheme from "../../styles/theme/PropsTheme";
import Button from "./Button";

const SecondaryButton = styled(Button)`
  background: black !important;
  color: ${(props: PropsTheme) => props.theme.accentColor} !important;
  /* box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.28); */
  padding: 15px 20px !important;
  cursor: pointer;
`;

export default SecondaryButton;
