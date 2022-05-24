import React, { useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { axiosSetup } from "./Services";

function App() {
  axiosSetup();
  const initApp = () => {};
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
