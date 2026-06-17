import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import { motion } from 'framer-motion';

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(res => setMovies(res.data));
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {movies.map((movie: any) => (
        <motion.div 
          key={movie.id} 
          className="p-6 bg-gray-900 rounded-2xl border border-gray-800 text-white"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <p className="text-gray-400">{movie.genre}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MovieCatalog;
