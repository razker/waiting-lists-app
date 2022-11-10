import { createTheme } from "@mui/material/styles";
import i18n from "../i18n";

export const appTheme = createTheme({
  palette: {},
  direction: i18n.language === "he" ? "rtl" : "ltr",
  typography: {
    fontFamily: i18n.language === "he" ? "Heebo,Roboto,Arial" : "Roboto,Arial",
  },
});
