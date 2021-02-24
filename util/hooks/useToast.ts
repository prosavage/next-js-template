import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../../atoms/theme";
import DarkTheme from "../../styles/theme/DarkTheme";
import { toast } from "react-toastify";
import LightTheme from "../../styles/theme/LightTheme";

export default function useToast() {
  const theme = useRecoilValue(themeState);

  const sendToast = (msg: string) => {
    switch (theme) {
      case DarkTheme:
        toast.dark(msg);
        break;
      case LightTheme:
        toast(msg);  
        break;
    }
  };

  return sendToast;
}
