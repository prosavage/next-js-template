import React, { useEffect, useState } from "react";
import { User } from "../../../types/User";
import { Version } from "../../../types/Version";
import getAxios from "../../../util/AxiosInstance";
import ResourceThread from "../../../components/pages/resource/ResourceThread";
import { Category } from "../../../types/Category";
import ResourceViewParent from "./../../../components/pages/resource/ResourceViewParent";
import { Resource } from "../../../types/Resource";
import Head from "next/head";


export default function ResourceId(props: { id: string }) {
  // For general resource info.
  const [resource, setResource] = useState<Resource>();
  // For versions page and browser.
  const [versions, setVersions] = useState<Version[]>([]);
  // Author info for sidebar, and ownership purposes.
  const [author, setAuthor] = useState<User>();
  // Category for pushing back button.
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    getAxios()
      .get(`/resources/${props.id}`)
      .then((res) => setResource(res.data.payload.resource));
    getAxios()
      .get(`/directory/versions/resource/${props.id}/1`)
      .then((res) => {
        setVersions(res.data.payload.versions);
      });
  }, []);

  useEffect(() => {
    if (!resource) return;
    getAxios()
      .get(`/directory/user/${resource.owner}`)
      .then((res) => setAuthor(res.data.payload.user));

    getAxios()
      .get(`/category/${resource.category}`)
      .then((res) => setCategory(res.data.payload.category))
      .catch((err) => console.log(err.response.data));
  }, [resource]);


  return (
    <ResourceViewParent
      resource={resource}
      category={category}
      versions={versions}
      author={author}
    >
      <Head>
        <title>{resource?.name}: Thread</title>
      </Head>
        <ResourceThread resource={resource}/>
    </ResourceViewParent>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id as string;

  return { props: { id } };
}

