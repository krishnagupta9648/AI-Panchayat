import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCircle2, AlertCircle, IndianRupee, Mic, Info, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'complaint',
    title: 'Complaint Resolved',
    message: 'Common area lights flickering — marked as Done by Electric Express.',
    time: '2m ago',
    read: false,
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 2,
    type: 'alert',
    title: 'New Complaint Raised',
    message: 'Lift #2 not working in Block-C — please track progress in Complaints.',
    time: '1h ago',
    read: false,
    icon: AlertCircle,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Maintenance Due Reminder',
    message: 'Monthly maintenance of ₹3,500 is due by 5th April. Pay before the deadline.',
    time: '3h ago',
    read: false,
    icon: IndianRupee,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 4,
    type: 'voice',
    title: 'Ticket Created via Voice',
    message: 'Your voice complaint has been converted to a ticket successfully.',
    time: 'Yesterday',
    read: true,
    icon: Mic,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 5,
    type: 'info',
    title: 'Society Meeting Scheduled',
    message: 'RWA general body meeting on Sunday, April 6th at 10 AM in the clubhouse.',
    time: '2 days ago',
    read: true,
    icon: Info,
    color: 'bg-purple-100 text-purple-600',
  },
];

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markOneRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismissOne = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 relative hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white px-0.5">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
            style={{ maxHeight: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-base">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-1"
                  >
                    <Check size={12} /> Mark all read
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto" style={{ maxHeight: '380px' }}>
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Bell size={22} className="text-gray-400" />
                  </div>
                  <p className="font-bold text-gray-600 text-sm">All caught up!</p>
                  <p className="text-xs text-gray-400 mt-1">No new notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  <AnimatePresence initial={false}>
                    {notifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.2 }}
                          onClick={() => markOneRead(notif.id)}
                          className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                            !notif.read ? 'bg-indigo-50/40' : 'bg-white'
                          }`}
                        >
                          {/* Icon */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${notif.color}`}>
                            <Icon size={16} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm font-bold leading-snug ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notif.title}
                              </p>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{notif.time}</span>
                                {!notif.read && (
                                  <div className="w-2 h-2 bg-indigo-500 rounded-full shrink-0" />
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
                          </div>

                          {/* Dismiss */}
                          <button
                            onClick={(e) => { e.stopPropagation(); dismissOne(notif.id); }}
                            className="p-1 hover:bg-gray-200 rounded-lg transition-colors text-gray-300 hover:text-gray-500 shrink-0 mt-0.5"
                          >
                            <X size={13} />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-3 bg-gray-50/80">
                <button
                  onClick={() => setNotifications([])}
                  className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
