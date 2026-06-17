import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, User, Menu, ChevronDown, Ticket } from 'lucide-react';
import { isAuthenticated, getAuthName, clearAuthData } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(isAuthenticated());
  const [userName, setUserName] = useState(getAuthName());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
    setUserName(getAuthName());
    setMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    clearAuthData();
    setAuthed(false);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Search */}
          <div className="flex items-center flex-1">
            <Link to="/" className="flex items-center gap-2 mr-8">
              <Ticket className="h-6 w-6 text-brand-600" />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Cineverse
              </span>
            </Link>

            <div className="hidden sm:flex flex-1 max-w-lg items-center relative">
              <Search className="h-5 w-5 text-slate-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Search for Movies, Events, Plays, Sports and Activities" 
                className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-6">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
              <MapPin className="h-4 w-4" />
              Select Location
              <ChevronDown className="h-4 w-4" />
            </button>

            {authed ? (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 py-1 px-2 rounded-md transition">
                  <div className="bg-brand-100 text-brand-700 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {userName?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Nav for Categories (Desktop) */}
      <div className="hidden sm:block border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-10 gap-6 text-sm text-slate-600">
            <Link to="/movies" className="hover:text-brand-600 font-medium">Movies</Link>
            <Link to="#" className="hover:text-brand-600">Events</Link>
            <Link to="#" className="hover:text-brand-600">Plays</Link>
            <Link to="#" className="hover:text-brand-600">Sports</Link>
            <Link to="#" className="hover:text-brand-600">Activities</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/movies" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Movies</Link>
            <button className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">
              <MapPin className="h-5 w-5" /> Location
            </button>
            {authed ? (
              <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-slate-50">
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-brand-600 hover:bg-slate-50">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
