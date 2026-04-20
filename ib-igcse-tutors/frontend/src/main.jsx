import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SiteDataProvider } from "./contexts/SiteDataContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SiteDataProvider>
        <App />
      </SiteDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
