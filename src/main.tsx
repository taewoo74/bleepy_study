import React from "react";
// import Config from 'react-native-config';
import { Provider } from "react-redux";
import store from "../src/store/index";
import App from "./views/App.tsx";
import "../src/styles/index.css";
import ReactDOM from "react-dom/client";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>
);

