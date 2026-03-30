import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShieldCheck, Loader2, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [societyCode, setSocietyCode] = useState('greenvalley'); // Default for easy testing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    if (!societyCode.trim()) {
      setError('Enter a valid Society Code');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await authService.login(phoneNumber, societyCode.trim().toLowerCase());
      // On success, res.data.user has role, societyCode, phone, etc.
      login(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials or society code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel — decorative (visible on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-violet-600 to-indigo-700 flex-col items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white"
              style={{ width: `${200 + i * 120}px`, height: `${200 + i * 120}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-md text-center text-white">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Building2 size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight tracking-tight">AI Panchayat</h1>
          <p className="text-xl text-violet-100 mb-10 leading-relaxed font-medium">
            The digital referee for housing societies — AI-powered complaints, bylaws & accounts.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[['420+', 'Messages Managed'], ['98%', 'Collection Rate'], ['12', 'Open Tickets']].map(([val, lab]) => (
              <div key={lab} className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4">
                <p className="text-2xl font-black">{val}</p>
                <p className="text-[11px] text-violet-100 mt-1 uppercase tracking-widest font-bold">{lab}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-slate-50 lg:bg-white relative">
        <div className="w-full max-w-sm relative z-10">
          {/* Mobile logo */}
          <div className="flex flex-col items-center mb-10 lg:items-start text-center lg:text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-glow mb-5 lg:hidden border border-white/20">
              <Home className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">Sign in with your registered mobile number</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Society Code</label>
              <input
                type="text"
                value={societyCode}
                onChange={(e) => { setSocietyCode(e.target.value); setError(''); }}
                placeholder="e.g. greenvalley"
                className="w-full px-4 py-4 bg-white lg:bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-slate-900 font-bold text-base lowercase shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Mobile Number</label>
              <div className="relative shadow-sm rounded-2xl">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91</span>
                <div className="absolute left-12 top-1/2 -translate-y-1/2 w-px h-5 bg-slate-200" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value.replace(/\D/g, '')); setError(''); }}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-16 pr-4 py-4 bg-white lg:bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-slate-900 font-bold text-base tracking-wide"
                  maxLength={10}
                  inputMode="numeric"
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-glow transition-all active:scale-95 flex items-center justify-center gap-2 text-base mt-2"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Continue →'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck size={16} className="text-emerald-500" />
              Secure login for residents only
            </div>
            <p className="text-sm text-slate-500 font-medium pb-4">
              New society?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-violet-600 font-extrabold hover:text-violet-700 hover:underline transition-all"
              >
                Register it here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
