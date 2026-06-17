import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { login } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login success:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="p-8 bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
      </motion.form>
    </div>
  );
};

export default LoginPage;
