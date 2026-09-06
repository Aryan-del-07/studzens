import { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  provider?: string;
}

const PRESET_PROMPTS = [
  "Which NIT can I get with 98 percentile?",
  "Compare IIT Bombay vs BITS Pilani",
  "Colleges with annual fee < ₹3L/year",
  "JEE Advanced cutoff for IIT Delhi CSE",
];

export default function AICounselorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm **Studzens AI Advisor** powered by Gemini. Ask me anything about JEE/NEET cutoffs, college comparisons, fees, or placements!",
      provider: 'Gemini 1.5 Flash',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.ai.counsel(query);
      const aiMsg: Message = {
        sender: 'ai',
        text: res.reply,
        provider: res.provider,
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "I'm having trouble connecting right now. Please try asking again in a moment!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-black text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-200"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <Sparkles size={20} className="text-amber-300 animate-pulse" />
          <span className="font-bold text-sm">Ask Gemini AI Advisor</span>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] bg-white rounded-3xl border border-[#E3E8EF] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-[#0A2540] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-2">
                  Studzens AI Counselor
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Live Gemini
                  </span>
                </h3>
                <p className="text-xs text-slate-300">Indian College Intelligence Engine</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F6F7FB]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-black text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                      : 'bg-white border border-[#E3E8EF] text-[#0A2540] shadow-sm rounded-tl-none font-sans'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.provider && (
                    <span className="block text-[10px] text-gray-400 mt-2 font-mono">
                      Powered by {msg.provider}
                    </span>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium p-2">
                <RefreshCw size={14} className="animate-spin text-blue-600" />
                Gemini AI is analyzing colleges...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Chips */}
          <div className="p-2.5 bg-white border-t border-[#E3E8EF] overflow-x-auto flex gap-2 no-scrollbar">
            {PRESET_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#0A2540] px-3 py-1.5 rounded-full border border-slate-200 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#E3E8EF] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about IITs, NITs, cutoffs, fees..."
              className="flex-1 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl px-4 py-2.5 text-sm text-[#0A2540] outline-none focus:border-blue-500"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center hover:bg-slate-800 disabled:opacity-40 transition-all shrink-0"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
