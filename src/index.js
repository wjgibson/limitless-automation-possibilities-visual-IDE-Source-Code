import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App/index.css";
import MainPage from "./App/MainPage.js";
import SettingsPage from "./Elements/SettingsPage";
import LoginPage from "./App/LoginPage.js";
import routes from "./App/routes";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") == "true" || false
  );

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/main" element={<MainPage />} />
          </>
        ) : (
          routes.map((route) => (
            <Route
              path={route.location}
              element={
                <Navigate
                  to={{
                    pathname: "/",
                    state: { from: location },
                  }}
                />
              }
            />
          ))
        )}
        <Route path="/" element={<LoginPage setAuth={setIsAuthenticated} />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
