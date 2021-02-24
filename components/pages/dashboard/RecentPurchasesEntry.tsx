import React from "react";
import styled from "styled-components";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { User } from "../../../types/User";
import AuthorIcon from "../../ui/AuthorIcon";
import {DirectoryPayment} from "../../../types/Resource";
import timeago from "time-ago";
import Link from "next/link";

export default function RecentPurchasesEntry(props: {
  purchase: DirectoryPayment
}) {
  return (
    <Wrapper>
      <Name>
        <AuthorIcon user={props.purchase.user} size={"48px"} />
        <Link href={`/users/[id]`} as={`/users/${props.purchase.user._id}`}>
            <Username>{props.purchase.user.username}</Username>
        </Link>
      </Name>
      <Info>
        <Link href={"/resources/[id]"} as={`/resources/${props.purchase.resource._id}`}>
            <ProductLink>{props.purchase.resource.name}</ProductLink>
        </Link>
      </Info>
      <Info>
        <p>{timeago.ago(props.purchase.timestamp)}</p>
      </Info>
      <Price>
          <p>${(props.purchase.amount / 100).toFixed(2)}</p>
      </Price>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  margin-bottom: 0.5em;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 30%;
`;

const Username = styled.p`
  padding-left: 0.5em;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-basis: 15%;
`;

const ProductLink = styled.p`
  color: ${(props: PropsTheme) => props.theme.accentColor};
  padding-right: 0.5em;
  cursor: pointer;
`;

const Price = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: flex-end;
`
