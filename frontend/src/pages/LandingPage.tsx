import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, MapPin, Star, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { colleges } from '../api/mocks/colleges';
import { exams } from '../api/mocks/exams';


/**
 * LandingPage.tsx
 *
 * WHAT THIS FILE DOES:
 * The public marketing page — the first thing visitors see.
 * Shows the app's value proposition, features, and testimonials.
 *
 * WHY IT EXISTS:
 * Not everyone who visits the app is logged in. This page convinces
 * new students to sign up by showing what the app can do for them.
 *
 * KEY CONCEPTS:
 * - Hero section with animated stats and CTA buttons
 * - Feature grid with icons and descriptions
 * -"How It Works"step-by-step guide
 * - Top colleges showcase
 * - Responsive design: single column on mobile, multi-column on desktop
 */
export default function LandingPage() {
 const { isAuthenticated } = useAuth();
 const navigate = useNavigate();

 const handleCTA = () => navigate(isAuthenticated ? '/dashboard' : '/login');

 return (
 <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">

 {/* ============================
 HERO SECTION
 ============================ */}
 <section className="relative min-h-[92vh] flex items-center overflow-hidden">
 {/* Aurora RIGHT panel */}
 <div className="absolute right-0 top-0 w-[55%] h-full aurora-mesh opacity-90 hidden lg:block"/>
 <div className="absolute right-0 top-0 w-[55%] h-full bg-gradient-to-l from-transparent via-transparent to-white hidden lg:block"/>

 {/* Small screen bg gradient */}
 <div className="absolute inset-0 lg:hidden"style={{background: 'linear-gradient(160deg, #fff 50%, #f0f0ff 100%)'}} />

 <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-20 grid lg:grid-cols-2 gap-16 items-center">
 {/* Left: Text */}
 <div className="animate-slide-up">
 <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-black text-sm font-semibold mb-6">
 <Zap size={14} />
 India's smartest college finder
 </div>
 <h1 className="text-5xl lg:text-[62px] font-bold text-[#0A2540] leading-[1.1] tracking-tight mb-6">
 Find colleges that{' '}
 <span className="text-black">actually</span>{' '}
 match your marks.
 </h1>
 <p className="text-xl text-[#425466] leading-relaxed mb-8 max-w-lg">
 Enter your exam scores and preferred states. Studzens instantly shows you Safe, Reach, and Backup colleges — no guessing required.
 </p>

 <div className="flex flex-col sm:flex-row gap-4">
 <button onClick={handleCTA} className="btn-primary text-base px-8 py-4">
 Get My College List <ArrowRight size={20} />
 </button>
 <Link to="/search"className="btn-secondary text-base px-8 py-4">
 Explore Colleges
 </Link>
 </div>

 <div className="flex items-center gap-6 mt-10 text-sm text-[#697386]">
 <div className="flex items-center gap-1.5">
 <div className="flex -space-x-2">
 {['S','R','A','P'].map(l => (
 <div key={l} className="w-7 h-7 rounded-full bg-black border-2 border-white flex items-center justify-center text-white text-xs font-bold">{l}</div>
 ))}
 </div>
 <span><strong className="text-[#0A2540]">50,000+</strong> students</span>
 </div>
 <div className="flex items-center gap-1">
 {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400"/>)}
 <span className="ml-1"><strong className="text-[#0A2540]">4.8</strong> rating</span>
 </div>
 </div>
 </div>

 {/* Right: Floating card (visible on lg) */}
 <div className="hidden lg:flex justify-center items-center animate-slide-up delay-200">
 <div className="glass-light rounded-3xl shadow-2xl p-8 max-w-sm w-full">
 <div className="text-sm font-bold text-[#697386] uppercase tracking-wider mb-4">Your Match Preview</div>
 {[
 { name: 'IIT Bombay', match: 'Safe Reach', score: 94, color: 'bg-blue-500' },
 { name: 'BITS Pilani', match: 'Safe', score: 88, color: 'bg-emerald-500' },
 { name: 'VIT Vellore', match: 'Safe Backup', score: 76, color: 'bg-amber-500' },
 ].map((item, i) => (
 <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E3E8EF] last:border-0">
 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
 <GraduationCap size={18} className="text-black"/>
 </div>
 <div className="flex-1">
 <div className="font-semibold text-[#0A2540] text-sm">{item.name}</div>
 <div className="text-xs text-[#697386]">{item.match}</div>
 </div>
 <div className="text-right">
 <div className="text-sm font-bold text-[#0A2540]">{item.score}%</div>
 <div className={`w-2 h-2 rounded-full ${item.color} ml-auto mt-1`}></div>
 </div>
 </div>
 ))}
 <button onClick={handleCTA} className="btn-primary w-full mt-5 text-sm">
 See Your Full List <ArrowRight size={16} />
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* ============================
 STATS BAR
 ============================ */}
 <div className="bg-[#F6F7FB] border-y border-[#E3E8EF] py-8">
 <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
 {[
 { value: `${colleges.length}+`, label: 'Colleges Listed' },
 { value: `${exams.length}+`, label: 'Entrance Exams' },
 { value: '50,000+', label: 'Students Helped' },
 { value: '29', label: 'States Covered' },
 ].map(({ value, label }) => (
 <div key={label}>
 <div className="text-3xl font-bold text-[#0A2540] mb-1">{value}</div>
 <div className="text-sm text-[#697386] font-medium">{label}</div>
 </div>
 ))}
 </div>
 </div>

 {/* ============================
 FEATURES
 ============================ */}
 <section className="py-24 px-6">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-16 animate-slide-up">
 <span className="text-xs font-bold tracking-widest text-black uppercase">Why Students Love Studzens</span>
 <h2 className="text-4xl font-bold text-[#0A2540] mt-3 mb-4">
 Everything you need to make a smart decision
 </h2>
 <p className="text-[#425466] text-lg max-w-2xl mx-auto">
 Not just a list of colleges — a complete decision engine.
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {[
 {
 icon: Star,
 color: 'text-black',
 bg: 'bg-slate-100',
 title: 'Personalized Match Score',
 desc: `Based on your ${exams.length} entrance exam scores and 12th marks, we tell you exactly where you stand.`,
 chips: ['JEE', 'NEET', 'BITSAT', 'CLAT', 'VITEEE'],
 },
 {
 icon: Shield,
 color: 'text-emerald-600',
 bg: 'bg-emerald-50',
 title: 'Safe vs Reach Labels',
 desc: 'Every college is categorized as Safe Reach, Safe, or Safe Backup — so you apply with confidence.',
 chips: ['Safe Reach', 'Safe', 'Safe Backup'],
 },
 {
 icon: MapPin,
 color: 'text-slate-800',
 bg: 'bg-blue-50',
 title: 'State-wise Intelligence',
 desc: 'Filter by your preferred states, view transport access, and discover educational hubs on an interactive map.',
 chips: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu'],
 },
 ].map(({ icon: Icon, color, bg, title, desc, chips }) => (
 <div key={title} className="sz-card p-8 flex flex-col h-full animate-slide-up">
 <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-5 shrink-0`}>
 <Icon size={24} className={color} />
 </div>
 <h3 className="text-xl font-bold text-[#0A2540] mb-3">{title}</h3>
 <p className="text-[#697386] text-sm leading-relaxed mb-6 flex-1">{desc}</p>
 <div className="flex flex-wrap gap-2">
 {chips.map(c => <span key={c} className="sz-chip-gray">{c}</span>)}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ============================
 HOW IT WORKS
 ============================ */}
 <section className="py-24 bg-[#F6F7FB] px-6">
 <div className="max-w-4xl mx-auto text-center">
 <h2 className="text-4xl font-bold text-[#0A2540] mb-4">How it works</h2>
 <p className="text-[#425466] mb-16">Get your personalized college list in 3 simple steps.</p>

 <div className="grid md:grid-cols-3 gap-10">
 {[
 { step: '01', title: 'Enter Your Profile', desc: 'Share your class, marks, entrance exams and preferred states.' },
 { step: '02', title: 'We Compute Matches', desc: 'Our engine filters colleges by your scores, budget, and location preferences.' },
 { step: '03', title: 'Get Your List', desc: 'See Safe Reach, Safe, and Safe Backup colleges — ready to apply.' },
 ].map(({ step, title, desc }) => (
 <div key={step} className="text-center">
 <div className="w-14 h-14 rounded-2xl bg-black text-white text-lg font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-black/30">
 {step}
 </div>
 <h3 className="text-lg font-bold text-[#0A2540] mb-2">{title}</h3>
 <p className="text-[#697386] text-sm leading-relaxed">{desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ============================
 CTA FOOTER
 ============================ */}
 <section className="py-24 px-6 relative overflow-hidden">
 <div className="absolute inset-0 aurora-mesh opacity-10"/>
 <div className="relative max-w-2xl mx-auto text-center">
 <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6">
 Ready to find your perfect college?
 </h2>
 <p className="text-[#425466] text-lg mb-8">
 Free forever. No credit card required.
 </p>
 <button onClick={handleCTA} className="btn-primary px-10 py-4 text-lg mx-auto">
 Get Started Free <ArrowRight size={22} />
 </button>
 </div>
 </section>
 </div>
 );
}
