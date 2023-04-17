import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App/index.css";
import MainPage from "./App/MainPage.js";
import SettingsPage from "./Elements/SettingsPage";
import LoginPage from "./App/LoginPage.js";

// function PrivateRoute({ element: Component, ...rest }) {
//   const isAuthenticated = localStorage.getItem("authToken") !== false;

//   return (
//     <Route
//       {...rest}
//       render={() =>
//         isAuthenticated ? <Component /> : <Navigate to="/" replace />
//       }
//     />
//   );
// }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/main"
          element={
            localStorage.getItem("authToken") ? (
              <MainPage />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route path="/" element={<LoginPage />} />
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
