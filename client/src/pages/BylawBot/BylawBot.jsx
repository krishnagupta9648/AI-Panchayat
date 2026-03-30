import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, RefreshCw, Mic, Smile, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ───────── helpers ───────── */
const now = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const todayLabel = () =>
  new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

/* ───────── bylaw KB ───────── */
const BYLAW_RESPONSES = {
  renovate:    'Renovation work requires **prior RWA approval**. Submit Form B at the society office.\n\n🗓 Permitted: Mon–Sat, 9 AM – 6 PM\n🚫 No work on Sundays or public holidays.',
  pet:         '🐾 Pets are welcome in common areas **on a leash only**.\n\n• Register your pet at the office\n• Clean up after your pet in all common areas',
  parking:     '🅿️ Each flat gets **one dedicated parking slot**.\n\n• Guest parking near Gate 2 — max 4 hrs\n• Overnight guest parking needs prior written permission',
  noise:       '🔇 Quiet hours after **10 PM** — no loud music, parties, or drilling.\n\nViolations can be reported to the security desk or via this app.',
  maintenance: '💳 Monthly maintenance is due by the **5th of each month**.\n\n• Late fee: ₹50/day after the 10th\n• Pay via the society portal or at the office',
  gym:         '💪 Gym hours: **6 AM – 10 PM** daily.\n\n• Carry your resident ID card\n• Guests are not permitted in the gym',
  pool:        '🏊 Pool hours:\n• Morning: 6 AM – 8 AM\n• Evening: 5 PM – 8 PM\n\n👶 Children under 12 must be accompanied by an adult.\n🔧 Closed on Mondays for maintenance.',
  lift:        '🛗 Lift maintenance: every **3rd Sunday**, 9 AM – 12 PM.\n\nReport breakdowns → Security: 9876543210',
  default:     'Great question! All activities in common areas must comply with **RWA guidelines**.\n\nFor detailed policies, contact:\n📧 office@greenvalley.in',
};

const getBotResponse = (q) => {
  const t = q.toLowerCase();
  if (t.includes('renovat') || t.includes('drill') || t.includes('construc') || t.includes('sunday')) return BYLAW_RESPONSES.renovate;
  if (t.includes('pet') || t.includes('dog') || t.includes('cat')) return BYLAW_RESPONSES.pet;
  if (t.includes('park') || t.includes('car') || t.includes('vehicle')) return BYLAW_RESPONSES.parking;
  if (t.includes('noise') || t.includes('party') || t.includes('music') || t.includes('loud')) return BYLAW_RESPONSES.noise;
  if (t.includes('maintenance') || t.includes('due') || t.includes('fee') || t.includes('pay')) return BYLAW_RESPONSES.maintenance;
  if (t.includes('gym') || t.includes('fitness')) return BYLAW_RESPONSES.gym;
  if (t.includes('pool') || t.includes('swim')) return BYLAW_RESPONSES.pool;
  if (t.includes('lift') || t.includes('elevator')) return BYLAW_RESPONSES.lift;
  return BYLAW_RESPONSES.default;
};

/* ───────── initial message ───────── */
const INITIAL_MESSAGES = [
  {
    id: 1,
    type: 'bot',
    text: 'Hello! 👋 I am **Bylaw Bot** for Green Valley Society 🏡\n\nAsk me anything about:\n• Renovation timings\n• Pet policy\n• Parking rules\n• Noise & maintenance\n• Gym / Pool hours',
    time: now(),
    read: true,
  },
];

const QUICK_QUESTIONS = [
  '🔨 Renovation timings?',
  '🐾 Pet policy?',
  '🅿️ Parking rules?',
  '💰 Maintenance fee?',
  '💪 Gym hours?',
  '🏊 Pool timings?',
];

/* ───────── Typing dots ───────── */
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 6 }}
    className="flex items-end gap-2 mb-1"
  >
    {/* Bot avatar */}
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
      <span className="text-white text-xs font-bold">BB</span>
    </div>
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm" style={{ minWidth: 60 }}>
      <div className="flex gap-1 items-center h-4">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-gray-400 dot-bounce"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ───────── Bold text parser ───────── */
const parseText = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
};

