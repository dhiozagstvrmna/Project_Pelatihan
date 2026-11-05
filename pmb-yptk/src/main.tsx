import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { PendaftarProvider } from "./context/PendaftarContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PendaftarProvider>
          <App />
        </PendaftarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
