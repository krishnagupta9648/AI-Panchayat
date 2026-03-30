import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Bot, Mic, Building2, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-premium border border-slate-100 hover:shadow-premium-hover transition-all hover:-translate-y-1">
    <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mb-4">
      <Icon className="text-violet-600" size={24} />
    </div>
    <h3 className="font-extrabold text-slate-800 text-lg mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
  </div>
);

const PricingCard = ({ title, price, features, recommended, onSelect }) => (
  <div className={`p-8 rounded-3xl relative flex flex-col ${recommended ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow scale-[1.03] z-10' : 'bg-white text-slate-900 border border-slate-200 shadow-premium'}`}>
    {recommended && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        MOST POPULAR
      </span>
    )}
    <h3 className={`text-xl font-bold mb-2 ${recommended ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-black pb-2">₹{price}</span>
      <span className={`text-sm font-medium ${recommended ? 'text-violet-200' : 'text-slate-500'}`}>/month</span>
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3">
          <Check size={18} className={`mt-0.5 shrink-0 ${recommended ? 'text-emerald-300' : 'text-violet-600'}`} />
          <span className={`text-sm leading-relaxed font-medium ${recommended ? 'text-violet-50' : 'text-slate-600'}`}>{f}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onSelect}
      className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
        recommended 
          ? 'bg-white text-violet-700 hover:bg-slate-50' 
          : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
      }`}
    >
      Start your pilot
    </button>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl z-50 border-b border-white/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-glow">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">AI Panchayat</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-premium">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Subtle decorative background blur */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-400/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-100 shadow-premium text-violet-600 text-[11px] font-bold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Just Launched Phase 2
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
            The Digital Referee for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">Housing Societies.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Stop managing WhatsApp chaos. AI Panchayat automates maintenance tracking, predicts disputes, and turns voice notes into official tickets.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/register')} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:scale-105 shadow-glow transition-all flex items-center justify-center gap-2 active:scale-95">
              Register your Society <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* RWA Admin Features */}
      <section className="py-24 px-6 bg-white border-y border-slate-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">Built for RWA Managers</h2>
            <p className="text-slate-500 text-lg font-medium">We solve the biggest organizational headaches.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Building2} title="Arrears Tracker" 
              desc="A simple dashboard showing exactly which flats haven't paid maintenance this month." />
            <FeatureCard 
              icon={ShieldCheck} title="1-Click Notices" 
              desc="Type 'Water Cut' and send an emergency flash notice to every resident's App instantly." />
            <FeatureCard 
              icon={Bot} title="Bylaw Chatbot" 
              desc="Stop answering 'When does the gym open?' The WhatsApp-style bot knows your rulebook." />
            <FeatureCard 
              icon={Mic} title="Voice Tickets" 
              desc="Residents just speak their complaint; our AI categorizes it for the plumber or electrician." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-slate-50" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-slate-500 text-lg font-medium">Includes 3 free months to pilot in your society.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Starter" price="499" 
              features={[ 'Up to 50 flats', 'Basic Dashboard', 'Complaints module', 'Bylaw Bot access', 'Email support' ]} 
              onSelect={() => navigate('/register')} />
            <PricingCard 
              title="Growth" price="2,499" recommended={true}
              features={[ 'Up to 200 flats', 'Everything in Starter', 'AI Weekly Insights', 'Voice-to-Ticket', 'Maintenance Arrears App' ]} 
              onSelect={() => navigate('/register')} />
            <PricingCard 
              title="Pro" price="4,999" 
              features={[ 'Unlimited flats', 'Everything in Growth', 'Custom Subdomain', 'WhatsApp Integration', 'Dedicated Manager' ]} 
              onSelect={() => navigate('/register')} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm font-medium">
        <p>© 2026 AI Panchayat. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
