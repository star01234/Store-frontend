import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <div className="navbar" style={{ backgroundColor: "#A020F0" }}>
      {/* Left side: logo/title */}
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl text-white">
          STORE DELIVERY ZONE
        </a>
      </div>
  
      {/* Mobile Menu Toggle Button */}
      <div className="flex-none md:hidden">
        <button
          className="btn btn-square btn-ghost text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
  
      {/* Desktop Menu */}
      <div className="flex-none hidden md:flex items-center space-x-4">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a href="/" className="text-white hover:text-blue-200">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-white hover:text-blue-200">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="text-white hover:text-blue-200">
              Services
            </a>
          </li>
          <li>
            <a href="/Add" className="text-white hover:text-blue-200">
              Add
            </a>
          </li>
        </ul>
  
        {userName ? (
          <div className="flex items-center space-x-2">
            <span className="text-white bg-blue-900 px-3 py-1 rounded">
              {userName}
            </span>
            <span className="text-white bg-orange-600 px-3 py-1 rounded">
              {userRole}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <a href="/login" className="text-white hover:text-blue-200">
              Login
            </a>
            <a href="/register" className="text-white hover:text-blue-200">
              Register
            </a>
          </>
        )}
      </div>
  
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 right-0 z-10 bg-blue-600 shadow-md rounded-lg md:hidden">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <a href="/" className="block text-white hover:text-blue-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block text-white hover:text-blue-200">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="block text-white hover:text-blue-200">
                Services
              </a>
            </li>
            <li>
              <a href="/Add" className="block text-white hover:text-blue-200">
                Add
              </a>
            </li>
            {userName ? (
              <li className="flex items-center space-x-2">
                <span className="block text-white bg-blue-900 px-3 py-1 rounded">
                  {userName}
                </span>
                <span className="block text-white bg-orange-600 px-3 py-1 rounded">
                  {userRole}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <a href="/login" className="block text-white hover:text-blue-200">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="block text-white hover:text-blue-200">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
};
  

export default Navbar;