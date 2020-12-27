import { atom } from "recoil";
import ITheme from "../theme/ITheme";
import LightTheme from "../theme/LightTheme";

export const themeState = atom<ITheme>({
    key: "THEME",
    default: LightTheme
})