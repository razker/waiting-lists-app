import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "./themes/theme";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RTL from "./themes/RTL";

function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <RTL>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </RTL>
  );
}

export default App;
