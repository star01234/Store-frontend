import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home"; 
import AddStore from '../pages/Add';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import RegisterPage from '../pages/RegisterPage';
import EditStore from '../pages/Edit';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar /> 
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStore />} />
          <Route path="/edit" element={<EditStore />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
