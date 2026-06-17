import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-extrabold mb-6 tracking-tighter">
          Experience Cinema, <span className="text-blue-500">Refined.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl">
          Cineverse brings the premium booking experience directly to your fingertips. 
          Minimal, fast, and built for true movie lovers.
        </p>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="px-8 py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Browse Movies
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-4 bg-gray-800 rounded-xl font-bold hover:bg-gray-700 transition"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
