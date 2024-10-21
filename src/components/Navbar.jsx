import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyWebsite</div>
        <ul className="flex space-x-4">
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
            <a href="/contact" className="text-white hover:text-blue-200">
              Contact
            </a>
          </li>
          <li>
            <a href="/login" className="text-white hover:text-blue-200">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
