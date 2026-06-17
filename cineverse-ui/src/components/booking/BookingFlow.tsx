import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SeatSelection from './SeatSelection';

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [numPeople, setNumPeople] = useState(1);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 text-white">
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-gray-900 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-4">How many people?</h2>
          <input 
            type="number" 
            min="1" max="10" 
            value={numPeople} 
            onChange={(e) => setNumPeople(parseInt(e.target.value))}
            className="w-full p-3 mb-4 bg-gray-800 rounded-lg"
          />
          <button onClick={() => setStep(2)} className="w-full py-3 bg-blue-600 rounded-lg">Next</button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, x: 0 }}>
          <SeatSelection onConfirm={(seats) => {
            if(seats.length === numPeople) setStep(3);
            else alert(`Please select ${numPeople} seats.`);
          }} />
        </motion.div>
      )}

      {step === 3 && (
        <div className="p-8 bg-green-900/20 border border-green-800 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-green-400">Booking Confirmed!</h2>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;
