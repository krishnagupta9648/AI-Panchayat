import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, Send, X, MicOff, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VoiceToTicket = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      setTimer(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRecording]);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg('Your browser does not support voice recognition. Please use Chrome or Edge.');
      setStatus('error'); return;
    }
    setErrorMsg(''); setTranscript(''); setStatus('recording'); setIsRecording(true);
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let finalText = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalText += event.results[i][0].transcript + ' ';
      }
      if (finalText.trim()) setTranscript(finalText.trim());
    };
    recognition.onerror = (event) => {
      setErrorMsg(event.error === 'not-allowed' ? 'Microphone access denied. Allow mic permission and retry.' : 'Error: ' + event.error);
      setStatus('error'); setIsRecording(false);
    };
    recognition.onend = () => { setIsRecording(false); setStatus('idle'); };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false); setStatus('idle');
  };

  const handleCreateTicket = () => {
    if (!transcript.trim()) return;
    const newComplaint = {
      _id: Date.now().toString(),
      title: transcript.trim(),
      status: 'Pending',
      vendor: 'Unassigned',
      description: transcript.trim(),
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('ai_panchayat_complaints') || '[]');
      localStorage.setItem('ai_panchayat_complaints', JSON.stringify([newComplaint, ...existing]));
    } catch (e) { console.error(e); }
    setStatus('success');
    setTimeout(() => navigate('/complaints'), 1500);
  };

  const formatTime = (sec) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-indigo-600 text-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Voice-to-Ticket</h1>
        <div className="w-10" />
      </div>

      {/* Center content — responsive layout */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 sm:px-8 lg:px-16 py-8">

        {/* Mic button column */}
        <div className="flex flex-col items-center text-center space-y-6 lg:w-96">
          {/* Mic */}
          <div className="relative flex items-center justify-center">
            {isRecording && (
              <>
                <span className="absolute w-40 h-40 rounded-full bg-white/10 animate-ping" style={{ animationDuration: '1.2s' }} />
                <span className="absolute w-52 h-52 rounded-full bg-white/5 animate-ping" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
              </>
            )}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative w-36 h-36 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 ${
                isRecording ? 'bg-white text-indigo-600' : 'bg-white/15 text-white backdrop-blur-md border-2 border-white/30'
              }`}
            >
              {isRecording ? <MicOff size={52} strokeWidth={2} /> : <Mic size={52} strokeWidth={2} />}
            </button>
          </div>

          <div>
            <p className="font-semibold text-xl">
              {isRecording
                ? <span className="animate-pulse">{formatTime(timer)} — Recording...</span>
                : transcript ? 'Tap mic to re-record' : 'Tap to record your complaint'
              }
            </p>
            <p className="text-white/50 text-sm mt-1">Works in English & Hindi</p>
          </div>

          {/* Error */}
          {status === 'error' && (
            <div className="w-full bg-red-500/20 border border-red-400/30 p-4 rounded-2xl text-sm text-red-100">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Success */}
          {status === 'success' && (
            <div className="w-full bg-emerald-500/20 border border-emerald-400/30 p-5 rounded-2xl flex flex-col items-center gap-2">
              <CheckCircle size={36} className="text-emerald-300" />
              <p className="font-bold text-emerald-200">Ticket Created!</p>
              <p className="text-xs text-white/60">Redirecting to complaints...</p>
            </div>
          )}
        </div>

        {/* Transcript + Create column */}
        <div className="w-full lg:w-96 space-y-4 flex flex-col">
          {/* Transcript Box */}
          {transcript && status !== 'success' ? (
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">🎙️ Transcript</span>
                <button onClick={() => { setTranscript(''); setStatus('idle'); }} className="text-indigo-300 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm leading-relaxed text-white font-medium">"{transcript}"</p>
            </div>
          ) : (
            status !== 'error' && status !== 'success' && (
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                <p className="text-white/40 text-sm leading-relaxed">
                  Tell the AI about your issue<br />e.g. "Leaking tap in Block B flat 402, water dripping since morning"
                </p>
              </div>
            )
          )}

          {/* Create Ticket Button */}
          <button
            disabled={!transcript || status === 'success'}
            onClick={handleCreateTicket}
            className={`w-full py-5 rounded-3xl font-bold text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
              transcript && status !== 'success'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-900/40'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceToTicket;
