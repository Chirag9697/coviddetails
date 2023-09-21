import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
<<<<<<< HEAD
=======
import { store } from "./app/store";
import { Provider } from "react-redux";
>>>>>>> d31e05c1aaf974c087ecba3f6a703f7656d0154a

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
<<<<<<< HEAD
      <App />
=======
      <Provider store={store}>
        <App />
      </Provider>
>>>>>>> d31e05c1aaf974c087ecba3f6a703f7656d0154a
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
