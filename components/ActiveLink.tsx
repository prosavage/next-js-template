import { useRouter } from 'next/router'
import { useContext } from 'react';
import { ThemeContext } from "styled-components";
import ITheme from '../styles/theme/ITheme';

function ActiveLink({ children, href }) {

    const router = useRouter()
    const style = {
        fontWeight: router.pathname === 
        href ? 700 : 400
    }

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} style={style}>
            {children}
        </a>
    )
}

export default ActiveLink