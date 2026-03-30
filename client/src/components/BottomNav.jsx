import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, AlertCircle, Filter, BookOpen, BarChart3, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Home',       icon: Home,         path: '/dashboard' },
  { label: 'Complaints', icon: AlertCircle,  path: '/complaints' },
  { label: 'Drama',      icon: Filter,       path: '/drama-filter' },
  { label: 'Bylaw Bot',  icon: BookOpen,     path: '/bylaw-bot' },
  { label: 'Accounts',   icon: BarChart3,    path: '/accounts', adminOnly: true },
];

export const getNavItems = (user) => {
  if (!user || user.role === 'admin' || user.role === 'superadmin') return NAV_ITEMS;
  return NAV_ITEMS.filter(item => !item.adminOnly);
};

/* ── Desktop Sidebar ────────────────────────────────────── */
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar-width fixed left-0 top-0 h-full bg-white/80 backdrop-blur-2xl border-r border-slate-100 flex flex-col z-40 hidden lg:flex">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-glow">
            <Home size={20} className="text-white" />
          </div>
          <div>
            <p className="font-extrabold text-slate-900 leading-tight">AI Panchayat</p>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Digital Society</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {getNavItems(user).map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                active
                  ? 'text-violet-700 bg-violet-50/50'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-pill"
                  className="absolute left-0 w-1 h-8 bg-gradient-to-b from-violet-600 to-indigo-600 rounded-r-full shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={20} strokeWidth={active ? 2.5 : 2} className={active ? 'text-violet-600' : ''} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* User + Logout */}
      {user && (
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
            <div className="w-9 h-9 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-sm shrink-0">
              {user.phone?.slice(-2) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{user.name || 'Resident'}</p>
              <p className="text-[10px] text-slate-400 truncate">+91 {user.phone}</p>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="p-1.5 hover:bg-red-50 rounded-xl transition-colors text-slate-400 hover:text-red-500">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

/* ── Mobile Bottom Navigation ───────────────────────────── */
const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-4px_24px_rgba(15,23,42,0.02)] z-50 px-2 pb-5 pt-3 lg:hidden">
      <div className="flex justify-around items-end max-w-md mx-auto">
        {getNavItems(useAuth().user).map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-2xl transition-all flex-1"
            >
              <div className={`relative flex items-center justify-center w-12 h-8 rounded-xl transition-all ${active ? 'bg-violet-50/50' : ''}`}>
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-violet-100 rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={`relative z-10 transition-colors ${active ? 'text-violet-600' : 'text-slate-400'}`}
                  strokeWidth={active ? 2.5 : 2}
                />
              </div>
              <span className={`text-[10px] font-bold transition-colors truncate ${active ? 'text-violet-700' : 'text-slate-400'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
