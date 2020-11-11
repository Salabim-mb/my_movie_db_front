import React from 'react';
import './App.css';
import Router from "./router/Router";
import {BrowserRouter} from "react-router-dom";
import {MyNavbar} from "./components";
import {UserProvider} from "./context/UserContext";

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
            <div className="App">
                <MyNavbar />
                <Router />
            </div>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
