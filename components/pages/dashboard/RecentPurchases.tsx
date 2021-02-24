import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import styled from "styled-components";
import {userState} from "../../../atoms/user";
import PropsTheme from "../../../styles/theme/PropsTheme";
import {User} from "../../../types/User";
import getAxios from "../../../util/AxiosInstance";
import ResourceViewParent from "../resource/ResourceViewParent";
import RecentPurchasesEntry from "./RecentPurchasesEntry";

export default function RecentPurchases() {
    const sampleids = ["4E0bExFDP", "TQhd9S2Ax", "z-lWgoqWM"];

    const [payments, setPayments] = useState([]);

    const user = useRecoilValue(userState);

    useEffect(() => {
        getAxios().get(`/checkout/purchases/1`).then(res => {
            setPayments(res.data.payload.payments)
        })
    }, []);

    return (
        <Wrapper>
            <Header>
                <p>Recent Purchases</p>
            </Header>
            {payments.map(payment => <RecentPurchasesEntry key={payment._id} purchase={payment}/>)}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  border-radius: 5px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 0.5em 0.5em;
  background: ${(props: PropsTheme) => props.theme.accentColor};
`;
