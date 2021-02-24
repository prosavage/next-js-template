import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/ui/Input";
import { Resource, ResourceType } from "../types/Resource";
import getAxios from "../util/AxiosInstance";
import { themeState } from "../atoms/theme";
import CategorySelect, { Option } from "../components/ui/CategorySelect";
import Button from "../components/ui/Button";
import {
  validateResourceDescription,
  validateResourceTitle,
  validateResourceVersion,
} from "../util/Validation";
import { useRouter } from "next/router";
import parser from "./../../client/util/parser/Parser";
import PropsTheme from "../styles/theme/PropsTheme";
import DarkTheme from "../styles/theme/DarkTheme";
import { useRecoilState } from "recoil";
import LightTheme from "../styles/theme/LightTheme";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import DefaultThread from "../util/DefaultThread";
import Head from "next/head";

export default function Create() {
  const [theme, setTheme] = useRecoilState(themeState);

  const router = useRouter();

  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState<Option>();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [thread, setThread] = useState(DefaultThread);

  const createResource = () => {
    getAxios()
      .put("/resources", {
        name: title,
        description,
        category: selected.value,
        thread,
        price,
        version: {
          title: "Initial release",
          description: "The first release!",
          version,
        },
      })
      .then((res) => {
        const resource: Resource = res.data.payload.resource;
        router.push(`/resources/${resource._id}`);
      })
      .catch((err) => console.log(err, err.response));
  };

  const fetchOptions = () => {
    const newOptions = [];
    [ResourceType.MOD, ResourceType.SOFTWARE, ResourceType.PLUGIN].forEach(
      (category) => {
        getAxios()
          .get(`/directory/categories/${category}`)
          .then((res) => {
            const categories = res.data.payload.categories;
            newOptions.push({
              value: category,
              label: category,
              options: categories.map((entry) => {
                return {
                  value: entry._id,
                  label: entry.name,
                };
              }),
            });
          });
      }
    );
    setOptions(newOptions);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <>
    <Head>
      <title>Create - Marketplace</title>
      <meta name="description" content="Create a Resource" />
    </Head>
    <Wrapper>
      <h1>Create a Resource</h1>
      <HContainer>
        <TitleContainer>
          <label>RESOURCE TITLE</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type={"text"}
            placeholder={"Enter your resource's title."}
            invalid={!validateResourceTitle(title)}
          />
        </TitleContainer>
        <PriceContainer>
          <label>PRICE</label>
          <Input
            value={price}
            onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
            type={"number"}
            placeholder={"Enter 0 if free."}
            invalid={false}
          />
        </PriceContainer>
      </HContainer>
      <HContainer>
        <InputContainer>
          <label>DESCRIPTION</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type={"text"}
            placeholder={"A short description of what your resource does"}
            invalid={!validateResourceDescription(description)}
          />
        </InputContainer>
      </HContainer>
      <HContainer>
        <InputContainer>
          <label>VERSION</label>
          <Input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            type={"text"}
            placeholder={"We highly reccomend semantic versioning."}
            invalid={!validateResourceVersion(version)}
          />
        </InputContainer>
      </HContainer>
      <HContainer>
        <InputContainer>
          <label>CATEGORY</label>
          <CategorySelect
            options={options}
            selected={selected}
            handleChange={(opt) => setSelected(opt)}
          />
        </InputContainer>
      </HContainer>
      <HContainer>
        <InputContainer>
          <p>Be sure to optimize for dark and light themes.</p>
          <label>LIGHT THEME THREAD</label>
          <ThreadEditor
            value={thread}
            onValueChange={(code) => setThread(code)}
            highlight={(code) => highlight(code, languages.bbcode, "bbcode")}
            padding={15}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
          <VSpacedInputContainer>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setTheme(theme === LightTheme ? DarkTheme : LightTheme);
              }}
            >
              Toggle Theme: {theme === DarkTheme ? "dark" : "light"}
            </Button>
          </VSpacedInputContainer>
        </InputContainer>
      </HContainer>
      <HContainer>
        <VSpacedInputContainer>
          <label>THREAD PREVIEW</label>
          <ThreadContainer>{parser.toReact(thread)}</ThreadContainer>
        </VSpacedInputContainer>
      </HContainer>
      <VSpacedInputContainer>
        <Button
          style={{ margin: "1em 0" }}
          type={"submit"}
          onClick={(e) => {
            e.preventDefault();
            createResource();
          }}
        >
          CREATE RESOURCE
        </Button>
      </VSpacedInputContainer>
    </Wrapper>
    </>
  );
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 550px;
  padding: 1em 0;
`;

const ThreadContainer = styled.div`
  padding: 1em;
  border-radius: 4px;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};

  img {
    width: 100%;
  }

  * > img {
    width: 100%;
  }
`;

const HContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1em 0;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const ThreadEditor = styled(Editor)`
  width: 100%;
  min-height: 150px;
  background: ${(props: PropsTheme) => props.theme.backgroundSecondary};
  color: ${(props: PropsTheme) => props.theme.color};
`;

const VSpacedInputContainer = styled(InputContainer)`
  margin: 1em 0;
`;
