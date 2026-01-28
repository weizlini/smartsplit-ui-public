import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import stores from "./state";
import { when } from "mobx";
const root = ReactDOM.createRoot(document.getElementById("root"));
/**
 * the root dom is only rendered once the root store
 * has initialized all the substores. We use the
 * stores.initialized property
 */
when(
  () => stores.initialized,
  () => {
    console.log("stores are initialized");
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
