import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home"; 
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Navbar from '../components/Navbar';
import login from '../components/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar /> 
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
