import React from "react";
import styled from "styled-components";
import AmountBalance from "../components/pages/dashboard/AmountBalance";
import PayoutButton from "../components/pages/dashboard/PayoutButton";
import RecentPurchases from "../components/pages/dashboard/RecentPurchases";
import UserNameLink from "../components/pages/dashboard/UserNameLink";
import Button from "../components/ui/Button";

export default function Dashboard() {
  return (
    <Wrapper>
      <Header>
        <UserNameLink/>
        <Balance>
          <AmountBalance/>
          <PayoutButton />
        </Balance>
      </Header>
      <RecentPurchases/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1050px;
  padding: 1em;
`;

const Header = styled.div`
  padding: 2em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Balance = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;


