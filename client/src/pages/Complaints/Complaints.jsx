import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, CheckCircle2, Clock, BadgeAlert, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['All', 'Pending', 'Done'];

const timeAgo = (date) => {
  const now = new Date();
  const d = date instanceof Date ? date : new Date(date);
  const diffMin = Math.floor((now - d) / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return 'Yesterday';
  return `${diffDay} days ago`;
};

const ComplaintCard = ({ title, status, vendor, createdAt, index }) => {
  const isDone = status === 'Done';
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 group transition-all hover:shadow-md hover:border-indigo-100"
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="font-bold text-gray-800 leading-snug flex-1">{title}</h3>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
          isDone ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {isDone ? <CheckCircle2 size={11} /> : <Clock size={11} />}
          {status}
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
            <BadgeAlert size={11} className="text-gray-500" />
          </div>
          <span>{vendor ? `Vendor: ${vendor}` : 'Unassigned'}</span>
        </div>
        <span>{createdAt ? timeAgo(createdAt) : ''}</span>
      </div>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-3">
    <div className="skeleton h-4 w-3/4" />
    <div className="skeleton h-3 w-1/2" />
  </div>
);

const SEED = [
  { _id: 's1', title: 'Lift #2 not working in Block-C', status: 'Pending', vendor: 'Otis Services', createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { _id: 's2', title: 'Water leakage in lobby bathroom', status: 'Pending', vendor: 'Ramesh Plumber', createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { _id: 's3', title: 'Common area lights flickering', status: 'Done', vendor: 'Electric Express', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: 's4', title: 'Main gate motor replacement', status: 'Done', vendor: 'GateKeeper Inc', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const loadComplaints = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('ai_panchayat_complaints') || '[]');
    const seedFiltered = SEED.filter(s => !saved.find(c => c._id === s._id));
    return [...saved, ...seedFiltered];
  } catch { return SEED; }
};

const Complaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => { setComplaints(loadComplaints()); setLoading(false); }, 400);
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const onFocus = () => fetchData();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const filtered = complaints.filter(c => activeTab === 'All' || c.status === activeTab);
  const pendingCount = complaints.filter(c => c.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 flex-1">Active Complaints</h1>
        {pendingCount > 0 && (
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs">
            {pendingCount}
          </div>
        )}
        <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <RefreshCw size={17} className="text-gray-400" />
        </button>
      </div>

      <div className="page-container px-4 sm:px-6 py-5">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-200'
              }`}
            >
              {tab}
              {tab === 'Pending' && pendingCount > 0 && (
                <span className="ml-1.5 bg-orange-400 text-white px-1.5 rounded-full text-[9px]">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* List — single col mobile, 2 cols on lg */}
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-indigo-400" />
            </div>
            <p className="font-bold text-gray-700">No {activeTab === 'All' ? '' : activeTab} complaints</p>
            <p className="text-xs text-gray-400 mt-1">Tap + to raise a new one.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <AnimatePresence>
              {filtered.map((c, idx) => (
                <ComplaintCard key={c._id} {...c} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/voice-to-ticket')}
        className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all shadow-indigo-300 z-20"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Complaints;
