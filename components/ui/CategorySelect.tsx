import { useState } from "react";
import { ArrowDown, ChevronDown, ChevronUp } from "react-feather";
import styled from "styled-components";
import PropsTheme from "../../styles/theme/PropsTheme";

export interface Option {
  value: string;
  label: string;
}

export default function CategorySelect(props: {
  selected: Option;
  options: { label: string; options: Option[] }[];
  handleChange: (option: Option) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setOpen(!open)}>
        <SelectedWrapper>{props.selected?.label}</SelectedWrapper>
        <DownWrapper>
          {!open &&
            <OpenDropdown size="24px" onClick={() => setOpen(!open)}/>
            }
            {open &&
            <CloseDropdown size="24px" onClick={() => setOpen(false)}/>
            }
        </DownWrapper>
      </Wrapper>
      {open && (
        <DropDownWrapper>
          {props.options.map((option) => (
            <Category key={option.label}>
              <p>{option.label.toUpperCase()}</p>
              {option.options.map((cat) => (
                <CategoryEntry
                  key={cat.value}
                  onClick={() => {props.handleChange(cat)
                setOpen(false)}}
                >
                  {cat.label}
                </CategoryEntry>
              ))}
            </Category>
          ))}
        </DropDownWrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  justify-content: space-between;
  border-radius: 4px;
  cursor: pointer;
  transition: 250ms ease-in-out;
  &:hover {
    border: 1px solid ${(props: PropsTheme) => props.theme.accentColor};
  }
`;

const OpenDropdown = styled(ChevronDown)`
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
`

const CloseDropdown = styled(ChevronUp)`
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
`

const SelectedWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0.5em;
`;

const DownWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5em;
  border-left: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  background-color: ${(props: PropsTheme) => props.theme.accentColor};
  border-radius: 0 4px 4px 0;
`;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0.5em;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 0 0 4px 4px;
  border-top: none;

  transition: 250ms ease-in-out;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  cursor: default;
`;

const CategoryEntry = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1em;
  cursor: pointer;

  &:hover {
    background: ${(props: PropsTheme) => props.theme.accentColor};
  }
`;
