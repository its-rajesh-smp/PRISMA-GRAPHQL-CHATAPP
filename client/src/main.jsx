import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store/store.js";
import { ApolloProvider } from "@apollo/client";
import client from "./service/service.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ApolloProvider>
);
