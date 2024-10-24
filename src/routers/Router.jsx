import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import AddStore from "../pages/Add";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import RegisterPage from "../pages/RegisterPage";
import EditStore from "../pages/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/add",
    element: (
      <>
        <Navbar />
        <AddStore />
      </>
    ),
  },
  {
    path: "/edit",
    element: (
      <>
        <Navbar />
        <EditStore />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <RegisterPage />
      </>
    ),
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
