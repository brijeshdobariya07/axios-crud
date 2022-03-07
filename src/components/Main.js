import React from "react";
import { Route, Routes } from "react-router";
import CreateUser from "./CreateUser";
import Header from "./Header";
import Navbar from "./Navbar";
import UserData from "./UserData";

function Main() {
  return (
    <div className="main">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<UserData />} />
        <Route path="/add" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default Main;
