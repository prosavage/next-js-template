import Link from "next/link";
import styled, { css } from "styled-components";
import PropsTheme from "../../../../styles/theme/PropsTheme";
import { Category } from "../../../../types/Category";
import { ResourceType } from "../../../../types/Resource";
import { getCategoryIconURL } from "../../../../util/cdn";
import useFallbackImageInSSR from "../../../../util/UseFallbackImageInSRR";

function CategoryEntry(props: { type: ResourceType; category: Category, selected: boolean }) {
  return (
    <Wrapper selected={props.selected}>
      <Link
        href={"/directory/resources/" + props.type + "/" + props.category.name}
      >
        <Text>{props.category.name}</Text>
      </Link>
    </Wrapper>
  );
}

export default CategoryEntry;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  cursor: pointer;
  transition: 250ms ease-in-out;

  ${(props: {selected: boolean}) => props.selected && css`
    color: ${(props: PropsTheme) => props.theme.accentColor};
  `}

  &:hover {
    color: ${(props: PropsTheme) => props.theme.accentColor};
  }
`;

const Text = styled.p`
  margin-left: 0.5em;
`;
