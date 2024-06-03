// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">Tastebuddy</Link>
        <div className="flex space-x-4">
          <Link to="/about" className="text-white">About</Link>
          <Link to="/testimonials" className="text-white">Testimonials</Link>
          <Link to="/contact" className="text-white">Contact</Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
