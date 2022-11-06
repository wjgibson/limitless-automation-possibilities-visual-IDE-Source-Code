import React from "react";
import ReactDOM from "react-dom/client";
import "./App/index.css";
import DnDFlow from "./App/DnDFlow.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DnDFlow />
  </React.StrictMode>
);
