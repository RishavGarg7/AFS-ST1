import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
