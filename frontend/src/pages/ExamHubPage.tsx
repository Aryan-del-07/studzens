import { useState, useMemo } from 'react';
import { 

/**
 * ExamHubPage.tsx
 *
 * WHAT THIS FILE DOES:
 * Lists all upcoming entrance exams with countdown timers, dates,
 * and eligibility info. Students can"track"exams to add them to their dashboard.
 *
 * WHY IT EXISTS:
 * Keeping track of exam dates is critical for students. Missing a
 * registration deadline can cost a year. This page centralizes all exam info.
 *
 * KEY CONCEPTS:
 * - Countdown timer: Shows days/hours/minutes/seconds until exam
 * - Exam cards with eligibility, date, and registration deadline
 * -"Track Exam"button: Adds exam to the student's dashboard
 * - Category filtering: Engineering, Medical, etc.
 * - Calendar view: Visual representation of exam timeline
 */
 Search, Calendar as CalendarIcon, Compass, MapPin, 
 ExternalLink, ArrowRight, Bookmark, BookmarkCheck, Clock, CheckSquare, 
 Square, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, Activity, 
 BookOpen, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { exams } from '../api/mocks/exams';
import { useStudentProfile } from '../contexts/StudentProfileContext';
import { 
 calculateReadinessScore, 
 getMissingActions, 
 getSuggestedExams, 
 getTodayPriorities, 
 getCalendarEvents
} from '../utils/examCommandCenter';

export default function ExamHubPage() {
 const { profile, trackExam, untrackExam } = useStudentProfile();
 
 // Dual-view switcher
 const [activeView, setActiveView] = useState<'tracker' | 'all'>('tracker');
 const [query, setQuery] = useState('');
 const [categoryFilter, setCategoryFilter] = useState<string>('All');

 // Track toggled priorities locally
 const [completedPriorities, setCompletedPriorities] = useState<Record<string, boolean>>({});

 // Compute active priorities based on profile
 const priorities = useMemo(() => {
 const baseList = getTodayPriorities(profile);
 return baseList.map(p => ({
 ...p,
 done: completedPriorities[p.id] ?? p.done
 }));
 }, [profile, completedPriorities]);

 const handleTogglePriority = (id: string) => {
 setCompletedPriorities(prev => ({
 ...prev,
 [id]: !prev[id]
 }));
 };

 // Readiness Score
 const readiness = useMemo(() => {
 const base = calculateReadinessScore(profile);
 const completedCount = priorities.filter(p => p.done).length;
 const additionalScore = completedCount * 5; 
 const finalScore = Math.min(100, base.score + additionalScore);
 return { score: finalScore, breakdown: base.breakdown };
 }, [profile, priorities]);

 const missingActions = useMemo(() => getMissingActions(profile), [profile]);
 const suggestedExams = useMemo(() => getSuggestedExams(profile, exams), [profile]);

 // Tracked Exams
 const trackedExamsData = useMemo(() => {
 return (profile.trackedExams || [])
 .map(id => exams.find(e => e.id === id))
 .filter(Boolean) as typeof exams;
 }, [profile.trackedExams]);

 // Calendar State & Calculations
 const [calMonth, setCalMonth] = useState(new Date().getMonth());
 const [calYear, setCalYear] = useState(new Date().getFullYear());
 
 // Track calendar filters that are manually disabled by the user
 const [excludedCalExams, setExcludedCalExams] = useState<string[]>([]);

 // Selected calendar exams derived from profile pins minus exclusions
 const selectedCalExams = useMemo(() => {
 return (profile.trackedExams || []).filter(id => !excludedCalExams.includes(id));
 }, [profile.trackedExams, excludedCalExams]);

 const handleToggleCalExam = (examId: string) => {
 setExcludedCalExams(prev => 
 prev.includes(examId) ? prev.filter(x => x !== examId) : [...prev, examId]
 );
 };

 const calendarEvents = useMemo(() => {
 return getCalendarEvents(selectedCalExams, exams);
 }, [selectedCalExams]);

 const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
 const firstDayIndex = (month: number, year: number) => new Date(year, month, 1).getDay();

 const handlePrevMonth = () => {
 if (calMonth === 0) {
 setCalMonth(11);
 setCalYear(y => y - 1);
 } else {
 setCalMonth(m => m - 1);
 }
 };

 const handleNextMonth = () => {
 if (calMonth === 11) {
 setCalMonth(0);
 setCalYear(y => y + 1);
 } else {
 setCalMonth(m => m + 1);
 }
 };

 const numDays = daysInMonth(calMonth, calYear);
 const startOffset = firstDayIndex(calMonth, calYear);
 const totalCells = numDays + startOffset;
 const numRows = Math.ceil(totalCells / 7);

 const calRows = [];
 let dayCounter = 1;

 for (let r = 0; r < numRows; r++) {
 const rowCells = [];
 for (let c = 0; c < 7; c++) {
 const cellIndex = r * 7 + c;
 if (cellIndex < startOffset || dayCounter > numDays) {
 rowCells.push({ day: null, dateStr: '' });
 } else {
 const dStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
 rowCells.push({ day: dayCounter, dateStr: dStr });
 dayCounter++;
 }
 }
 calRows.push(rowCells);
 }

 const getEventsForDate = (dateStr: string) => {
 return calendarEvents.filter(e => e.date === dateStr);
 };

 // Filter exams for directory list
 const filteredExams = useMemo(() => {
 return exams.filter(e => {
 const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase()) || e.fullName.toLowerCase().includes(query.toLowerCase());
 const matchesCat = categoryFilter === 'All' || e.category === categoryFilter;
 return matchesQuery && matchesCat;
 });
 }, [query, categoryFilter]);

 const calculateDays = (dateStr: string) => {
 const target = new Date(dateStr);
 const now = new Date();
 const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
 return diff > 0 ? diff : 0;
 };

 const categoryColor: Record<string, string> = {
 Engineering: 'bg-blue-50 text-blue-700 border-blue-200',
 Medical: 'bg-emerald-50 text-emerald-700 border-emerald-200',
 Design: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
 Law: 'bg-amber-50 text-amber-700 border-amber-200',
 General: 'bg-slate-100 text-slate-700 border-slate-200',
 };

 const getEventBadgeColor = (type: string) => {
 switch (type) {
 case 'registration_start': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
 case 'registration_end': return 'bg-rose-100 text-rose-800 border-rose-200';
 case 'exam': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
 case 'result': return 'bg-amber-100 text-amber-800 border-amber-200';
 case 'counseling': return 'bg-teal-100 text-teal-800 border-teal-200';
 default: return 'bg-slate-100 text-slate-800 border-slate-200';
 }
 };

 return (
 <div className="bg-[#F6F7FB] min-h-screen text-[#0A2540]">
 
 {/* Sub-Header switcher */}
 <div className="bg-white border-b border-[#E3E8EF] pt-8 pb-6">
 <div className="max-w-7xl mx-auto px-4">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#635BFF] uppercase tracking-wider mb-2">
 <Compass size={14} /> Academic Command
 </div>
 <h1 className="text-3xl font-extrabold font-sans tracking-tight">Stuzen Exam Hub</h1>
 </div>

 {/* Toggle switch between Command Center and Browse All */}
 <div className="bg-[#F0F2F8] p-1 rounded-2xl flex gap-1 border border-[#E3E8EF] self-start md:self-center">
 <button
 onClick={() => setActiveView('tracker')}
 className={`px-4 py-2 rounded-xl text-sm font-bold font-sans cursor-pointer transition-all flex items-center gap-1.5 ${
 activeView === 'tracker' 
 ? 'bg-white text-[#635BFF] shadow-sm' 
 : 'text-[#697386] hover:text-[#0A2540]'
 }`}
 >
 <Activity size={16} />
 <span>Command Center</span>
 </button>
 <button
 onClick={() => setActiveView('all')}
 className={`px-4 py-2 rounded-xl text-sm font-bold font-sans cursor-pointer transition-all flex items-center gap-1.5 ${
 activeView === 'all' 
 ? 'bg-white text-[#635BFF] shadow-sm' 
 : 'text-[#697386] hover:text-[#0A2540]'
 }`}
 >
 <BookOpen size={16} />
 <span>Browse Entrance Exams</span>
 </button>
 </div>
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
 
 {/* VIEW 1: COMMAND CENTER */}
 {activeView === 'tracker' && (
 <div className="grid lg:grid-cols-3 gap-8">
 
 {/* Left columns */}
 <div className="lg:col-span-2 space-y-8">
 
 {/* Readiness Score meter */}
 <div className="sz-card p-6 flex flex-col md:flex-row items-center gap-6">
 <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
 <svg className="w-full h-full transform -rotate-90">
 <circle cx="64"cy="64"r="54"stroke="#F0F2F8"strokeWidth="8"fill="transparent"/>
 <circle 
 cx="64"cy="64"r="54"
 stroke="#635BFF"strokeWidth="8"fill="transparent"
 strokeDasharray={2 * Math.PI * 54}
 strokeDashoffset={2 * Math.PI * 54 * (1 - readiness.score / 100)}
 strokeLinecap="round"
 className="transition-all duration-1000 ease-out"
 />
 </svg>
 <div className="absolute flex flex-col items-center justify-center text-center">
 <span className="text-2xl font-black text-[#0A2540] font-sans">{readiness.score}</span>
 <span className="text-[9px] text-[#697386] font-bold uppercase tracking-wider">Readiness</span>
 </div>
 </div>

 <div className="flex-1 space-y-2 font-sans">
 <h3 className="font-bold text-base">Preparation Readiness</h3>
 <p className="text-xs text-[#697386] leading-relaxed">
 Based on your profile milestones, marks, target careers, and pinned exams. Complete missing steps to improve setup.
 </p>
 
 <div className="pt-2">
 {missingActions.length === 0 ? (
 <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
 <CheckCircle size={15} /> All setup milestones are completed!
 </div>
 ) : (
 <div className="space-y-1.5">
 {missingActions.slice(0, 2).map(act => (
 <div key={act.id} className="flex items-center justify-between text-[11px] bg-[#F6F7FB] border border-[#E3E8EF] p-2.5 rounded-xl">
 <span className="text-[#425466] flex items-center gap-1.5 font-semibold">
 <AlertTriangle size={14} className="text-amber-500"/> {act.text}
 </span>
 <Link to={act.link} className="text-[#635BFF] font-bold hover:underline">
 {act.actionText} →
 </Link>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 </div>

 {/* My Exam Tracker Countdowns */}
 <div className="space-y-4">
 <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <Clock size={18} className="text-[#697386]"/> My Pinned Exam Countdowns
 </h3>

 {trackedExamsData.length === 0 ? (
 <div className="sz-card p-10 text-center bg-white">
 <CalendarIcon size={32} className="mx-auto text-[#9DA6B4] mb-3"/>
 <h4 className="font-bold text-[#0A2540] mb-1 font-sans">No entrance exams pinned</h4>
 <p className="text-xs text-[#697386] mb-4 font-sans max-w-xs mx-auto">Pin exams from the"Browse Entrance Exams"tab to set up countdown trackers.</p>
 <button
 onClick={() => setActiveView('all')}
 className="bg-[#635BFF] text-white px-4 py-2 rounded-xl text-xs font-bold font-sans cursor-pointer hover:bg-[#4F47E5]"
 >
 Browse Exam List
 </button>
 </div>
 ) : (
 <div className="space-y-4">
 {trackedExamsData.map(exam => {
 const nextEvents = [
 { label: 'Reg. Deadline', date: exam.importantDates.registrationEnd },
 { label: 'Exam Date', date: exam.importantDates.examStart },
 { label: 'Result Expected', date: exam.importantDates.resultExpected },
 ].map(e => ({ ...e, days: calculateDays(e.date) }))
 .filter(e => e.days > 0)
 .sort((a, b) => a.days - b.days);

 const nextMilestone = nextEvents[0];

 return (
 <div key={exam.id} className="sz-card p-6 bg-white flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
 <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-[#E3E8EF] pb-4 md:pb-0 pr-5 flex flex-col justify-between">
 <div>
 <span className="sz-chip text-[10px] mb-2 inline-flex">{exam.category}</span>
 <h3 className="font-extrabold text-[#0A2540] text-lg font-sans leading-snug">{exam.name}</h3>
 <p className="text-xs text-[#697386] mt-0.5 font-sans leading-snug line-clamp-2">{exam.fullName}</p>
 </div>
 <Link to={`/exams/${exam.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#635BFF] mt-4 hover:underline font-sans">
 Syllabus & Pattern Hub →
 </Link>
 </div>
 <div className="md:w-2/3 flex flex-col justify-between">
 <div className="grid grid-cols-3 gap-3">
 {[
 { label: 'Reg. Deadline', value: calculateDays(exam.importantDates.registrationEnd) },
 { label: 'Exam Starts', value: calculateDays(exam.importantDates.examStart) },
 { label: 'Expected Result', value: calculateDays(exam.importantDates.resultExpected) },
 ].map(({ label, value }) => (
 <div key={label} className="bg-[#F6F7FB] rounded-xl p-3 border border-[#E3E8EF] font-sans text-center">
 <div className="text-[9px] font-bold text-[#9DA6B4] uppercase tracking-wider mb-1 truncate">{label}</div>
 <div className="text-xl font-black text-[#0A2540]">{value}</div>
 <div className="text-[9px] text-[#697386]">days left</div>
 </div>
 ))}
 </div>
 
 {nextMilestone && (
 <div className="mt-4 bg-[#EEF0FF] rounded-xl p-3 border border-[#C7C5FF] text-xs font-semibold text-[#635BFF] flex items-center justify-between font-sans">
 <span>🚀 Next Milestone: <strong className="text-[#0A2540]">{nextMilestone.label}</strong> is in <strong className="text-[#0A2540]">{nextMilestone.days} days</strong></span>
 <span className="text-[10px] text-[#697386] font-normal">{nextMilestone.date}</span>
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>
 )}
 </div>

 {/* My Academic Calendar */}
 <div className="sz-card p-6 space-y-5 bg-white">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3E8EF]">
 <h3 className="font-bold text-base flex items-center gap-2 font-sans">
 <CalendarIcon size={18} className="text-[#635BFF]"/> My Academic Calendar
 </h3>
 <div className="flex items-center gap-2">
 <button onClick={handlePrevMonth} className="p-1.5 hover:bg-[#F6F7FB] border border-[#E3E8EF] rounded-lg cursor-pointer transition-colors"><ChevronLeft size={16} /></button>
 <span className="font-bold text-sm min-w-[120px] text-center font-sans">
 {new Date(calYear, calMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
 </span>
 <button onClick={handleNextMonth} className="p-1.5 hover:bg-[#F6F7FB] border border-[#E3E8EF] rounded-lg cursor-pointer transition-colors"><ChevronRight size={16} /></button>
 </div>
 </div>

 {profile.trackedExams.length > 0 && (
 <div className="flex flex-wrap gap-1.5 text-xs font-sans">
 {profile.trackedExams.map(id => {
 const exam = exams.find(e => e.id === id);
 if (!exam) return null;
 const selected = selectedCalExams.includes(id);
 return (
 <button
 key={id}
 onClick={() => handleToggleCalExam(id)}
 className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer font-bold text-[10px] ${
 selected ? 'bg-[#EEF0FF] border-[#635BFF] text-[#635BFF]' : 'bg-white border-[#E3E8EF] text-[#697386]'
 }`}
 >
 {exam.name}
 </button>
 );
 })}
 </div>
 )}

 {/* Calendar grid view */}
 <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#697386] font-sans">
 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
 <div key={d} className="py-1 text-[9px] font-bold uppercase tracking-wider">{d}</div>
 ))}
 {calRows.map((row, rIdx) => 
 row.map((cell, cIdx) => {
 const eventsOnDay = cell.day ? getEventsForDate(cell.dateStr) : [];
 const isToday = cell.day && new Date().toDateString() === new Date(calYear, calMonth, cell.day).toDateString();
 return (
 <div 
 key={`${rIdx}-${cIdx}`} 
 className={`min-h-[56px] rounded-xl border p-1 flex flex-col justify-between transition-all ${
 cell.day ? 'bg-white border-[#E3E8EF]' : 'bg-[#F6F7FB] border-transparent'
 } ${isToday ? 'ring-2 ring-[#635BFF] border-transparent' : ''}`}
 >
 {cell.day ? (
 <div className="flex justify-between items-center">
 <span className={`text-[9px] font-extrabold flex items-center justify-center w-4 h-4 rounded-full ${isToday ? 'bg-[#635BFF] text-white' : 'text-[#0A2540]'}`}>
 {cell.day}
 </span>
 {eventsOnDay.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF]"></span>}
 </div>
 ) : <div />}
 
 {eventsOnDay.slice(0, 1).map((ev, idx) => (
 <div 
 key={idx} 
 className={`text-[8px] font-extrabold truncate px-1 py-0.5 rounded border leading-tight ${getEventBadgeColor(ev.type)}`}
 title={ev.title}
 >
 {ev.examName}: {ev.title.split(' ').slice(1).join(' ')}
 </div>
 ))}
 {eventsOnDay.length > 1 && (
 <div className="text-[6px] text-right font-black text-[#9DA6B4] pr-1">+{eventsOnDay.length - 1}</div>
 )}
 </div>
 );
 })
 )}
 </div>
 </div>

 </div>

 {/* Sidebar Columns */}
 <div className="space-y-8">
 
 {/* Today's Priorities */}
 <div className="sz-card p-6 bg-white space-y-4">
 <h3 className="font-bold text-base flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-3">
 <CheckSquare size={18} className="text-[#635BFF]"/> Today's Priorities
 </h3>
 <div className="space-y-2.5">
 {priorities.map(p => (
 <button 
 key={p.id}
 onClick={() => handleTogglePriority(p.id)}
 className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#F6F7FB] transition-all cursor-pointer font-sans text-xs border border-transparent hover:border-[#E3E8EF]"
 >
 <span className="mt-0.5 shrink-0 text-[#635BFF]">
 {p.done ? <CheckCircle size={15} /> : <Square size={15} />}
 </span>
 <span className={`leading-relaxed ${p.done ? 'line-through text-[#9DA6B4] font-medium' : 'text-[#425466] font-bold'}`}>
 {p.text}
 </span>
 </button>
 ))}
 </div>
 </div>

 {/* Suggested Exams */}
 <div className="sz-card p-6 bg-white space-y-4">
 <h3 className="font-bold text-base flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-3">
 <Compass size={18} className="text-[#635BFF]"/> Suggested For You
 </h3>
 <div className="space-y-3">
 {suggestedExams.length === 0 ? (
 <div className="text-center py-6 text-xs text-[#9DA6B4] font-sans">Set your stream in your profile to see suggestions.</div>
 ) : (
 suggestedExams.map(ex => (
 <div key={ex.id} className="p-3 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl flex flex-col justify-between gap-2 font-sans">
 <div>
 <div className="flex justify-between items-center">
 <span className="sz-chip text-[9px] px-2 py-0.5">{ex.category}</span>
 <span className="text-[9px] text-[#697386] font-bold uppercase">{ex.level}</span>
 </div>
 <h4 className="font-bold text-[#0A2540] text-sm mt-1">{ex.name}</h4>
 <p className="text-[10px] text-[#697386] mt-0.5 line-clamp-2 leading-relaxed">{ex.description}</p>
 </div>
 <Link to={`/exams/${ex.id}`} className="text-[10px] text-[#635BFF] font-bold hover:underline self-end">
 View details →
 </Link>
 </div>
 ))
 )}
 </div>
 </div>

 {/* Future Timeline visualization */}
 <div className="sz-card p-6 bg-gradient-to-br from-indigo-900 to-indigo-955 text-white space-y-4">
 <h3 className="font-bold text-sm flex items-center gap-1.5 font-sans">
 <Sparkles size={16} className="text-indigo-400"/> Future Timeline Journey
 </h3>
 <div className="relative pl-4 border-l-2 border-indigo-400/40 space-y-4 text-xs font-sans">
 <div>
 <span className="absolute -left-1.5 w-3.5 h-3.5 rounded-full bg-indigo-400 border-4 border-indigo-900"/>
 <span className="text-[10px] text-indigo-300 font-bold block">CURRENT</span>
 <strong className="text-white block mt-0.5">Class 12th Preparation</strong>
 </div>
 <div>
 <span className="absolute -left-1.5 w-3.5 h-3.5 rounded-full bg-slate-500 border-4 border-indigo-900"/>
 <span className="text-[10px] text-indigo-300 font-bold block">STEP 2</span>
 <strong className="text-slate-300 block mt-0.5">Entrance Exams (tracked)</strong>
 </div>
 <div>
 <span className="absolute -left-1.5 w-3.5 h-3.5 rounded-full bg-slate-500 border-4 border-indigo-900"/>
 <span className="text-[10px] text-indigo-300 font-bold block">STEP 3</span>
 <strong className="text-slate-300 block mt-0.5">Counselling & Seat Allotment</strong>
 </div>
 <div>
 <span className="absolute -left-1.5 w-3.5 h-3.5 rounded-full bg-slate-500 border-4 border-indigo-900"/>
 <span className="text-[10px] text-indigo-300 font-bold block">STEP 4</span>
 <strong className="text-slate-300 block mt-0.5">College Admissions</strong>
 </div>
 </div>
 <p className="text-[10px] text-indigo-200/80 leading-relaxed font-sans pt-1">
 Keep track of all exam dates in this tracker to ensure zero missed milestones.
 </p>
 </div>

 </div>
 </div>
 )}

 {/* VIEW 2: BROWSE ALL EXAMS */}
 {activeView === 'all' && (
 <div className="space-y-8">
 
 {/* Search and Category Filters */}
 <div className="bg-white border border-[#E3E8EF] p-5 rounded-2xl shadow-sm space-y-4">
 <div className="grid md:grid-cols-3 gap-4">
 <div className="md:col-span-2 relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9DA6B4]"size={20} />
 <input
 type="text"
 placeholder="Search major entrance examinations (e.g. JEE Main, BITSAT, CLAT)..."
 className="sz-input pl-12 py-3.5 text-sm rounded-xl font-sans"
 value={query}
 onChange={e => setQuery(e.target.value)}
 />
 </div>
 
 <div>
 <select
 value={categoryFilter}
 onChange={e => setCategoryFilter(e.target.value)}
 className="w-full bg-white border border-[#E3E8EF] p-3.5 rounded-xl font-sans font-bold text-xs focus:outline-none cursor-pointer"
 >
 <option value="All">All Categories</option>
 <option value="Engineering">Engineering</option>
 <option value="Medical">Medical</option>
 <option value="Design">Design</option>
 <option value="Law">Law</option>
 </select>
 </div>
 </div>
 </div>

 {/* Exam Directory list */}
 {filteredExams.length === 0 ? (
 <div className="sz-card p-12 text-center bg-white font-sans text-sm text-[#697386]">
 No exams match your search criteria. Try a different query.
 </div>
 ) : (
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredExams.map(exam => {
 const pinned = (profile.trackedExams || []).includes(exam.id);
 return (
 <div key={exam.id} className="sz-card p-6 bg-white flex flex-col group relative hover:shadow-md transition-all">
 <div className="flex justify-between items-start mb-4">
 <div>
 <span className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-md border inline-block mb-2 font-sans ${categoryColor[exam.category] || categoryColor.General}`}>
 {exam.category}
 </span>
 <h2 className="text-xl font-black text-[#0A2540] font-sans">{exam.name}</h2>
 </div>
 
 <div className="flex items-center gap-1.5">
 <button
 onClick={() => pinned ? untrackExam(exam.id) : trackExam(exam.id)}
 className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
 pinned
 ? 'bg-indigo-50 border-[#635BFF] text-[#635BFF]'
 : 'bg-white border-[#E3E8EF] text-[#9DA6B4] hover:border-[#635BFF] hover:text-[#635BFF]'
 }`}
 title={pinned ? 'Unpin from dashboard' : 'Pin to dashboard'}
 >
 {pinned ? <BookmarkCheck size={16} className="fill-current text-[#635BFF]"/> : <Bookmark size={16} />}
 </button>
 </div>
 </div>

 <p className="text-xs text-[#697386] mb-5 flex-1 line-clamp-2 leading-relaxed font-sans">{exam.fullName}</p>

 <div className="space-y-2 mb-5">
 <div className="flex items-center gap-2.5 text-xs font-sans">
 <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] flex items-center justify-center shrink-0">
 <CalendarIcon size={14} className="text-[#635BFF]"/>
 </div>
 <div>
 <div className="text-[8px] font-bold text-[#9DA6B4] uppercase tracking-wider">Exam Date</div>
 <div className="font-extrabold text-[#0A2540]">
 {new Date(exam.importantDates.examStart).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
 </div>
 </div>
 </div>
 
 <div className="flex items-center gap-2.5 text-xs font-sans">
 <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
 <MapPin size={14} className="text-emerald-600"/>
 </div>
 <div>
 <div className="text-[8px] font-bold text-[#9DA6B4] uppercase tracking-wider">Accepted By</div>
 <div className="font-extrabold text-[#0A2540] truncate max-w-[180px]">
 {exam.acceptedBy.slice(0, 2).join(', ')}{exam.acceptedBy.length > 2 && ` +${exam.acceptedBy.length - 2}`}
 </div>
 </div>
 </div>
 </div>

 <div className="pt-4 border-t border-[#E3E8EF] flex items-center justify-between mt-auto font-sans">
 <a href={exam.officialWebsite} target="_blank"rel="noopener noreferrer"
 className="text-xs font-bold text-[#697386] hover:text-[#0A2540] flex items-center gap-1 transition-colors">
 Official Website <ExternalLink size={12} />
 </a>
 <Link to={`/exams/${exam.id}`}
 className="text-xs font-extrabold text-[#635BFF] hover:text-[#4F47E5] flex items-center gap-0.5 transition-colors group-hover:underline underline-offset-2">
 View details <ArrowRight size={13} />
 </Link>
 </div>
 </div>
 );
 })}
 </div>
 )}

 </div>
 )}

 </div>
 </div>
 );
}
