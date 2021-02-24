import React, {useState} from "react";
import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";
import {Resource} from "../../../types/Resource";
import Input from "../../ui/Input";
import {highlight, languages} from "prismjs";
import Editor from "react-simple-code-editor";
import {useEffect} from "react";
import Button from "../../ui/Button";
import getAxios from "../../../util/AxiosInstance";
import {
    validateResourceTitle,
    validateResourceDescription,
    validateResourceThread,
} from "../../../util/Validation";
import useToast from "../../../util/hooks/useToast";
import {useRouter} from "next/router";

export default function ResourceEdit({resource}: { resource: Resource }) {
    const [title, setTitle] = useState(resource?.name ? resource.name : "");
    const [price, setPrice] = useState(resource?.price ? resource?.price : 0)
    const [thread, setThread] = useState(resource?.thread ? resource.thread : "");
    const [description, setDescription] = useState(
        resource?.description ? resource.description : ""
    );
    const [err, setErr] = useState("");

    const toast = useToast();

    const router = useRouter()

    useEffect(() => {
        if (!resource) return;
        setTitle(resource.name);
        setThread(resource.thread);
        setDescription(resource.description);
        setPrice(resource.price)
    }, [resource]);

    const sendEdit = () => {
        if (!validateResourceTitle(title)) {
            setErr("invalid title");
            return;
        }

        if (!validateResourceDescription(description)) {
            setErr("invalid description");
            return;
        }

        if (!validateResourceThread(thread)) {
            setErr("invalid thread");
            return;
        }

        const freeResourceBody = {
            name: title,
            description,
            thread,
        }

        const paidResourceBody = {
            name: title,
            price,
            description,
            thread,
        }

        let bodyToUse
        if (resource.price !== 0) {
            bodyToUse = paidResourceBody
        } else {
            bodyToUse = freeResourceBody
        }

        console.log(bodyToUse)

        getAxios()
            .patch(`/resources/${resource._id}`, bodyToUse)
            .then((res) => {
                toast("Successfully edited resource!")
                router.push(`/resources/${resource?._id}`)
            })
            .catch((err) => setErr(err.response.data.error));
    };

    return (
        <Wrapper>
            <Content>
                {err}
                <Spacer>
                    <label>Resource Title</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        invalid={!validateResourceTitle(title)}
                    />
                </Spacer>
                {resource?.price != 0 && <Spacer>
                    <label>Resource Price</label>
                    <Input
                        type={"number"}
                        value={price}
                        onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
                        invalid={false}
                    />
                </Spacer>}
                <Spacer>
                    <label>Resource Description</label>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        invalid={!validateResourceDescription(description)}
                    />
                </Spacer>
                <Spacer>
                    <label>Resource Thread</label>
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
                </Spacer>
                <UpdateButton onClick={() => sendEdit()}>UPDATE</UpdateButton>
            </Content>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 4px;
  padding: 1em;
  margin: 1em 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const ThreadEditor = styled(Editor)`
  width: 100%;
  min-height: 150px;
  background: ${(props: PropsTheme) => props.theme.backgroundSecondary};
  color: ${(props: PropsTheme) => props.theme.color};
`;

const UpdateButton = styled(Button)`
  margin: 1em 0;
`;

const Spacer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
`;
