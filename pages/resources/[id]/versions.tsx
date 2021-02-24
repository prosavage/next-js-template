import React, { useEffect, useState } from "react";
import { User } from "../../../types/User";
import { Version } from "../../../types/Version";
import getAxios from "../../../util/AxiosInstance";
import { Category } from "../../../types/Category";
import { Resource } from "../../../types/Resource";
import ResourceVersions from "../../../components/pages/resource/ResourceVersions";
import { useRouter } from "next/router";
import ResourceViewParent from "./../../../components/pages/resource/ResourceViewParent";
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

  const router = useRouter();

  return (
    <ResourceViewParent
      resource={resource}
      category={category}
      versions={versions}
      author={author}
    >
      <Head>
        <title>{resource?.name}: Version List</title>
      </Head>
      <ResourceVersions
        resource={resource}
        onVersionSelect={(version) =>
          router.push({
              pathname: `/resources/[id]/version/[version-id]`,
              query: { id: resource._id, "version-id": version._id}
          })
        }
      />
    </ResourceViewParent>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id as string;

  return { props: { id } };
}
