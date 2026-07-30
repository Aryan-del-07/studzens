import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


/**
 * LoginPage.tsx
 *
 * WHAT THIS FILE DOES:
 * Handles user authentication with email/password and a simulated
 * Google sign-in. Also supports account creation (sign up mode).
 *
 * WHY IT EXISTS:
 * Every app needs a way to identify users. This page creates/verifies
 * user accounts and stores them in localStorage for persistence.
 *
 * KEY CONCEPTS:
 * - Two modes:"login"(existing user) and"signup"(new user)
 * - `useAuth().login()`: Creates a user session and stores it
 * - `hasCompletedOnboarding`: Determines if user should go to onboarding or dashboard
 * - Form validation: Email format, password strength, required fields
 * - Google sign-in: Simulated (no real OAuth backend) for UX demonstration
 */
// Simulated backend DB for duplicate checks
const REGISTERED_EMAILS = ['test@example.com', 'admin@stuzen.com'];

const getPasswordStrength = (pwd: string) => {
 let score = 0;
 if (!pwd) return { score: 0, text: '', color: 'bg-gray-200', reqs: [] };
 
 const hasLen = pwd.length >= 8;
 const hasUpper = /[A-Z]/.test(pwd);
 const hasLower = /[a-z]/.test(pwd);
 const hasNum = /[0-9]/.test(pwd);
 const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
 
 if (hasLen) score++;
 if (hasUpper) score++;
 if (hasLower) score++;
 if (hasNum) score++;
 if (hasSpecial) score++;

 let text = 'Weak';
 let color = 'bg-red-500';
 if (score >= 3) { text = 'Fair'; color = 'bg-amber-500'; }
 if (score === 5) { text = 'Strong'; color = 'bg-emerald-500'; }

 return { 
 score, text, color, 
 reqs: [
 { label: '8+ chars', done: hasLen },
 { label: 'Uppercase', done: hasUpper },
 { label: 'Lowercase', done: hasLower },
 { label: 'Number', done: hasNum },
 { label: 'Special char', done: hasSpecial }
 ]
 };
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[0-9]{10}$/.test(phone);

export default function LoginPage() {
 const [mode] = useState<'login' | 'signup'>('login');
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [password, setPassword] = useState('');
 const [showPwd, setShowPwd] = useState(false);
 const [loading, setLoading] = useState(false);
 
 // Real-time error states
 const [touched, setTouched] = useState<Record<string, boolean>>({});
 const [formError, setFormError] = useState('');

 const { login, hasCompletedOnboarding } = useAuth();
 const navigate = useNavigate();
 const location = useLocation();

 const pwdStrength = useMemo(() => getPasswordStrength(password), [password]);

 // Validation logic
 const emailError = touched.email && !email ? 'Email is required' : touched.email && !isValidEmail(email) ? 'Email format is invalid.' : '';
 const phoneError = touched.phone && !phone ? 'Phone number is required' : touched.phone && !isValidPhone(phone) ? 'Phone number must be 10 digits.' : '';
 const nameError = touched.name && !name ? 'Full Name is required' : '';
 const pwdError = touched.password && mode === 'signup' && pwdStrength.score < 5 
 ? 'Password must contain at least one uppercase letter, one lower case, one number, and one special character.' 
 : touched.password && !password ? 'Password is required' : '';

 const handleBlur = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setFormError('');
 
 // Touch all active fields to show inline errors
 const allTouched: Record<string, boolean> = { email: true, password: true };
 if (mode === 'signup') {
 allTouched.name = true;
 allTouched.phone = true;
 }
 setTouched(allTouched);

 if (!email || !isValidEmail(email)) return;
 if (!password) return;
 
 if (mode === 'signup') {
 if (!name) return;
 if (!phone || !isValidPhone(phone)) return;
 if (pwdStrength.score < 5) return;
 
 if (REGISTERED_EMAILS.includes(email.toLowerCase())) {
 setFormError('An account with this email already exists. Please log in.');
 return;
 }
 }

 setLoading(true);
 await new Promise(r => setTimeout(r, 800)); // simulated auth delay

 if (mode === 'signup') REGISTERED_EMAILS.push(email.toLowerCase());

 login({ name: name || email.split('@')[0], email, role: 'student' });

 if (mode === 'signup' || !hasCompletedOnboarding) {
 navigate('/onboarding');
 } else {
 const from = (location.state as any)?.from?.pathname || '/dashboard';
 navigate(from);
 }
 setLoading(false);
 };

 const handleGoogleLogin = async () => {
 setLoading(true);
 setFormError('');
 await new Promise(r => setTimeout(r, 600));
 // Simulated Google OAuth login — creates a user with Gmail-like data
 const googleName = 'Aryan Sahoo';
 const googleEmail = 'aryan@gmail.com';
 login({ name: googleName, email: googleEmail, role: 'student' });
 navigate('/onboarding');
 setLoading(false);
 };

 return (
 <div className="min-h-screen flex bg-white font-sans items-center justify-center">
 {/* FORM PANEL */}
 <div className="w-full flex flex-col justify-center px-8 sm:px-12 py-12 relative z-10 overflow-y-auto max-w-[520px]">
 
 {/* Brand Header */}
 <Link to="/"className="flex items-center mb-10 group w-fit">
 <img src="/logo.png" alt="Studzens Logo" className="h-16 md:h-20 w-auto object-contain scale-[1.5]" />
 </Link>

 <div className="max-w-[420px] w-full">
 <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
 {mode === 'login' ? 'Welcome back' : 'Create your account'}
 </h1>
 <p className="text-gray-500 mb-8 text-[15px] leading-relaxed">
 {mode === 'login'
 ? 'Enter your credentials to access your academic dashboard.'
 : 'Join thousands of students optimizing their college journey.'}
 </p>

 <form onSubmit={handleSubmit} className="space-y-5"noValidate>
 
 {mode === 'signup' && (
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
 <input
 type="text"
 className={`w-full bg-white border ${nameError ? 'border-red-400 focus:ring-red-500/10' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/10'} focus:ring-4 rounded-xl px-4 py-3 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 font-medium`}
 placeholder="e.g. Aryan Sharma"
 value={name}
 onChange={e => setName(e.target.value)}
 onBlur={() => handleBlur('name')}
 />
 {nameError && <div className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><XCircle size={12}/>{nameError}</div>}
 </div>

 <div>
 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
 <input
 type="tel"
 inputMode="numeric"
 maxLength={10}
 className={`w-full bg-white border ${phoneError ? 'border-red-400 focus:ring-red-500/10' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/10'} focus:ring-4 rounded-xl px-4 py-3 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 font-medium`}
 placeholder="9999999999"
 value={phone}
 onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
 onBlur={() => handleBlur('phone')}
 />
 {phoneError && <div className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><XCircle size={12}/>{phoneError}</div>}
 </div>
 </div>
 )}

 <div>
 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
 <input
 type="email"
 className={`w-full bg-white border ${emailError ? 'border-red-400 focus:ring-red-500/10' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/10'} focus:ring-4 rounded-xl px-4 py-3 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 font-medium`}
 placeholder="you@example.com"
 value={email}
 onChange={e => setEmail(e.target.value)}
 onBlur={() => handleBlur('email')}
 />
 {emailError && <div className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><XCircle size={12}/>{emailError}</div>}
 </div>

 <div>
 <div className="flex justify-between items-center mb-1.5">
 <label className="block text-sm font-semibold text-gray-700">Password</label>
 {mode === 'login' && (
 <button type="button"className="text-sm text-slate-800 font-semibold hover:text-slate-900 transition-colors">
 Forgot password?
 </button>
 )}
 </div>
 <div className="relative">
 <input
 type={showPwd ? 'text' : 'password'}
 className={`w-full bg-white border ${pwdError ? 'border-red-400 focus:ring-red-500/10' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/10'} focus:ring-4 rounded-xl pl-4 pr-12 py-3 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 font-medium`}
 placeholder="••••••••"
 value={password}
 onChange={e => setPassword(e.target.value)}
 onBlur={() => handleBlur('password')}
 />
 <button
 type="button"
 onClick={() => setShowPwd(v => !v)}
 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
 >
 {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
 </button>
 </div>

 {/* Password Strength Meter (Signup Only) */}
 {mode === 'signup' && password.length > 0 && (
 <div className="mt-3">
 <div className="flex gap-1 mb-1.5">
 {[...Array(5)].map((_, i) => (
 <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < pwdStrength.score ? pwdStrength.color : 'bg-gray-100'}`} />
 ))}
 </div>
 <div className="text-xs font-semibold text-gray-500 flex justify-between items-center mb-2">
 <span>Strength: <span className={`font-bold ${pwdStrength.text === 'Weak' ? 'text-red-500' : pwdStrength.text === 'Fair' ? 'text-amber-500' : 'text-emerald-500'}`}>{pwdStrength.text}</span></span>
 </div>
 <div className="grid grid-cols-2 gap-1 mt-2">
 {pwdStrength.reqs.map(req => (
 <div key={req.label} className={`flex items-center gap-1.5 text-[11px] font-semibold ${req.done ? 'text-emerald-600' : 'text-gray-400'}`}>
 {req.done ? <CheckCircle2 size={12} /> : <div className="w-3 h-3 rounded-full border-2 border-gray-200"/>}
 {req.label}
 </div>
 ))}
 </div>
 </div>
 )}
 {pwdError && mode === 'login' && <div className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><XCircle size={12}/>{pwdError}</div>}
 {pwdError && mode === 'signup' && <div className="text-red-500 text-xs font-semibold mt-3 flex items-start gap-1"><XCircle size={14} className="shrink-0 mt-0.5"/>{pwdError}</div>}
 </div>

 {formError && (
 <div className="bg-red-50/50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl animate-fade-in flex items-start gap-2">
 <div className="mt-0.5"><ShieldCheck size={16} /></div>
 <span>{formError}</span>
 </div>
 )}

 <button
 type="submit"
 disabled={loading}
 className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl py-3.5 text-[15px] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm shadow-black/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
 >
 {loading ? (
 <span className="flex items-center gap-2">
 <svg className="animate-spin h-4 w-4"fill="none"viewBox="0 0 24 24">
 <circle className="opacity-25"cx="12"cy="12"r="10"stroke="currentColor"strokeWidth="4"/>
 <path className="opacity-75"fill="currentColor"d="M4 12a8 8 0 018-8v8z"/>
 </svg>
 {mode === 'login' ? 'Authenticating...' : 'Setting up workspace...'}
 </span>
 ) : (
 <span className="flex items-center gap-2">
 {mode === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}
 <ArrowRight size={18} className="opacity-80"/>
 </span>
 )}
 </button>

 {/* Divider */}
 <div className="relative flex items-center gap-4 py-1">
 <div className="flex-1 h-px bg-gray-200"/>
 <span className="text-xs font-semibold text-gray-400">or continue with</span>
 <div className="flex-1 h-px bg-gray-200"/>
 </div>

 {/* Google Sign In */}
 <button
 type="button"
 onClick={handleGoogleLogin}
 disabled={loading}
 className="w-full bg-white border border-gray-200 hover:bg-gray-50 :bg-slate-700 text-gray-700 rounded-xl py-3 text-[15px] font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
 >
 <svg width="20"height="20"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg">
 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"fill="#4285F4"/>
 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"fill="#34A853"/>
 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"fill="#FBBC05"/>
 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"fill="#EA4335"/>
 </svg>
 Google
 </button>
 </form>
 </div>
 </div>
 </div>
 );
}
