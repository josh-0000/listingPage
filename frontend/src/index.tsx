import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ViewContextProvider } from "./Context/ViewContext";

ReactDOM.render(
  <ViewContextProvider>
    <App />
  </ViewContextProvider>,
  document.getElementById("root") as HTMLElement
);
