import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Ticket, CheckCircle2 } from 'lucide-react';
import { getMovieById, isAuthenticated } from '../../services/api';
import SeatSelection from './SeatSelection';

const BookingFlow = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<any>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ticketCount, setTicketCount] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (movieId) {
      getMovieById(Number(movieId))
        .then((res) => setMovie(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [movieId, navigate]);

  const handleSeatConfirm = (seats: string[]) => {
    setSelectedSeats(seats);
    setStep(3);
  };

  const handleFinalBooking = () => {
    setSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      navigate('/confirmation');
    }, 1500);
  };

  if (loading) return <div className="p-12 text-center text-slate-500 font-medium">Loading booking flow...</div>;
  if (!movie) return <div className="p-12 text-center text-slate-500 font-medium">Movie not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{movie.title}</h1>
          <p className="text-sm text-slate-500">PVR Cinemas • Today, 7:30 PM</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-lg mx-auto mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-500 -z-10 rounded-full transition-all duration-500" 
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />

        {[
          { num: 1, label: 'Tickets' },
          { num: 2, label: 'Seats' },
          { num: 3, label: 'Payment' }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center bg-slate-50 px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors duration-300 ${
              step >= s.num ? 'bg-brand-600 text-white shadow-md' : 'bg-white border-2 border-slate-300 text-slate-400'
            }`}>
              {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
            </div>
            <span className={`text-xs font-medium ${step >= s.num ? 'text-brand-700' : 'text-slate-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Ticket Quantity */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-card border border-slate-200 p-8 text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-6">How many tickets?</h2>
          
          <div className="flex items-center justify-center gap-6 mb-8">
            <button 
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
              className="w-12 h-12 rounded-full border-2 border-slate-200 text-slate-600 flex items-center justify-center text-xl hover:bg-slate-50 hover:border-slate-300 transition"
            >
              -
            </button>
            <span className="text-4xl font-bold text-brand-600 w-16">{ticketCount}</span>
            <button 
              onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
              className="w-12 h-12 rounded-full border-2 border-slate-200 text-slate-600 flex items-center justify-center text-xl hover:bg-slate-50 hover:border-slate-300 transition"
            >
              +
            </button>
          </div>

          <button onClick={() => setStep(2)} className="w-full btn-primary py-3">
            Select Seats
          </button>
        </div>
      )}

      {/* Step 2: Seat Selection */}
      {step === 2 && (
        <SeatSelection
          numRequired={ticketCount}
          bookedSeats={['B4', 'B5', 'D2']} // Mock data
          onConfirm={handleSeatConfirm}
        />
      )}

      {/* Step 3: Confirmation / Payment Mock */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-card border border-slate-200 p-0 overflow-hidden max-w-md mx-auto">
          <div className="bg-slate-900 p-6 text-white text-center">
            <Ticket className="h-10 w-10 text-brand-400 mx-auto mb-2" />
            <h2 className="text-xl font-bold mb-1">Order Summary</h2>
            <p className="text-slate-400 text-sm">Review your booking details</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <span className="text-slate-500 font-medium">Movie</span>
                <span className="font-bold text-slate-900 text-right">{movie.title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <span className="text-slate-500 font-medium">Tickets</span>
                <span className="font-bold text-slate-900">{ticketCount}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <span className="text-slate-500 font-medium">Seats</span>
                <span className="font-bold text-slate-900">{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="font-bold text-brand-600 text-lg">Rs. {ticketCount * 250}</span>
              </div>
            </div>

            <button 
              onClick={handleFinalBooking}
              disabled={submitting}
              className="w-full btn-primary py-3"
            >
              {submitting ? 'Processing Payment...' : 'Proceed to Pay'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;
