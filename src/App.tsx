import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CreateUser } from "./components/CreateUser";
import { Login } from "./components/Login";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { LoggedIn } from "./components/LoggedIn";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/LoggedIn" element={<LoggedIn />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
