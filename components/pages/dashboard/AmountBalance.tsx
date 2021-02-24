import styled from "styled-components"
import {useEffect, useState} from "react";
import getAxios from "../../../util/AxiosInstance";
import useToast from "../../../util/hooks/useToast";

export default function AmountBalance() {

    const [amount, setAmount] = useState("0.00")

    const [available, setAvailable] = useState("0.00")

    const toast = useToast()

    const fetchBalance = () => {
        getAxios().get("/checkout/balance").then(res => {
            const balance = res.data.payload.balance
            const available = balance.available[0].amount
            const total = (balance.available[0].amount + balance.pending[0].amount)
            if (total > 0) {
                setAmount((total / 100).toFixed(2).toString())
            }
            if (available > 0) {
                setAvailable((available / 100).toFixed(2).toString())
            }

        }).catch(err => toast("balance: " + err.response.data.error))
    }

    useEffect(() => {
        fetchBalance()
    }, [])

    return <Wrapper>
        <p>Your balance</p>
        <Balance>${amount}</Balance>
        <p>${available} available now.</p>
    </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Balance = styled.p`
  font-size: 30px;
`