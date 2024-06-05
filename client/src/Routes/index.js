import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./../pages/Home";
import Error from "./../pages/Errors";
import Register from "../pages/Register";
import VerifyUser from "../pages/Register/VerifyUser";
import Dashboard from "../pages/Dashboard";
import Header from "../Layouts/Header";
import Login from "../pages/Login";

const Index = () => {
  // set your conditional Route or Private Routes
  return (
    <BrowserRouter>
      <Header />
      {/* declare static Components here  Like Header Navbar etc */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-user" element={<VerifyUser />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {/* declare static Components here  Like Footer or Dropdown */}
    </BrowserRouter>
  );
};

export default Index;
