import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Ticket, AlertCircle, Eye, EyeOff, UserPlus, CheckCircle2 } from 'lucide-react';
import { register, saveAuthData, login } from '../services/api';

const getPasswordStrength = (pw: string) => {
  if (pw.length === 0) return { score: 0, text: '', color: 'bg-slate-200' };
  if (pw.length < 6) return { score: 1, text: 'Weak', color: 'bg-red-500' };
  if (pw.length < 8) return { score: 2, text: 'Fair', color: 'bg-amber-500' };
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) return { score: 4, text: 'Strong', color: 'bg-green-500' };
  return { score: 3, text: 'Good', color: 'bg-brand-500' };
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password);
      const loginRes = await login(email, password);
      saveAuthData(loginRes.data);
      navigate('/');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        'Registration failed. Email may already be in use.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-card border border-slate-200 overflow-hidden">
        
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-50 p-3 rounded-full text-brand-600">
              <UserPlus className="h-8 w-8" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Create an Account</h2>
          <p className="text-slate-500 text-center text-sm mb-8">Join Cineverse for the best booking experience</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="input-field"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="input-field pr-10"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className={`flex-1 rounded-full transition-colors ${level <= strength.score ? strength.color : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${strength.score < 3 ? 'text-slate-500' : 'text-green-600'}`}>
                    {strength.text}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-2.5"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-slate-500">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
