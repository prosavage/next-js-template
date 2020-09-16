import styled from "styled-components";

const items = [
    {
        link: "/home",
        text: "Home"
    },
    {
        link: "/faq",
        text: "FAQ"
    },
    {
        link: "/contact",
        text: "Contact"
    },
]

export default function Navbar(props) {
    return (
        <Wrapper>
            <Logo src={"/img/navbar/ns-logo-fulltext.png"}/>
            <LinksWrapper>

            </LinksWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.5em;
    /* This will basically push everything to left and right. */
    justify-content: space-between;
`

const Logo = styled.img`
    width: auto;
    height: 2em;
`

const LinksWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Link = styled.p`
    
`



