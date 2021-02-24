import { atom } from "recoil";
import DarkTheme from "../styles/theme/DarkTheme";
import ITheme from "../styles/theme/ITheme";

export const themeState = atom<ITheme>({
    key: "THEME",
    default: DarkTheme
})