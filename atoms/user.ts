import { atom } from "recoil";
import DarkTheme from "../styles/theme/DarkTheme";
import { User } from "../types/User";

export const userState = atom<User | undefined>({
    key: "USER",
    default: undefined
})