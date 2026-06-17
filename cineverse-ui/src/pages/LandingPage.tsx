import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Film, CalendarDays, Ticket } from 'lucide-react';
import { getMovies, type Movie } from '../services/api';

const LandingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies()
      .then((res) => setMovies(res.data.slice(0, 5))) // Just get top 5 for hero
      .catch(console.error);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hero Carousel Area (Mocked with a static banner) */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="inline-flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1 text-sm text-slate-300 mb-6 border border-slate-700">
              <Ticket className="h-4 w-4 text-brand-400" /> Book tickets instantly
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your gateway to <span className="text-brand-400">entertainment.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg">
              Discover the latest movies, exclusive premieres, and book your favorite seats with just a few clicks.
            </p>
            <div className="flex gap-4">
              <Link to="/movies" className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-md font-medium transition flex items-center gap-2">
                Browse Movies <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end">
            {/* Abstract representation of a ticket/movie graphic */}
            <div className="relative w-full max-w-md aspect-[4/3] bg-gradient-to-tr from-slate-800 to-slate-700 rounded-xl border border-slate-600 shadow-2xl overflow-hidden flex items-center justify-center">
               <Film className="h-32 w-32 text-slate-600 opacity-50" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Movies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recommended Movies</h2>
            <p className="text-slate-500 mt-1">Catch the latest blockbusters</p>
          </div>
          <Link to="/movies" className="text-brand-600 font-medium flex items-center gap-1 hover:text-brand-700">
            See All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map(movie => (
              <Link to={`/book/${movie.id}`} key={movie.id} className="group cursor-pointer flex flex-col">
                <div className="aspect-[2/3] bg-slate-200 rounded-xl mb-3 overflow-hidden border border-slate-200 shadow-sm transition group-hover:shadow-md relative">
                   {/* Fallback image placeholder */}
                   <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                      <Film className="h-12 w-12 text-slate-300" />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white font-medium bg-brand-600 px-3 py-1 rounded-md text-sm">Book Now</span>
                   </div>
                </div>
                <h3 className="font-semibold text-slate-900 truncate">{movie.title}</h3>
                <p className="text-sm text-slate-500">{movie.genre}</p>
              </Link>
            ))
          ) : (
            // Skeletons
            [...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-[2/3] bg-slate-200 rounded-xl mb-3 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-brand-600">
              <Ticket className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">M-Ticket</h3>
              <p className="text-sm text-slate-500">Scan your mobile ticket at the gate. No printout required.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-lg text-green-600">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Advance Booking</h3>
              <p className="text-sm text-slate-500">Book tickets up to 7 days in advance for your favorite shows.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Premium Experiences</h3>
              <p className="text-sm text-slate-500">Enjoy IMAX, 4DX, and premium seating options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
