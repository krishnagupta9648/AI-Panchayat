import React from 'react';
import { ArrowLeft, Wallet, TrendingDown, TrendingUp, PieChart as PieChartIcon, Download, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EXPENSES = [
  { category: 'Security & Staff',     amount: '₹85,000', share: 35, color: '#4F46E5' },
  { category: 'Electricity & Water',  amount: '₹65,000', share: 27, color: '#3B82F6' },
  { category: 'Waste Management',     amount: '₹30,000', share: 12, color: '#10B981' },
  { category: 'Repairs & Maint.',     amount: '₹60,000', share: 26, color: '#F43F5E' },
];

const RECENT = [
  { label: 'Cleaning Staff Salary',   amount: '-₹42,000',   date: 'Mar 28', type: 'debit'  },
  { label: 'Maintenance Collection',  amount: '+₹1,20,000', date: 'Mar 25', type: 'credit' },
  { label: 'Electricity Bill',        amount: '-₹38,500',   date: 'Mar 22', type: 'debit'  },
  { label: 'Lift Repair Payment',     amount: '-₹15,000',   date: 'Mar 20', type: 'debit'  },
  { label: 'Maintenance Collection',  amount: '+₹80,000',   date: 'Mar 15', type: 'credit' },
];

const buildDonut = (expenses) => {
  const circumference = 2 * Math.PI * 38;
  let offset = 0;
  return expenses.map(ex => {
    const dash = (ex.share / 100) * circumference;
    const gap = circumference - dash;
    const arc = { color: ex.color, dash, gap, offset };
    offset += dash;
    return arc;
  });
};

const Accounts = () => {
  const navigate = useNavigate();
  const arcs = buildDonut(EXPENSES);

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Society Accounts</h1>
        </div>
        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors flex items-center gap-1.5 text-sm font-semibold">
          <Download size={18} />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      <div className="page-container px-4 sm:px-6 py-5 space-y-5">
        {/* Hero Collection Card — full width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-600 p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-indigo-200 text-white relative overflow-hidden"
        >
          <div className="absolute -right-6 -bottom-6 opacity-10"><Wallet size={140} /></div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">Total Collection</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">₹4.8L</span>
            <span className="text-sm text-indigo-200">/ this month</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold bg-white/10 px-3 py-1.5 rounded-full">
              <TrendingUp size={13} /> +12.5% vs last month
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-200 font-bold bg-white/10 px-3 py-1.5 rounded-full">
              <IndianRupee size={11} /> 98% Paid
            </div>
          </div>

          {/* Mini stats row */}
          <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-white/20">
            {[['₹5.0L', 'Budget'], ['₹2.4L', 'Spent'], ['₹2.4L', 'Balance']].map(([val, lab]) => (
              <div key={lab}>
                <p className="font-extrabold text-lg">{val}</p>
                <p className="text-xs text-indigo-200 mt-0.5">{lab}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two-column on desktop */}
        <div className="accounts-grid">
          {/* Donut Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <PieChartIcon size={17} className="text-indigo-600" />
                Expense Breakdown
              </h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Budget: ₹5L</span>
            </div>
            <div className="flex justify-center mb-6 relative">
              <svg viewBox="0 0 100 100" className="w-44 h-44 -rotate-90">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F1F5F9" strokeWidth="14" />
                {arcs.map((arc, i) => (
                  <circle key={i} cx="50" cy="50" r="38" fill="transparent"
                    stroke={arc.color} strokeWidth="14"
                    strokeDasharray={`${arc.dash} ${arc.gap}`}
                    strokeDashoffset={-arc.offset}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Spent</p>
                <p className="text-xl font-extrabold text-gray-800">₹2.4L</p>
                <p className="text-[9px] text-gray-400 font-medium">of ₹5L</p>
              </div>
            </div>
            <div className="space-y-3">
              {EXPENSES.map((ex, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ex.color }} />
                      <span className="text-sm font-semibold text-gray-700">{ex.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{ex.amount}</span>
                      <span className="text-[10px] text-gray-400 font-bold ml-1.5">{ex.share}%</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${ex.share}%`, backgroundColor: ex.color }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {RECENT.map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      {tx.type === 'credit'
                        ? <TrendingUp size={16} className="text-emerald-600" />
                        : <TrendingDown size={16} className="text-red-500" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{tx.label}</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold shrink-0 ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {tx.amount}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold text-sm py-3 rounded-2xl transition-all">
              View All Transactions
            </button>
          </motion.div>
        </div>

        {/* Download Report */}
        <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl border border-indigo-100 shadow-sm hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
          <Download size={17} />
          Download Full Financial Report
        </button>
      </div>
    </div>
  );
};

export default Accounts;
