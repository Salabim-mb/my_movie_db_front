import React from 'react';
import './App.css';
import Router from "./router/Router";
import {BrowserRouter} from "react-router-dom";
import {MyNavbar} from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
