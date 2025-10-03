import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { geoDistricts } from "./data/mock";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App geo={geoDistricts} />
  </React.StrictMode>
);
