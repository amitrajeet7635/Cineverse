import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SeatSelection = ({ onConfirm }: { onConfirm: (seats: string[]) => void }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const seats = Array.from({ length: 30 }, (_, i) => `S${i + 1}`);

  const toggleSeat = (seat: string) => {
    setSelectedSeats(prev => 
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-white">Select Your Seats</h3>
      <div className="grid grid-cols-6 gap-2">
        {seats.map(seat => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            className={`w-10 h-10 rounded ${selectedSeats.includes(seat) ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition`}
          >
            {seat.slice(1)}
          </button>
        ))}
      </div>
      <button 
        onClick={() => onConfirm(selectedSeats)}
        className="mt-6 w-full py-3 bg-green-600 rounded-lg font-bold text-white hover:bg-green-700 transition"
      >
        Confirm Seats
      </button>
    </div>
  );
};

export default SeatSelection;
