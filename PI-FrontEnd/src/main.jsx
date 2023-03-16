import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { LoginPageContextprovider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginPageContextprovider>
        <App />
      </LoginPageContextprovider>
    </BrowserRouter>
  </React.StrictMode>
);
