import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./Context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import formTheme from "./utils/formTheme"; // Import the custom theme

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={formTheme}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

const suppressResizeObserverError = () => {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes('ResizeObserver loop completed')) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
};

suppressResizeObserverError();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
