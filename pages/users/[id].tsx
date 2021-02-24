import { useEffect, useState } from "react";
import styled from "styled-components";
import ResourceList from "../../components/pages/home/resourcelist/ResourceList";
import UserHeader from "../../components/pages/users/UserHeader";
import { ResourceType } from "../../types/Resource";
import { User, UserStats } from "../../types/User";
import getAxios from "../../util/AxiosInstance";

export default function UserById(props: { id: string }) {
  const [user, setUser] = useState<User>();
  const [stats, setStats] = useState<UserStats>();

  useEffect(() => {
    getAxios()
      .get(`/directory/user/${props.id}`)
      .then((res) => {
        setUser(res.data.payload.user);
      });

    getAxios()
      .get(`/directory/user-stats/${props.id}`)
      .then((res) => setStats(res.data.payload.stats));
  }, []);

  return (
    <Wrapper>
      <h1>Author Profile</h1>
      <UserHeader user={user} stats={stats}/>
      <ResourcesContainer>
        <ResourceList
          type={ResourceType.PLUGIN}
          category={undefined}
          author={user}
        />
      </ResourcesContainer>
    </Wrapper>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id as string;

  return { props: { id } };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em 0;
  padding: 0 1em;
  width: 100%;
`;

const ResourcesContainer = styled.div`
  width: 100%;
  margin: 1em 0;
`;
