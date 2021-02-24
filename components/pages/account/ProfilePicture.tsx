import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../../atoms/user";
import getAxios from "../../../util/AxiosInstance";
import useToast from "../../../util/hooks/useToast";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

export default function ProfilePicture() {
  const [file, setFile] = useState<File>();

  const [err, setErr] = useState("");

  const router = useRouter();

  const user = useRecoilValue(userState);

  const toast = useToast();

  const sendIcon = () => {
    const formData = new FormData();
    formData.append("icon", file);
    getAxios()
      .put(`/users/icon/${user._id}`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        toast("profile updated!")
        //   router.push(`/users/${user._id}/`);
      })
      .catch((err) => setErr(err.response.data.error));
  };

  const deleteIcon = () => {
    getAxios()
      .delete(`/users/icon/${user._id}`)
      .then((res) => {
        console.log(res.data);
        toast("Icon deleted.");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast(err.response.data.error);
      });
  };

  return (
    <Container>
        <p>Profile Picture</p>
        {err}
      <Wrapper>
        <Input
          onChange={(e) => setFile(e.target.files[0])}
          type={"file"}
          accept={".png"}
          invalid={!file}
        />
        <Button onClick={sendIcon}>Update</Button>
        <Button onClick={deleteIcon}>Delete</Button>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
