import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//import the config file and store on the window variable
// const head = document.getElementsByTagName("head")[0];
// let LoadConfigFromJs = document.createElement("script");
// let scriptAttribute = document.createAttribute("type");
// scriptAttribute.value = "module";
// LoadConfigFromJs.setAttributeNode(scriptAttribute);
// // LoadConfigFromJs.innerHTML =
// // "import config from './config.js'; window.embedApp_config = config;";
// head.appendChild(LoadConfigFromJs);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

window.onload = function () {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
