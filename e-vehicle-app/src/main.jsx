import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserLocationProvider } from "./context/userLocation";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserLocationProvider>
        <App />
      </UserLocationProvider>
    </BrowserRouter>
  </StrictMode>
);
