import { useEffect, useState } from "react";
import styled from "styled-components";
import PropsTheme from "../../../../styles/theme/PropsTheme";
import { Category } from "../../../../types/Category";
import { ResourceType } from "../../../../types/Resource";
import getAxios from "../../../../util/AxiosInstance";
import CategoryEntry from "./CategoryEntry";

function Categories(props: {
  type: ResourceType;
  category: string | undefined;
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let fetchURL = "/directory/categories/" + props.type;

    getAxios()
      .get(fetchURL)
      .then((res) => setCategories(res.data.payload.categories));
  }, [props.type]);

  return (
    <Wrapper>
      <Header>
        <TextBox>Categories</TextBox>
      </Header>
      <Content>
        {categories.map((entry) => (
          <CategoryEntry
            key={entry._id}
            type={props.type}
            category={entry}
            selected={props.category === entry.name}
          />
        ))}
      </Content>
    </Wrapper>
  );
}

export default Categories;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
`;
const TextBox = styled.p`
  color: ${(props: PropsTheme) => props.theme.oppositeColor};
  font-weight: 600;
`
const Header = styled.div`
  background: ${(props: PropsTheme) => props.theme.accentColor};
  padding: 0.5em;
  color: black;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
`;
