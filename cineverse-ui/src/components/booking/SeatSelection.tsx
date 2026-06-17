import React, { useState } from 'react';
import { ScreenShare } from 'lucide-react';

interface SeatSelectionProps {
  numRequired: number;
  bookedSeats: string[];
  onConfirm: (seats: string[]) => void;
  submitting?: boolean;
}

const SeatSelection = ({ numRequired, bookedSeats, onConfirm, submitting = false }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // 5 rows × 8 columns = 40 seats: A1–E8
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : prev.length < numRequired
        ? [...prev, seat]
        : prev
    );
  };

  const getSeatState = (seat: string): 'booked' | 'selected' | 'available' => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (selectedSeats.includes(seat)) return 'selected';
    return 'available';
  };

  const seatStyles = {
    booked: 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-60',
    selected: 'bg-brand-600 border-brand-700 text-white cursor-pointer shadow-sm transform scale-105',
    available: 'bg-white border-brand-300 text-brand-600 cursor-pointer hover:bg-brand-50 hover:border-brand-400',
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-200 p-8 max-w-2xl mx-auto">
      
      {/* Header Info */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Select Seats</h3>
          <p className="text-sm text-slate-500">Choose {numRequired} seat{numRequired > 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border border-brand-300"></div> Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-brand-600 border border-brand-700"></div> Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300"></div> Taken
          </div>
        </div>
      </div>

      {/* Screen Indicator */}
      <div className="mb-12 text-center">
        <div className="w-3/4 mx-auto h-2 bg-slate-200 rounded-t-full shadow-inner mb-2" />
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center justify-center gap-2">
           Screen This Way
        </p>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-4 mb-10 max-w-lg mx-auto">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-4">
            <span className="w-6 text-center text-sm font-bold text-slate-400 shrink-0">{row}</span>
            <div className="flex gap-2 flex-1 justify-center">
              {cols.map((col, colIdx) => {
                const seat = `${row}${col}`;
                const state = getSeatState(seat);
                
                return (
                  <React.Fragment key={seat}>
                    {/* Aisle gap */}
                    {colIdx === 4 && <div className="w-6 shrink-0" />}
                    
                    <button
                      onClick={() => toggleSeat(seat)}
                      disabled={state === 'booked'}
                      className={`w-10 h-10 rounded-md border text-sm font-medium transition-all duration-200 flex items-center justify-center ${seatStyles[state]}`}
                    >
                      {col}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
        <div>
          <p className="text-sm text-slate-500 font-medium">Selected Seats</p>
          <p className="font-bold text-slate-900 text-lg">
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
          </p>
        </div>
        <button
          onClick={() => onConfirm(selectedSeats)}
          disabled={selectedSeats.length !== numRequired || submitting}
          className="btn-primary py-2.5 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Confirming...' : `Confirm Seats`}
        </button>
      </div>

    </div>
  );
};

export default SeatSelection;
