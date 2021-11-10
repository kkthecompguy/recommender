import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Institutions from "./pages/Institutions";
import Login from "./pages/Login";
import Match from "./pages/Match";
import Mentors from "./pages/Mentors";
import Register from "./pages/Register";
import Students from "./pages/Students";

const UrlRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/mentors"  element={<Mentors />} />
        <Route path="/institutions"  element={<Institutions />} />
        <Route path="/students"  element={<Students />} />
        <Route path="/matches"  element={<Match />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/register"  element={<Register />} />
      </Routes>
    </Router>
  );
}

export default UrlRoutes;