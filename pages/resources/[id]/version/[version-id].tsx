import React, { useEffect, useState } from "react";
import { Resource } from "../../../../types/Resource";
import { User } from "../../../../types/User";
import { Version } from "../../../../types/Version";
import getAxios from "../../../../util/AxiosInstance";
import { Category } from "../../../../types/Category";
import ResourceVersionEntry from "../../../../components/pages/resource/ResourceVersionEntry";
import ResourceViewParent from "../../../../components/pages/resource/ResourceViewParent";

export default function ResourceId(props: { id: string, versionId: string}) {
  // For general resource info.
  const [resource, setResource] = useState<Resource>();
  // For versions page and browser.
  const [versions, setVersions] = useState<Version[]>([]);
  // For specific version rendering, when we just want to show one version's info.
  const [specificVersion, setSpecificVersion] = useState<Version>();
  // Author info for sidebar, and ownership purposes.
  const [author, setAuthor] = useState<User>();

  // Category for pushing back button.
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const axios = getAxios();
    axios
      .get(`/resources/${props.id}`)
      .then((res) => setResource(res.data.payload.resource));
    axios.get(`/directory/versions/resource/${props.id}/1`).then((res) => {
      setVersions(res.data.payload.versions);
    });

    axios
      .get(`/version/${props.versionId}`)
      .then((res) => setSpecificVersion(res.data.payload))
      .catch((err) => console.log(err.response.data));
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
      <ResourceVersionEntry
        resource={resource}
        version={specificVersion}
        onVersionSelect={() => {}}
      />
    </ResourceViewParent>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id as string;
  const versionId = params["version-id"] as string;
  console.log(id, versionId)
  return { props: { id, versionId } };
}
