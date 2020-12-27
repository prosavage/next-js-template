import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import DarkTheme from "../../styles/theme/DarkTheme";
import LightTheme from "../../styles/theme/LightTheme";
import PropsTheme from "../../styles/theme/PropsTheme";
import ActiveLink from "./../ActiveLink"
import { Moon, Sun } from "react-feather";
import { useRecoilState } from "recoil";
import { themeState } from "../../styles/atoms/theme";
const links = [
    {
        link: "/",
        text: "Home"
    },
    {
        link: "/faq",
        text: "FAQ"
    },
    {
        link: "/contact",
        text: "Contact"
    }
]

export default function Navbar(props) {

    const [theme, setTheme] = useRecoilState(themeState);

    const getLogoPath = () => {
        return theme === DarkTheme ? "logo-dark.svg" : "logo-light.svg"
    }

    const [toggled, setToggled] = useState(false);
    const [width, setWidth] = useState(0);

    const isDesktop = () => {
        return width > 700;
    }

    useEffect(() => {
        // function defined to update our width
        function updateWidth() {
            setWidth(window.innerWidth);
        }

        // bind it to the resize event
        window.addEventListener("resize", updateWidth);
        // our state has a 0 at beginning, so we need to run update once.
        updateWidth();
        return () => window.removeEventListener("resize", updateWidth);
    });

    return (
        <Wrapper>
            <Content>
                <LogoSection>
                    <Logo src={`/img/navbar/${getLogoPath()}`} />
                    {!isDesktop() && <HamburgerButton onClick={() => setToggled(!toggled)} />}
                </LogoSection>
                {(toggled || isDesktop()) && <LinksWrapper>
                    {links.map(entry => <LinkWrapper>
                        <ActiveLink href={entry.link}>
                            <LinkText>{entry.text}</LinkText>
                        </ActiveLink>
                    </LinkWrapper>).concat(<LinkWrapper onClick={() => setTheme(theme === DarkTheme ? LightTheme : DarkTheme)}>
                        {theme === DarkTheme ? <Moon /> : <Sun />}
                    </LinkWrapper>)
                    }
                </LinksWrapper>}
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    /* This will basically push everything to left and right. */
    justify-content: center;
    align-items: center;

    /* Want a line instead of shadow in dark mode. */
    background: ${(props: PropsTheme) => props.theme.background};
    ${props => props.theme === DarkTheme && css`
        border-bottom: 1px solid #333;
        background: black;
    `}
    /* Box shadow for light mode. */
    ${(props: PropsTheme) => props.theme === LightTheme && css`
        box-shadow: 0px 18px 35px ${props => props.theme.boxShadowColor};
    `}
`

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.5em;
    justify-content: space-between;
    

    @media(min-width: 700px) {
        justify-content: space-between;
        flex-direction: row;
    }
`

const LogoSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media(min-width: 700px) {
        justify-content: center;
        width: auto;
    }
`

const HamburgerButton = styled.div`
    width: 25px;
    height: 10px;
    border-top: 1px solid ${(props: PropsTheme) => props.theme.color};
    border-bottom: 1px solid ${(props: PropsTheme) => props.theme.color};
`

const Logo = styled.img`
    width: auto;
    height: 3em;
    padding: 10px;
`
const LinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 5px;
`

const LinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 10px 0;

    @media(min-width: 700px) {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: auto;
    }
`

const LinkText = styled.a`
    font-size: 1rem;
    cursor: pointer;

    @media(min-width: 700px) {
        padding: 0 15px;
    }
`



