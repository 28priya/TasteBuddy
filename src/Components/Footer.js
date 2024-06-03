// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} Tastebuddy. All rights reserved.</p>
        {/* Add social media icons/links here */}
      </div>
    </footer>
  );
};

export default Footer;
