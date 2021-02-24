import { useEffect, useState } from "react";
import DarkTheme from "../../styles/theme/DarkTheme";
import ITheme from "../../styles/theme/ITheme";
import LightTheme from "../../styles/theme/LightTheme";

export default function useStoredTheme() {
  const [theme, setTheme] = useState(DarkTheme);

  // I dont want to type strings twice.
  // So we use an enum.
  enum ThemeName {
    DARK = "DarkTheme",
    LIGHT = "LightTheme",
  }

  const setStoredTheme = (theme: ITheme) => {
    setTheme(theme);

    let themeName: ThemeName;
    switch (theme) {
      case LightTheme:
        themeName = ThemeName.LIGHT;
        break;
      case DarkTheme:
        themeName = ThemeName.DARK;
        break;
      default:
        themeName = undefined;
    }

    if (!themeName) {
      return;
    }
    window.localStorage.setItem("theme", themeName);
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    console.log(storedTheme, ThemeName.LIGHT);
    if (storedTheme !== null) {
      switch (storedTheme) {
        case ThemeName.DARK:
          setTheme(DarkTheme);
          break;
        case ThemeName.LIGHT:
          setTheme(LightTheme);
          break;
        default:
          // already have default state.
          break;
      }
    }
  }, []);

  return [theme, setStoredTheme] as const;
}
