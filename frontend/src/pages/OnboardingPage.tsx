import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentProfile } from '../contexts/StudentProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, ArrowLeft, CheckCircle2, GraduationCap, BookOpen, FlaskConical, MapPin, Target } from 'lucide-react';
import { streamOptions } from '../api/mocks/colleges';
import type { Stream } from '../types/college';


/**
 * OnboardingPage.tsx
 *
 * WHAT THIS FILE DOES:
 * A 4-step wizard that collects the student's academic background
 * (class, board, marks, exams, interests, preferences).
 *
 * WHY IT EXISTS:
 * The dashboard and search results are personalized based on this data.
 * Without onboarding, the app can't recommend relevant colleges or exams.
 *
 * KEY CONCEPTS:
 * - Multi-step form with validation on each step
 * - `useState` tracks the current step and form data
 * - `canProceed()`: Validates required fields before allowing next step
 * - `handleFinish()`: Saves all data to StudentProfileContext and completes onboarding
 * - Per-user onboarding: Each email address has its own completion flag
 */
const INDIAN_STATES = [
 'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa',
 'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
 'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha',
 'Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
 'Uttarakhand','West Bengal'
];

const ENTRANCE_EXAMS = [
 { id: 'jee-main', label: 'JEE Main', field: 'Engineering' },
 { id: 'jee-adv', label: 'JEE Advanced', field: 'Engineering' },
 { id: 'bitsat', label: 'BITSAT', field: 'Engineering' },
 { id: 'viteee', label: 'VITEEE', field: 'Engineering' },
 { id: 'comedk', label: 'COMEDK', field: 'Engineering' },
 { id: 'mht-cet', label: 'MHT CET', field: 'Engineering' },
 { id: 'neet', label: 'NEET', field: 'Medical' },
 { id: 'cuet', label: 'CUET', field: 'General' },
 { id: 'clat', label: 'CLAT', field: 'Law' },
 { id: 'nata', label: 'NATA', field: 'Design' },
];

const FAVOURITE_SUBJECTS = [
 'Mathematics','Physics','Chemistry','Biology','Computer Science',
 'Economics','Business Studies','Accountancy','History','Geography',
 'Political Science','Psychology','English Literature','Fine Arts'
];

const CAREER_INTERESTS = [
 'Software Engineering','Data Science / AI','Mechanical Engineering',
 'Civil Engineering','Electrical Engineering','Medicine / MBBS',
 'Law','Architecture','Design','Business / MBA','Finance','Teaching / Research'
];

const steps = [
 { icon: BookOpen, title: 'Academic Background', desc: 'Your class, board and marks' },
 { icon: GraduationCap, title: 'Entrance Exams', desc: 'Which exams you appeared in' },
 { icon: FlaskConical, title: 'Interests', desc: 'Subjects & career goals' },
 { icon: MapPin, title: 'Location & Budget', desc: 'Preferred states & fees' },
 { icon: Target, title:"You're all set!", desc: 'Personalizing your dashboard' },
];

interface LocalData {
 currentClass: string;
 board: string;
 stream: string;
 marks10: string;
 marks11: string;
 marks12: string;
 examsTaken: string[];
 examScores: Record<string, string>;
 favouriteSubjects: string[];
 careerInterests: string[];
 preferredStates: string[];
 budgetLimitLpa: number;
 category: string;
}