/* ───────── Double-tick SVG (read receipts) ───────── */
const DoubleTick = ({ read }) => (
  <svg width="16" height="10" viewBox="0 0 16 10" className="inline-block ml-1 -mb-0.5">
    <path d="M1 5l3 3 5-7" stroke={read ? '#4FC3F7' : '#ccc'} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 5l3 3 5-7" stroke={read ? '#4FC3F7' : '#ccc'} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ───────── Chat Bubble ───────── */
const ChatBubble = ({ msg }) => {
  const isUser = msg.type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      className={`flex items-end gap-2 mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm self-end mb-0.5">
          <span className="text-white text-[10px] font-bold">BB</span>
        </div>
      )}

      <div
        className={`relative max-w-[78%] sm:max-w-[65%] px-3 py-2 shadow-sm text-sm leading-relaxed
          ${isUser
            ? 'bg-[#DCF8C6] text-gray-900 rounded-2xl rounded-br-sm'
            : 'bg-white text-gray-900 rounded-2xl rounded-bl-sm'
          }`}
        style={{ wordBreak: 'break-word' }}
      >
        {/* Tail */}
        {isUser ? (
          <span
            style={{
              position: 'absolute', bottom: 0, right: -7,
              width: 0, height: 0,
              borderTop: '8px solid transparent',
              borderLeft: '8px solid #DCF8C6',
              borderBottom: 0,
            }}
          />
        ) : (
          <span
            style={{
              position: 'absolute', bottom: 0, left: -7,
              width: 0, height: 0,
              borderTop: '8px solid transparent',
              borderRight: '8px solid white',
              borderBottom: 0,
            }}
          />
        )}

        {/* Text */}
        <p className="whitespace-pre-line">{parseText(msg.text)}</p>

        {/* Timestamp + tick */}
        <p className={`text-[10px] mt-1 flex items-center gap-0.5 select-none
          ${isUser ? 'justify-end text-gray-500' : 'justify-end text-gray-400'}`}>
          {msg.time}
          {isUser && <DoubleTick read={msg.read} />}
        </p>
      </div>
    </motion.div>
  );
};

/* ───────── Date Separator ───────── */
const DateSep = ({ label }) => (
  <div className="flex items-center justify-center my-3">
    <span className="bg-[#E1F0CD] text-[#5a7a56] text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
      {label}
    </span>
  </div>
);

/* ───────── Main Component ───────── */
const BylawBot = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const question = (text ?? input).trim();
    if (!question || isTyping) return;
    setInput('');
    setShowQuick(false);

    const userMsg = { id: Date.now(), type: 'user', text: question, time: now(), read: false };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 900 + Math.random() * 700;
    await new Promise(r => setTimeout(r, delay));
    setIsTyping(false);

    // Mark user message as read
    setMessages(prev =>
      prev.map(m => m.id === userMsg.id ? { ...m, read: true } : m)
    );

    const botMsg = { id: Date.now() + 1, type: 'bot', text: getBotResponse(question), time: now(), read: true };
    setMessages(prev => [...prev, botMsg]);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    handleSend();
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setShowQuick(true);
    setInput('');
  };

  return (
    <div
      className="flex flex-col"
      style={{
        height: '100dvh',
        background: '#ECE5DD',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8bdb5' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* ── WhatsApp-style header ── */}
      <div
        className="shrink-0 flex items-center gap-3 px-3 py-2"
        style={{ background: '#075E54', paddingTop: 'max(12px, env(safe-area-inset-top))' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors lg:hidden"
        >
          <ArrowLeft size={20} color="white" />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-300 to-emerald-500 flex items-center justify-center shadow-md shrink-0">
          <span className="text-white font-bold text-sm">BB</span>
        </div>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-semibold text-[15px] leading-tight">Bylaw Bot</h1>
          <p className="text-green-200 text-[11px]">
            {isTyping ? 'typing...' : 'online'}
          </p>
        </div>

        {/* Right icons */}
        <div className="flex gap-1 items-center">
          <button onClick={handleReset} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Clear chat">
            <RefreshCw size={18} color="white" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <MoreVertical size={18} color="white" />
          </button>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2 space-y-0.5">
        <DateSep label={todayLabel()} />

        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>

        <div ref={bottomRef} className="h-2" />
      </div>

      {/* ── Quick chips ── */}
      <AnimatePresence>
        {showQuick && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide shrink-0"
          >
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 active:scale-95"
                style={{
                  background: 'white',
                  color: '#075E54',
                  border: '1px solid #d0e8d5',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input bar ── */}
      <div
        className="shrink-0 px-2 py-2 flex items-end gap-2"
        style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
      >
        {/* Text input */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-end bg-white rounded-3xl shadow-sm overflow-hidden px-4"
          style={{ minHeight: 46 }}
        >
          <button type="button" className="text-gray-400 py-3 mr-2 shrink-0">
            <Smile size={22} />
          </button>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about society rules…"
            className="flex-1 py-3 text-sm text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
            style={{ caretColor: '#075E54' }}
            autoComplete="off"
          />
          {/* Mic / submit toggle */}
          {!input.trim() && (
            <button type="button" className="text-gray-400 py-3 ml-2 shrink-0">
              <Mic size={22} />
            </button>
          )}
        </form>

        {/* Send button (WhatsApp green circle) */}
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isTyping}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all shrink-0"
          style={{
            background: input.trim() && !isTyping ? '#075E54' : '#128C7E',
            opacity: !input.trim() || isTyping ? 0.6 : 1,
          }}
        >
          <Send size={18} color="white" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
};

export default BylawBot;
