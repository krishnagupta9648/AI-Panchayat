import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Flame, TrendingUp, RefreshCw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SUMMARIES = [
  {
    title: 'The society chat is mainly about maintenance issues and gym timings.',
    highlights: [
      { text: '20 residents want the lift repaired in Block C.', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
      { text: '5 residents want the gym open till 11 PM.', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
      { text: '3 complaints about water leakage in the lobby.', icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
    ],
    numbers: { maintenance: 12, pendingApprovals: 5, totalMessages: 420 },
  },
  {
    title: 'Parking and security were the dominant topics today.',
    highlights: [
      { text: '15 residents unhappy with visitor parking.', icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
      { text: '8 residents asking about security guard rounds.', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
      { text: '4 residents requested new speed bumps near Gate 2.', icon: MessageSquare, color: 'text-violet-600', bg: 'bg-violet-50' },
    ],
    numbers: { maintenance: 8, pendingApprovals: 3, totalMessages: 316 },
  },
];

const DramaFilter = () => {
  const navigate = useNavigate();
  const [summaryIdx, setSummaryIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const summary = SUMMARIES[summaryIdx];

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSummaryIdx(prev => (prev + 1) % SUMMARIES.length);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Today's Summary</h1>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="page-container px-4 sm:px-6 py-5">
        {/* Two-column layout on desktop */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">

          {/* Main Summary */}
          {loading ? (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4">
              <div className="skeleton h-4 w-32 rounded-full" />
              <div className="skeleton h-6 w-full" />
              <div className="skeleton h-5 w-5/6" />
              {[1,2,3].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="skeleton w-10 h-10 rounded-full shrink-0" />
                  <div className="skeleton h-4 flex-1 mt-3" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              key={summaryIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-full tracking-wider flex items-center gap-1">
                  <Sparkles size={10} /> AI Generated
                </div>
                <p className="text-[10px] text-gray-400">Based on {summary.numbers.totalMessages} messages</p>
              </div>
              <h2 className="text-base font-bold text-gray-800 mb-5 leading-snug">{summary.title}</h2>
              <div className="space-y-4">
                {summary.highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${item.bg}`}>
                      <item.icon className={item.color} size={17} />
                    </div>
                    <p className="text-gray-700 text-sm py-2.5 font-medium leading-snug">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Right column on desktop */}
          <div className="space-y-4">
            {/* Stats Card */}
            {!loading && (
              <motion.div
                key={`stats-${summaryIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-indigo-600 p-6 rounded-3xl text-white"
              >
                <h3 className="text-sm font-bold text-indigo-200 mb-4 uppercase tracking-wider">Important Numbers</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Messages', value: summary.numbers.totalMessages },
                    { label: 'Maintenance', value: summary.numbers.maintenance },
                    { label: 'Pending', value: summary.numbers.pendingApprovals },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/10 rounded-2xl p-3 text-center">
                      <p className="text-2xl font-extrabold">{value}</p>
                      <p className="text-[10px] text-indigo-200 font-medium mt-0.5 leading-tight">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* View Messages CTA */}
            {!loading && (
              <button className="w-full text-indigo-600 font-bold text-sm py-4 hover:bg-indigo-50 transition-all rounded-2xl border-2 border-dashed border-indigo-100 flex items-center justify-center gap-2">
                View Full Chat Log →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DramaFilter;