export default function OnboardingPage() {
 const [step, setStep] = useState(0);
 const { user, completeOnboarding } = useAuth();
 const { profile, updateProfile } = useStudentProfile();
 const navigate = useNavigate();

 const [data, setData] = useState<LocalData>({
 currentClass: '',
 board: '',
 stream: '',
 marks10: '',
 marks11: '',
 marks12: '',
 examsTaken: [],
 examScores: {},
 favouriteSubjects: [],
 careerInterests: [],
 preferredStates: [],
 budgetLimitLpa: 10,
 category: 'General',
 });

 const [errors, setErrors] = useState<Record<string, string>>({});

 const set = (field: keyof LocalData, value: any) =>
 setData(d => ({ ...d, [field]: value }));

 const toggleArr = (field: 'examsTaken' | 'favouriteSubjects' | 'careerInterests' | 'preferredStates', val: string) => {
 setData(d => {
 const arr = d[field] as string[];
 return { ...d, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
 });
 };

 const handleFinish = () => {
 updateProfile({
 academicProfile: {
 currentClass: data.currentClass as any,
 board: data.board as any,
 stream: data.stream as Stream,
 marks10: parseFloat(data.marks10) || 0,
 marks11: parseFloat(data.marks11) || 0,
 marks12: parseFloat(data.marks12) || 0,
 category: data.category as any,
 homeState: data.preferredStates[0] || '',
 gender: undefined,
 },
 examScores: Object.fromEntries(
 data.examsTaken.map(id => [id, { score: parseFloat(data.examScores[id]) || 0 }])
 ),
 trackedExams: data.examsTaken,
 preferences: {
 ...profile.preferences,
 budgetLimitLpa: data.budgetLimitLpa,
 preferredStates: data.preferredStates,
 careerInterests: data.careerInterests,
 preferredOwnership: [],
 } as any,
 targetCareers: data.careerInterests,
 });
 completeOnboarding();
 navigate('/dashboard');
 };

 const canProceed = () => {
 if (step === 0) {
 if (!data.currentClass || !data.board) return false;
 if (errors.marks10 || errors.marks11 || errors.marks12) return false;
 return true;
 }
 if (step === 1) {
 const hasExamErrors = data.examsTaken.some(id => errors[`exam_${id}`]);
 if (hasExamErrors) return false;
 }
 return true;
 };

 return (
 <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-4 py-12">
 <div className="w-full max-w-2xl">
 {/* Header */}
 <div className="text-center mb-10 animate-slide-up">
 <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-black text-sm font-semibold mb-4">
 <GraduationCap size={16} />
 Welcome, {user?.name?.split(' ')[0] || 'Student'}!
 </div>
 <h1 className="text-3xl font-bold text-[#0A2540] mb-2">
 Let's personalize your experience
 </h1>
 <p className="text-[#697386]">
 Answer a few quick questions so we can find the best colleges for you.
 </p>
 </div>

 {/* Step Indicators */}
 <div className="flex items-center justify-between mb-8 px-2 relative">
 {steps.map((s, i) => (
 <div key={i} className="flex-1 flex flex-col items-center gap-2 relative">
 <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10 ${
 i < step ? 'step-done' :
 i === step ? 'step-active shadow-lg shadow-black/25' :
 'step-inactive'
 }`}>
 {i < step ? (
 <svg width="14"height="14"viewBox="0 0 14 14"fill="none">
 <path d="M2.5 7L5.5 10L11.5 4"stroke="white"strokeWidth="2"strokeLinecap="round"/>
 </svg>
 ) : i + 1}
 </div>
 {/* Connector line */}
 {i < steps.length - 1 && (
 <div className={`h-0.5 w-full transition-all duration-500 ${i < step ? 'bg-[#0BBF8A]' : 'bg-[#E3E8EF] '}`} style={{position:'absolute', left:'50%', width:'calc(100% - 36px)', top: '18px', zIndex: 0}} />
 )}
 <span className={`text-xs font-medium hidden md:block text-center ${i === step ? 'text-black ' : 'text-[#9DA6B4] '}`}>
 {s.title}
 </span>
 </div>
 ))}
 </div>

 {/* Step Card */}
 <div className="sz-card-elevated p-8 md:p-10 animate-slide-up delay-100">

 {/* STEP 0 — Academic Background */}
 {step === 0 && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-[#0A2540] mb-1">Academic Background</h2>
 <p className="text-[#697386] text-sm">Tell us about your current academic situation.</p>
 </div>

 <div className="grid sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-sm font-semibold text-[#425466] mb-1.5">Current Class *</label>
 <select className="sz-select"value={data.currentClass} onChange={e => set('currentClass', e.target.value)}>
 <option value="">Select...</option>
 <option value="10th">10th</option>
 <option value="11th">11th</option>
 <option value="12th">12th (Appearing)</option>
 <option value="12th passed">12th (Passed)</option>
 <option value="Dropper">Dropper</option>
 <option value="College">In College</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-semibold text-[#425466] mb-1.5">Board *</label>
 <select className="sz-select"value={data.board} onChange={e => set('board', e.target.value)}>
 <option value="">Select...</option>
 <option value="CBSE">CBSE</option>
 <option value="ICSE">ICSE / ISC</option>
 <option value="State Board">State Board</option>
 <option value="IB">IB</option>
 <option value="IGCSE">IGCSE</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-semibold text-[#425466] mb-1.5">Stream</label>
 <select className="sz-select"value={data.stream} onChange={e => set('stream', e.target.value)}>
 <option value="">Select...</option>
 {streamOptions.map(s => <option key={s} value={s}>{s}</option>)}
 </select>
 </div>

 <div>
 <label className="block text-sm font-semibold text-[#425466] mb-1.5">Category</label>
 <select className="sz-select"value={data.category} onChange={e => set('category', e.target.value)}>
 <option value="General">General</option>
 <option value="OBC-NCL">OBC-NCL</option>
 <option value="SC">SC</option>
 <option value="ST">ST</option>
 <option value="EWS">EWS</option>
 </select>
 </div>
 </div>

 {/* Marks */}
 <div>
 <p className="text-sm font-semibold text-[#425466] mb-3">Your Marks (% or CGPA — leave blank if not applicable)</p>
 <div className="grid grid-cols-3 gap-4">
 {(['marks10', 'marks11', 'marks12'] as const).map((field, i) => (
 <div key={field}>
 <label className="block text-xs font-semibold text-[#697386] mb-1">{['10th', '11th', '12th'][i]} %</label>
 <input
 type="text"
 inputMode="decimal"
 className={`w-full bg-white border ${errors[field] ? 'border-red-400 focus:ring-red-500/10' : 'border-[#E3E8EF] focus:border-[#635BFF] focus:ring-black/10'} focus:ring-4 rounded-xl px-4 py-3 text-center text-lg text-[#0A2540] font-bold outline-none transition-all placeholder:text-[#9DA6B4]`}
 placeholder="—"
 value={data[field]}
 onChange={e => {
 let val = e.target.value.replace(/[^0-9.]/g, '');
 if (val.split('.').length > 2) val = val.replace(/\.+$/, '');
 set(field, val);
 
 if (val && (parseFloat(val) < 0 || parseFloat(val) > 100)) {
 setErrors(err => ({ ...err, [field]: 'Must be 0-100' }));
 } else {
 setErrors(err => ({ ...err, [field]: '' }));
 }
 }}
 />
 {errors[field] && <div className="text-red-500 text-[10px] font-semibold mt-1 text-center leading-tight">{errors[field]}</div>}
 </div>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* STEP 1 — Entrance Exams */}
 {step === 1 && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-[#0A2540] mb-1">Entrance Exams</h2>
 <p className="text-[#697386] text-sm">Select the exams you've appeared in or are preparing for. Then add your scores.</p>
 </div>

 <div className="flex flex-wrap gap-3">
 {ENTRANCE_EXAMS.map(exam => (
 <button
 key={exam.id}
 onClick={() => toggleArr('examsTaken', exam.id)}
 className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
 data.examsTaken.includes(exam.id)
 ? 'bg-black text-white border-[#635BFF] shadow-md shadow-black/25'
 : 'bg-white text-[#425466] border-[#E3E8EF] hover:border-[#635BFF] hover:text-black :text-[#818CF8]'
 }`}
 >
 {exam.label}
 </button>
 ))}
 </div>

 {data.examsTaken.length > 0 && (
 <div className="border-t border-[#E3E8EF] pt-5 space-y-4">
 <p className="text-sm font-semibold text-[#425466]">Add your scores / ranks / percentile:</p>
 <div className="grid sm:grid-cols-2 gap-4">
 {data.examsTaken.map(id => {
 const exam = ENTRANCE_EXAMS.find(e => e.id === id)!;
 const placeholder = id.includes('adv') ? 'AIR Rank' : id === 'neet' ? 'Score /720' : id === 'bitsat' ? 'Score /390' : 'Percentile';
 const err = errors[`exam_${id}`];
 return (
 <div key={id}>
 <label className="block text-xs font-semibold text-[#697386] mb-1">{exam.label} — {placeholder}</label>
 <input
 type="text"
 inputMode="decimal"
 className={`w-full bg-white border ${err ? 'border-red-400 focus:ring-red-500/10' : 'border-[#E3E8EF] focus:border-[#635BFF] focus:ring-black/10'} focus:ring-4 rounded-xl px-4 py-3 text-[15px] text-[#0A2540] font-medium outline-none transition-all placeholder:text-[#9DA6B4]`}
 placeholder={placeholder}
 value={data.examScores[id] || ''}
 onChange={e => {
 let val = e.target.value.replace(/[^0-9.]/g, '');
 if (val.split('.').length > 2) val = val.replace(/\.+$/, '');
 setData(d => ({ ...d, examScores: { ...d.examScores, [id]: val } }));
 
 let errMsg = '';
 const num = parseFloat(val);
 if (val) {
 if (id === 'bitsat' && (num < 0 || num > 390)) errMsg = 'Score must be 0-390';
 else if (id === 'neet' && (num < -180 || num > 720)) errMsg = 'Score must be -180 to 720';
 else if (placeholder.includes('Percentile') && (num < 0 || num > 100)) errMsg = 'Must be 0-100';
 else if (placeholder.includes('Rank') && num <= 0) errMsg = 'Rank must be > 0';
 }
 setErrors(eObj => ({ ...eObj, [`exam_${id}`]: errMsg }));
 }}
 />
 {err && <div className="text-red-500 text-xs font-semibold mt-1">{err}</div>}
 </div>
 );
 })}
 </div>
 </div>
 )}

 {data.examsTaken.length === 0 && (
 <div className="text-center py-4 text-[#9DA6B4] text-sm">
 Select at least one exam above (or skip and add later)
 </div>
 )}
 </div>
 )}

 {/* STEP 2 — Interests */}
 {step === 2 && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-[#0A2540] mb-1">Your Interests</h2>
 <p className="text-[#697386] text-sm">This helps us match you with the right courses and colleges.</p>
 </div>

 <div>
 <p className="text-sm font-semibold text-[#425466] mb-3">Favourite Subjects</p>
 <div className="flex flex-wrap gap-2.5">
 {FAVOURITE_SUBJECTS.map(sub => (
 <button
 key={sub}
 onClick={() => toggleArr('favouriteSubjects', sub)}
 className={`px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
 data.favouriteSubjects.includes(sub)
 ? 'bg-slate-100 text-black border-[#635BFF]'
 : 'bg-white text-[#425466] border-[#E3E8EF] hover:border-[#635BFF]/50 :border-[#818CF8]/50'
 }`}
 >
 {sub}
 </button>
 ))}
 </div>
 </div>

 <div>
 <p className="text-sm font-semibold text-[#425466] mb-3">Career Goals</p>
 <div className="flex flex-wrap gap-2.5">
 {CAREER_INTERESTS.map(career => (
 <button
 key={career}
 onClick={() => toggleArr('careerInterests', career)}
 className={`px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
 data.careerInterests.includes(career)
 ? 'bg-black text-white border-[#635BFF] shadow-sm'
 : 'bg-white text-[#425466] border-[#E3E8EF] hover:border-[#635BFF]/50 :border-[#818CF8]/50'
 }`}
 >
 {career}
 </button>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* STEP 3 — Location & Budget */}
 {step === 3 && (
 <div className="space-y-6">
 <div>
 <h2 className="text-2xl font-bold text-[#0A2540] mb-1">Location & Budget</h2>
 <p className="text-[#697386] text-sm">Which states are you open to studying in? What's your annual fees budget?</p>
 </div>

 <div>
 <p className="text-sm font-semibold text-[#425466] mb-3">Preferred States <span className="text-[#9DA6B4] font-normal">(select all that apply)</span></p>
 <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
 {INDIAN_STATES.map(state => (
 <button
 key={state}
 onClick={() => toggleArr('preferredStates', state)}
 className={`px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
 data.preferredStates.includes(state)
 ? 'bg-black text-white border-[#635BFF]'
 : 'bg-white text-[#425466] border-[#E3E8EF] hover:border-[#635BFF]/50 :border-[#818CF8]/50'
 }`}
 >
 {state}
 </button>
 ))}
 </div>
 </div>

 <div>
 <div className="flex justify-between items-center mb-3">
 <p className="text-sm font-semibold text-[#425466]">Annual Fee Budget</p>
 <span className="text-xl font-bold text-black">₹{data.budgetLimitLpa}L / year</span>
 </div>
 <input
 type="range"
 min="1"max="40"step="1"
 className="w-full accent-[#635BFF] cursor-pointer h-2"
 value={data.budgetLimitLpa}
 onChange={e => set('budgetLimitLpa', parseInt(e.target.value))}
 />
 <div className="flex justify-between text-xs text-[#9DA6B4] mt-1">
 <span>₹1L</span>
 <span>₹40L+</span>
 </div>
 </div>
 </div>
 )}

 {/* STEP 4 — Done! */}
 {step === 4 && (
 <div className="text-center py-8 animate-fade-in">
 <div className="w-24 h-24 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
 <CheckCircle2 size={48} className="text-[#0BBF8A]"/>
 </div>
 <h2 className="text-3xl font-bold text-[#0A2540] mb-3">You're all set! 🎉</h2>
 <p className="text-[#697386] max-w-sm mx-auto mb-6 text-base leading-relaxed">
 We've built your personalized college list. Your dashboard is ready with safe colleges that match your profile!
 </p>
 <div className="flex flex-wrap gap-3 justify-center mb-8">
 {data.preferredStates.slice(0, 3).map(s => (
 <span key={s} className="sz-chip">{s}</span>
 ))}
 {data.examsTaken.slice(0, 2).map(id => (
 <span key={id} className="sz-chip-gray">{ENTRANCE_EXAMS.find(e => e.id === id)?.label}</span>
 ))}
 <span className="sz-chip-gray">Budget: ₹{data.budgetLimitLpa}L</span>
 </div>
 </div>
 )}

 {/* Navigation */}
 <div className="mt-8 pt-6 border-t border-[#E3E8EF] flex justify-between items-center">
 <button
 onClick={() => setStep(s => Math.max(s - 1, 0))}
 disabled={step === 0}
 className="flex items-center gap-2 text-sm font-semibold text-[#697386] hover:text-[#0A2540] :text-slate-200 disabled:opacity-0 transition-all"
 >
 <ArrowLeft size={18} /> Back
 </button>

 <div className="flex gap-1.5">
 {steps.map((_, i) => (
 <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
 i === step ? 'w-6 bg-black' : i < step ? 'w-3 bg-[#0BBF8A]' : 'w-3 bg-[#E3E8EF] '
 }`} />
 ))}
 </div>

 {step < steps.length - 1 ? (
 <button
 onClick={() => setStep(s => Math.min(s + 1, 4))}
 disabled={!canProceed()}
 className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {step === 3 ? 'Finish Setup' : 'Continue'}
 <ArrowRight size={18} />
 </button>
 ) : (
 <button onClick={handleFinish} className="btn-primary">
 Go to Dashboard <ArrowRight size={18} />
 </button>
 )}
 </div>
 </div>

 {/* Skip link */}
 {step < 4 && (
 <div className="text-center mt-4">
 <button
 onClick={() => { completeOnboarding(); navigate('/dashboard'); }}
 className="text-sm text-[#9DA6B4] hover:text-[#697386] :text-slate-400 transition-colors"
 >
 Skip for now — I'll fill this in later
 </button>
 </div>
 )}
 </div>
 </div>
 );
}
