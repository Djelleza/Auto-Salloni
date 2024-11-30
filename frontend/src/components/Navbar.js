import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => (
  <nav className="bg-purple-800 text-white shadow-md">
    <div className="container mx-auto flex justify-between items-center py-4 px-6">
      <Link to="/" className="text-2xl font-bold">Auto Sallon</Link>

      <div className="flex space-x-4">
        <Link to="/" className="text-pink-200 hover:text-white">Home</Link>
        <Link to="/cars" className="text-pink-200 hover:text-white">Cars</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
