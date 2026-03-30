import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquareText, AlertCircle,
  IndianRupee, ChevronRight, BookOpen, Mic, BarChart3, Filter, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getGreeting } from '../../utils/formatTime';
import NotificationPanel from '../../components/NotificationPanel';

const StatCard = ({ label, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-5 rounded-3xl shadow-premium border border-slate-100 flex flex-col justify-between min-w-[140px] transition-all hover:shadow-premium-hover hover:-translate-y-1"
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color.bg}`}>
      <Icon className={`w-5 h-5 ${color.text}`} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
    </div>
  </motion.div>
);

const FeatureButton = ({ title, description, icon: Icon, onClick, color, delay }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    onClick={onClick}
    className="bg-white p-5 rounded-3xl shadow-premium border border-slate-100 flex flex-col items-start gap-3 transition-all hover:shadow-premium-hover hover:border-violet-100 hover:-translate-y-1 text-left active:scale-95 w-full"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color.bg}`}>
      <Icon className={`w-6 h-6 ${color.text}`} />
    </div>
    <div className="flex-1">
      <h3 className="font-extrabold text-slate-800 text-sm">{title}</h3>
      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">{description}</p>
    </div>
    <div className="flex items-center text-violet-600 font-bold text-xs">
      Option <ChevronRight size={14} className="ml-0.5" />
    </div>
  </motion.button>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const complaints = (() => {
    try { return JSON.parse(localStorage.getItem('ai_panchayat_complaints') || '[]'); }
    catch { return []; }
  })();
  const pendingCount = complaints.filter(c => c.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-nav">
      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-10 border-b border-slate-100 shadow-[0_4px_30px_rgba(15,23,42,0.03)]"
      >
        <div>
          <p className="text-[10px] text-violet-600 font-bold uppercase tracking-widest">{getGreeting()} 👋</p>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 tracking-tight">Green Valley Area</h1>
        </div>
        <div className="flex gap-2">
          <NotificationPanel />
          <button onClick={() => { logout(); navigate('/'); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100/50 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors border border-slate-200/50">
            <LogOut size={18} />
          </button>
        </div>
      </motion.div>

      <div className="page-container px-4 sm:px-6 py-6 space-y-6">
        {/* Stats Row */}
        <div className="stats-row scrollbar-hide">
          <StatCard label="Messages Today" value="420"           icon={MessageSquareText} color={{ bg: 'bg-blue-50',   text: 'text-blue-600'   }} delay={0.1} />
          <StatCard label="Open Complaints" value={pendingCount || '—'} icon={AlertCircle}     color={{ bg: 'bg-red-50',    text: 'text-red-600'    }} delay={0.2} />
          <StatCard label="Monthly Spend"  value="₹2.4L"         icon={IndianRupee}    color={{ bg: 'bg-orange-50', text: 'text-orange-600' }} delay={0.3} />
        </div>

        {/* Feature Grid */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Access</h2>
          <div className="feature-grid">
            <FeatureButton title="Drama Filter" description="AI summary of WhatsApp chaos."    icon={Filter}       onClick={() => navigate('/drama-filter')}    color={{ bg: 'bg-indigo-50', text: 'text-indigo-600' }} delay={0.4} />
            <FeatureButton title="Complaints"   description="Raise & track society issues."    icon={AlertCircle}  onClick={() => navigate('/complaints')}      color={{ bg: 'bg-pink-50',   text: 'text-pink-600'   }} delay={0.5} />
            <FeatureButton title="Bylaw Bot"    description="AI assistant for society rules."  icon={BookOpen}     onClick={() => navigate('/bylaw-bot')}       color={{ bg: 'bg-blue-50',   text: 'text-blue-600'   }} delay={0.6} />
            <FeatureButton title="Accounts"     description="Track maintenance & expenses."    icon={BarChart3}    onClick={() => navigate('/accounts')}        color={{ bg: 'bg-green-50',  text: 'text-green-600'  }} delay={0.7} />
          </div>
        </div>

        {/* Voice to Ticket CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate('/voice-to-ticket')}
          className="bg-gradient-to-br from-violet-600 to-indigo-600 p-6 sm:p-7 rounded-[2rem] flex items-center justify-between text-white cursor-pointer transition-all hover:scale-[1.02] active:scale-[.98] shadow-glow"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <Mic size={26} className="text-white" />
            </div>
            <div>
              <p className="font-extrabold text-lg tracking-tight">Voice-to-Ticket</p>
              <p className="text-sm text-white/80 font-medium mt-0.5">Report issues verbally via AI</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <ChevronRight size={22} className="text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
