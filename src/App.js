import React from 'react';
import "./App.css";
import "reactflow/dist/style.css";
import Home from "./Pages/Homepage/Home";

const suppressResizeObserverError = () => {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
};

suppressResizeObserverError();

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
