import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-8 bg-black text-white flex justify-between items-center border-b border-gray-800">
      <h1 className="text-2xl font-bold tracking-tighter text-blue-500">CINEVERSE</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/movies" className="hover:text-blue-400 transition">Movies</Link>
        <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
