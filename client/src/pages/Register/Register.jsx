import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Phone, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const [formData, setFormData] = useState({
    societyName: '',
    societyCode: '',
    adminName: '',
    adminPhone: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.societyName || !formData.societyCode) {
      setError('Please fill all fields');
      return;
    }
    // basic validation
    if (formData.societyCode.includes(' ')) {
      setError('Society Code cannot contain spaces (e.g. greenvalley, sunrisepark)');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.adminName || formData.adminPhone.length < 10) {
      setError('Enter valid details (10 digit phone)');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await authService.register(formData);
      // Wait a sec for dramatic effect
      await new Promise(r => setTimeout(r, 600));
      // Auto login the new admin
      login(res.data.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register society.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-500">
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-premium border border-slate-100 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-glow border border-white/10">
            <Building2 className="text-white w-8 h-8" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center text-slate-900 mb-2 tracking-tight">Register Society</h2>
        <p className="text-slate-500 text-center mb-8 text-sm font-medium">Create your multi-tenant workspace</p>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 1 ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-glow' : 'bg-emerald-500 text-white shadow-md'}`}>
            {step > 1 ? <CheckCircle2 size={18} /> : '1'}
          </div>
          <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all ${step > 1 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-glow' : 'bg-slate-100 text-slate-400'}`}>
            2
          </div>
        </div>

        {error && <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm font-semibold rounded-xl text-center border border-red-100">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Society Name</label>
              <input name="societyName" value={formData.societyName} onChange={handleChange} placeholder="e.g. Green Valley Residency" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-900 font-bold transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Society Login Code</label>
              <input name="societyCode" value={formData.societyCode} onChange={handleChange} placeholder="e.g. greenvalley" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-900 font-bold lowercase transition-all" />
              <p className="text-xs text-slate-500 mt-1.5 font-medium">Residents will use this short code to log in.</p>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-glow transition-all flex items-center justify-center gap-2 mt-2 active:scale-95">
              Continue <ArrowLeft size={18} className="rotate-180" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1"><User size={16} className="text-violet-600" /> Manager Name</label>
              <input name="adminName" value={formData.adminName} onChange={handleChange} placeholder="Your full name" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-900 font-bold transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1"><Phone size={16} className="text-violet-600" /> Manager Phone</label>
              <input name="adminPhone" type="tel" maxLength={10} value={formData.adminPhone} onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value.replace(/\D/g, '') })} placeholder="10 digit number" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 outline-none text-slate-900 font-bold transition-all" />
              <p className="text-xs text-slate-500 mt-1.5 font-medium">You will be the first Super Admin.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => { setStep(1); setError(''); }} className="px-5 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all">Back</button>
              <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-[0_8px_30px_-4px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95">
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Create Society ✨'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Register;
