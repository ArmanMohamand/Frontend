import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/Context.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </StoreContextProvider>
  </BrowserRouter>
);
