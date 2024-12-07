import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <CssBaseline />
    <App />
  </>
  // </StrictMode>
);
