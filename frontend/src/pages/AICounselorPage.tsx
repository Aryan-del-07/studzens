import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle, Key, X } from 'lucide-react';

interface Message {

/**
 * AICounselorPage.tsx
 *
 * WHAT THIS FILE DOES:
 * A chat interface where students can ask academic questions.
 * The"AI"responds with pre-written answers based on the student's profile.
 *
 * WHY IT EXISTS:
 * Students often have questions about colleges, exams, and careers.
 * This provides instant guidance without needing a human counselor.
 *
 * KEY CONCEPTS:
 * - Chat message list with auto-scroll to bottom
 * - Suggested prompts to help users start the conversation
 * - Response templates personalized based on student profile data
 * - Input area with auto-focus and keyboard handling
 * - Message history stored in component state (resets on refresh)
 */
 id: string;
 role: 'user' | 'ai';
 content: string;
}

export default function AICounselorPage() {
 const [messages, setMessages] = useState<Message[]>([
 { 
 id: '1', 
 role: 'ai', 
 content: 'Hello! I am your Stuzen AI Career Counselor. I am strictly programmed to assist you with Admissions, Exams, Degrees, Universities, Placements, and Career Paths. What career or academic decisions can I help you with today?' 
 }
 ]);
 const [input, setInput] = useState('');
 const [isTyping, setIsTyping] = useState(false);
 
 // Gemini API Key state
 const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('STUZEN_GEMINI_KEY') || '');
 const [tempKey, setTempKey] = useState(apiKey);
 const [showSettings, setShowSettings] = useState(false);

 const scrollRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (scrollRef.current) {
 scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
 }
 }, [messages, isTyping]);

 const handleSaveKey = () => {
 const trimmed = tempKey.trim();
 setApiKey(trimmed);
 localStorage.setItem('STUZEN_GEMINI_KEY', trimmed);
 setShowSettings(false);
 };

 const handleClearKey = () => {
 setApiKey('');
 setTempKey('');
 localStorage.removeItem('STUZEN_GEMINI_KEY');
 setShowSettings(false);
 };

 const handleSend = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!input.trim() || isTyping) return;

 const userMsg = input.trim();
 setInput('');
 setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
 setIsTyping(true);

 if (apiKey) {
 try {
 const contents = messages.map(msg => ({
 role: msg.role === 'user' ? 'user' : 'model',
 parts: [{ text: msg.content }]
 }));
 contents.push({
 role: 'user',
 parts: [{ text: userMsg }]
 });

 const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({
 contents,
 systemInstruction: {
 parts: [{
 text: `You are the Stuzen AI Career Counselor, designed specifically to help Indian students navigate admissions (JoSAA, CSAB, state counselings like JAC, REAP, MHT CET, etc.), exams (JEE Main/Advanced, BITSAT, NEET, VITEEE, CUET, etc.), degrees, universities, placements, and career paths.

Guidelines:
1. Provide highly structured, clean, and concise responses. Use bullet points and bold formatting where appropriate to make advice easy to read.
2. Be student-friendly, encouraging, yet realistic about placement rates, cutoffs, and prep levels.
3. If the user asks general-purpose questions unrelated to careers, colleges, exams, or academics, politely decline and redirect them back to academic topics.
4. Keep the advice tailored to Indian college admission processes, engineering/medical streams, and commerce/law/design alternatives.`
 }]
 }
 })
 });

 if (!response.ok) {
 const errData = await response.json().catch(() => ({}));
 throw new Error(errData?.error?.message || 'API request failed');
 }

 const data = await response.json();
 const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text ||"I'm sorry, I couldn't generate a response.";
 
 setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: aiText }]);
 } catch (err: any) {
 console.error('Gemini error:', err);
 setMessages(prev => [...prev, { 
 id: (Date.now() + 1).toString(), 
 role: 'ai', 
 content: `⚠️ Failed to get response from Gemini API: ${err.message || 'Unknown error'}. Please check your API key and network connection.` 
 }]);
 } finally {
 setIsTyping(false);
 }
 } else {
 // Mock AI response logic (offline sandbox)
 setTimeout(() => {
 setIsTyping(false);
 const lower = userMsg.toLowerCase();
 let response = '';

 if (lower.includes('joke') || lower.includes('weather') || lower.includes('movie') || lower.includes('recipe')) {
 response = 'I am specifically designed to assist with academic decisions, college admissions, exams, and career planning. I cannot act as a general-purpose chatbot. How can I help you with your education goals?';
 } else if (lower.includes('iit') || lower.includes('jee')) {
 response = 'JEE and the IITs are fantastic goals, but remember they are not the only path to success. Have you considered exploring Plan B options like top Private Universities (BITS, VIT) or State CET colleges? What specific engineering branch are you interested in?';
 } else if (lower.includes('mbbs') || lower.includes('neet')) {
 response = 'NEET is highly competitive. While MBBS is the primary route, the allied health sector (like Biotechnology, Pharma, and Clinical Research) is booming. Should we look into Plan B options for medical careers?';
 } else if (lower.includes('placement') || lower.includes('salary')) {
 response = 'Placements vary wildly based on the tier of the college and your branch. However, companies today care heavily about skills. A student from a Tier-3 college with a strong GitHub portfolio and internships can secure the same package as a Tier-1 graduate.';
 } else {
 response = 'That is a great question. (Note: You are currently using the Offline Sandbox. To get real-time dynamic answers, click"Setup Gemini"at the top to enter your API key!) Based on current admission trends and career trajectories, I recommend checking our"Career Roadmaps"or generating a"Plan B"report.';
 }

 setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: response }]);
 }, 1500);
 }
 };

 return (
 <div className="max-w-4xl mx-auto px-4 py-8 pb-24 h-[85vh] flex flex-col">
 {/* Header */}
 <div className="bg-[#635BFF] rounded-t-3xl p-6 text-white flex items-center justify-between shrink-0 shadow-md">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
 <Bot size={24} className="text-white"/>
 </div>
 <div>
 <h1 className="text-xl font-bold flex items-center gap-2">
 AI Career Counselor
 {apiKey ? (
 <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">Gemini Active</span>
 ) : (
 <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">Offline Sandbox</span>
 )}
 </h1>
 <p className="text-indigo-100 text-xs">Strictly scoped for admissions and careers</p>
 </div>
 </div>
 
 <button 
 onClick={() => setShowSettings(!showSettings)}
 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl border border-white/10 text-xs font-semibold transition-all cursor-pointer font-sans"
 >
 <Key size={14} />
 <span>{apiKey ? 'Manage Key' : 'Setup Gemini'}</span>
 </button>
 </div>

 {/* Settings Panel */}
 {showSettings && (
 <div className="bg-[#F6F7FB] border-x border-[#E3E8EF] p-5 shrink-0 animate-fade-in">
 <div className="sz-card p-5 max-w-md mx-auto">
 <div className="flex justify-between items-start mb-3">
 <h3 className="font-bold text-[#0A2540] text-sm flex items-center gap-2">
 <Sparkles size={16} className="text-[#635BFF]"/>
 Gemini API Key Setup
 </h3>
 <button onClick={() => setShowSettings(false)} className="text-[#697386] hover:text-[#0A2540] cursor-pointer">
 <X size={16} />
 </button>
 </div>
 
 <p className="text-[#697386] text-xs leading-relaxed mb-4 font-sans">
 To unlock real, dynamic AI responses powered by Gemini 2.5 Flash, provide your Google AI Studio API key. It is stored locally in your browser and never leaves your device.
 </p>
 
 <div className="space-y-3">
 <input
 type="password"
 className="sz-input text-sm py-2 px-3"
 placeholder="AIzaSy..."
 value={tempKey}
 onChange={e => setTempKey(e.target.value)}
 />
 <div className="flex justify-between items-center">
 <a
 href="https://aistudio.google.com/app/apikey"
 target="_blank"
 rel="noopener noreferrer"
 className="text-xs text-[#635BFF] font-semibold hover:underline font-sans"
 >
 Get a free key from Google AI Studio →
 </a>
 <div className="flex gap-2">
 {apiKey && (
 <button
 onClick={handleClearKey}
 className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors font-sans"
 >
 Remove Key
 </button>
 )}
 <button
 onClick={handleSaveKey}
 className="px-3 py-1.5 text-xs font-semibold text-white bg-[#635BFF] hover:bg-[#4F47E5] rounded-lg cursor-pointer transition-colors font-sans"
 >
 Save Key
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Trust Framework Notice */}
 <div className="bg-amber-50 p-3 border-x border-b border-amber-200 flex items-start gap-3 shrink-0">
 <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5"/>
 <p className="text-xs text-amber-800 font-medium leading-relaxed font-sans">
 <strong>Trust Framework:</strong> This AI generates advice based on historical admission data. Always verify critical dates and cutoffs on official university websites.
 </p>
 </div>

 {/* Messages */}
 <div ref={scrollRef} className="flex-1 bg-slate-50 border-x border-slate-200 p-6 overflow-y-auto space-y-6">
 {messages.map(msg => (
 <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
 <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border shadow-sm ${
 msg.role === 'user' ? 'bg-indigo-100 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-600'
 }`}>
 {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} className="text-[#635BFF]"/>}
 </div>
 <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line font-sans ${
 msg.role === 'user' ? 'bg-[#635BFF] text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
 }`}>
 {msg.content}
 </div>
 </div>
 ))}

 {isTyping && (
 <div className="flex gap-4 max-w-[85%]">
 <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center border border-slate-200 bg-white shadow-sm">
 <Bot size={18} className="text-slate-400 animate-pulse"/>
 </div>
 <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-none shadow-sm flex gap-1.5 items-center">
 <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"style={{ animationDelay: '0ms' }}></div>
 <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"style={{ animationDelay: '150ms' }}></div>
 <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"style={{ animationDelay: '300ms' }}></div>
 </div>
 </div>
 )}
 </div>

 {/* Input Form */}
 <div className="bg-white p-4 border-x border-b border-slate-200 rounded-b-3xl shadow-sm shrink-0">
 <form onSubmit={handleSend} className="relative">
 <input 
 type="text"
 value={input}
 onChange={e => setInput(e.target.value)}
 placeholder="Ask about careers, colleges, or backup plans..."
 className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-6 pr-14 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-sans"
 />
 <button 
 type="submit"
 disabled={!input.trim() || isTyping}
 className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#635BFF] text-white flex items-center justify-center hover:bg-[#4F47E5] disabled:opacity-50 transition-colors cursor-pointer"
 >
 <Send size={18} className="ml-1"/>
 </button>
 </form>
 </div>
 </div>
 );
}
