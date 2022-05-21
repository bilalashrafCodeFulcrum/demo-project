import React, { useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { axiosSetup } from "./Services";

function App() {
  const initApp = () => {
    axiosSetup();
  };
  useEffect(() => {
    initApp();
  }, []);
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
