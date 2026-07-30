import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useStudentProfile } from '../contexts/StudentProfileContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { exams } from '../api/mocks/exams';
import { colleges } from '../api/mocks/colleges';
import { 

/**
 * DashboardPage.tsx
 *
 * WHAT THIS FILE DOES:
 * The student's home screen — the central hub of the app.
 * It shows: exam countdowns, college recommendations, profile strength,
 * a mini calendar, AI insights, and recent activity.
 *
 * WHY IT EXISTS:
 * After login, this is the first page students see. It answers:
 *"What should I do next?"by surfacing the most relevant actions.
 *
 * KEY CONCEPTS:
 * - `useMemo`: Heavy computations (college filtering, exam sorting) are cached
 * - `useCallback`: Event handlers are memoized to prevent re-renders
 * - `getDashboardColleges`: AI-like scoring engine that ranks colleges
 * - `calculateReadinessScore`: Measures how prepared the student is
 * - `getTodayPriorities`: Generates a daily todo list based on exam dates
 */
 Clock, BookOpen, Bookmark, Bell, ArrowRight, GraduationCap, MapPin,
 TrendingUp, CheckSquare, Square, Calendar as CalendarIcon,
 ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, CalendarClock,
 User, ExternalLink, Sparkles, Target
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { 
 calculateReadinessScore, 
 getMissingActions, 
 getSuggestedExams, 
 getTodayPriorities, 
 getCalendarEvents
} from '../utils/examCommandCenter';

type CollegeMatch = {
 college: typeof colleges[0];
 matchType: 'Safe Reach' | 'Safe' | 'Safe Backup';
 matchScore: number;
 reasons: string[];
};

export default function DashboardPage() {
 const { profile } = useStudentProfile();
 const { savedColleges } = useBookmarks();
 const { user } = useAuth();
 const { notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll } = useNotifications();
 const navigate = useNavigate();

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

 const handleTogglePriority = useCallback((id: string) => {
 setCompletedPriorities(prev => ({
 ...prev,
 [id]: !prev[id]
 }));
 }, []);

 // Seed notification alert items dynamically based on tracked exams using useRef to track seeding state
 const notificationsSeeded = useRef(false);
 useEffect(() => {
 if (notifications.length === 0 && !notificationsSeeded.current && (profile.trackedExams || []).length > 0) {
 notificationsSeeded.current = true;
 (profile.trackedExams || []).forEach((examId, idx) => {
 const exam = exams.find(e => e.id === examId);
 if (exam) {
 setTimeout(() => {
 addNotification({
 title: `${exam.name} Registration Alert`,
 message: `The registration window for ${exam.name} is open from ${exam.importantDates.registrationStart} to ${exam.importantDates.registrationEnd}.`,
 type: 'info'
 });
 }, idx * 100);
 }
 });
 }
 }, [profile.trackedExams, notifications.length, addNotification]);

 // Toggle Notification Panel
 const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Profile Completion Score (0–100)
  const profileCompletion = useMemo(() => {
  let score = 0;
  const breakdown: { label: string; done: boolean; pts: number }[] = [];
  const add = (label: string, done: boolean, pts: number) => {
    breakdown.push({ label, done, pts });
    if (done) score += pts;
  };
  add('Stream selected', !!profile.academicProfile?.stream, 15);
  add('Class / Board set', !!profile.academicProfile?.currentClass && !!profile.academicProfile?.board, 10);
  add('12th marks entered', !!profile.academicProfile?.marks12, 10);
  add('Academic category set', !!profile.academicProfile?.category, 5);
  add('Budget limit set', !!profile.preferences?.budgetLimitLpa, 15);
  add('Preferred states set', (profile.preferences?.preferredStates?.length ?? 0) > 0, 10);
  add('Career goals set', (profile.preferences?.goals?.length ?? 0) > 0, 10);
  add('Exam tracked', (profile.trackedExams?.length ?? 0) > 0, 15);
  add('College saved', (profile.savedColleges?.length ?? 0) > 0, 10);
  return { score: Math.min(100, score), breakdown };
  }, [profile, priorities]);

 const missingActions = useMemo(() => getMissingActions(profile), [profile]);
 const suggestedExams = useMemo(() => getSuggestedExams(profile, exams), [profile]);

 // Tracked Exams Data
 const trackedExamsData = useMemo(() => {
 // Cache tracked exam data to avoid re-mapping on every render
 return profile.trackedExams
 .map(id => exams.find(e => e.id === id))
 .filter(Boolean) as typeof exams;
 }, [profile.trackedExams]);

 const calculateDays = useCallback((dateStr: string) => {
 const target = new Date(dateStr);
 const now = new Date();
 const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
 return diff > 0 ? diff : 0;
 }, []);

 // Calendar State & Calculations
 const [calMonth, setCalMonth] = useState(new Date().getMonth());
 const [calYear, setCalYear] = useState(new Date().getFullYear());
 const [selectedCalExams, setSelectedCalExams] = useState<string[]>(profile.trackedExams);

 const calendarEvents = useMemo(() => {
 return getCalendarEvents(selectedCalExams, exams);
 }, [selectedCalExams]);

 const handlePrevMonth = useCallback(() => {
 if (calMonth === 0) {
 setCalMonth(11);
 setCalYear(y => y - 1);
 } else {
 setCalMonth(m => m - 1);
 }
 }, [calMonth]);

 const handleNextMonth = useCallback(() => {
 if (calMonth === 11) {
 setCalMonth(0);
 setCalYear(y => y + 1);
 } else {
 setCalMonth(m => m + 1);
 }
 }, [calMonth]);

 const calRows = useMemo(() => {
 // Cache calendar grid rows to avoid recomputing on every render
 const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
 const firstDayIndex = (month: number, year: number) => new Date(year, month, 1).getDay();

 const numDays = daysInMonth(calMonth, calYear);
 const startOffset = firstDayIndex(calMonth, calYear);
 const totalCells = numDays + startOffset;
 const numRows = Math.ceil(totalCells / 7);

 const rows = [];
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
 rows.push(rowCells);
 }
 return rows;
 }, [calMonth, calYear]);

 const getEventsForDate = useCallback((dateStr: string) => {
 return calendarEvents.filter(e => e.date === dateStr);
 }, [calendarEvents]);

  // Calendar sync helpers
  const buildGoogleCalendarUrl = useCallback(() => {
  const events = calendarEvents.slice(0, 1);
  if (events.length === 0) return 'https://calendar.google.com';
  const ev = events[0];
  const date = ev.date.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${date}/${date}&details=${encodeURIComponent('Added from Studzens')}`;
  }, [calendarEvents]);

  const buildICSContent = useCallback(() => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Studzens//Academic Calendar//EN',
  ];
  calendarEvents.forEach(ev => {
    const d = ev.date.replace(/-/g, '');
    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART;VALUE=DATE:${d}`);
    lines.push(`DTEND;VALUE=DATE:${d}`);
    lines.push(`SUMMARY:${ev.title}`);
    lines.push(`DESCRIPTION:${ev.examName} - Added from Studzens`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
  }, [calendarEvents]);

  const handleDownloadICS = useCallback(() => {
  const blob = new Blob([buildICSContent()], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'studzens-academic-calendar.ics';
  a.click();
  URL.revokeObjectURL(url);
  }, [buildICSContent]);

 const getEventBadgeColor = useCallback((type: string) => {
 switch (type) {
 case 'registration_start': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
 case 'registration_end': return 'bg-rose-100 text-rose-800 border-rose-200';
 case 'exam': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
 case 'result': return 'bg-amber-100 text-amber-800 border-amber-200';
 case 'counseling': return 'bg-teal-100 text-teal-800 border-teal-200';
 default: return 'bg-slate-100 text-slate-800 border-slate-200';
 }
 }, []);

 // Cache today's date string to avoid creating Date objects on every cell render
 const todayDateStr = useMemo(() => new Date().toDateString(), []);
 
 // Cache calendar month label to avoid recomputing on every render
 const calMonthLabel = useMemo(() => {
 return new Date(calYear, calMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
 }, [calYear, calMonth]);

 return (
 <div className="bg-[#F6F7FB] min-h-screen pb-20 text-[#0A2540] relative">
 {/* Hero Header */}
 <div className="bg-white border-b border-[#E3E8EF] relative z-20">
 <div className="max-w-7xl mx-auto px-4 py-8">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <p className="text-sm font-semibold text-black mb-1 font-sans">Exam Command Center</p>
 <h1 className="text-3xl font-bold text-[#0A2540] font-sans">
 Hi, {user?.name?.split(' ')[0] || 'Student'} 👋
 </h1>
 <p className="text-[#697386] mt-1 font-sans text-sm">Here is your daily academic status and checklist.</p>
 </div>
 
 <div className="flex items-center gap-3">
 {/* Notification Bell */}
 <div className="relative">
 <button 
 onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
 className="w-10 h-10 rounded-xl bg-slate-50 border border-[#E3E8EF] flex items-center justify-center hover:bg-slate-100 transition-colors relative cursor-pointer"
 >
 <Bell size={18} className="text-[#425466]"/>
 {unreadCount > 0 && (
 <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
 {unreadCount}
 </span>
 )}
 </button>

 {/* Notifications Dropdown */}
 {showNotificationsPanel && (
 <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-[#E3E8EF] shadow-xl z-50 p-4 animate-slide-up">
 <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#E3E8EF]">
 <h3 className="font-bold text-sm">Alerts Log</h3>
 <div className="flex gap-2">
 <button onClick={markAllAsRead} className="text-[10px] text-black font-semibold hover:underline cursor-pointer">Read All</button>
 <button onClick={clearAll} className="text-[10px] text-red-500 font-semibold hover:underline cursor-pointer">Clear</button>
 </div>
 </div>
 <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
 {notifications.length === 0 ? (
 <div className="text-center py-6 text-xs text-[#9DA6B4]">No new alerts. Track exams to get updates.</div>
 ) : (
 notifications.map(n => (
 <div key={n.id} className={`p-3 rounded-xl border text-xs flex gap-2 relative transition-all ${n.read ? 'bg-[#F6F7FB] border-[#E3E8EF] opacity-70' : 'bg-slate-100/50 border-slate-300'}`}>
 <div className="flex-1">
 <div className="font-bold text-[#0A2540] flex items-center gap-1.5">
 {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-black inline-block shrink-0"></span>}
 {n.title}
 </div>
 <p className="text-[#697386] mt-0.5 leading-relaxed">{n.message}</p>
 </div>
 {!n.read && (
 <button 
 onClick={() => markAsRead(n.id)}
 className="text-[10px] text-black font-bold self-start cursor-pointer hover:underline"
 >
 Read
 </button>
 )}
 </div>
 ))
 )}
 </div>
 </div>
 )}
 </div>

 <button
 onClick={() => navigate('/onboarding')}
 className="btn-secondary text-sm shrink-0 font-sans"
 >
 Update Preferences
 </button>
 </div>
 </div>

 {/* Quick Stats Grid */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
 {[
 { icon: Sparkles, label: 'Profile Complete', value: `${profileCompletion.score}%`, color: 'text-black', bg: 'bg-slate-100' },
 { icon: Bookmark, label: 'Saved Colleges', value: savedColleges.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
 { icon: Target, label: 'Tracked Exams', value: trackedExamsData.length, color: 'text-orange-600', bg: 'bg-orange-50' },
 { icon: TrendingUp, label: 'Profile Score', value: `${profileCompletion.score}/100`, color: 'text-slate-800', bg: 'bg-blue-50' },
 ].map(({ icon: Icon, label, value, color, bg }) => (
 <div key={label} className="sz-card p-4 flex items-center gap-3">
 <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
 <Icon size={20} className={color} />
 </div>
 <div className="min-w-0">
 <div className="text-xl font-bold text-[#0A2540] truncate font-sans">{value}</div>
 <div className="text-xs text-[#697386] font-medium truncate font-sans">{label}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 py-8">
 
 {/* Main Grid: Command Center Widgets */}
 <div className="grid lg:grid-cols-3 gap-8">
 
 {/* LEFT 2/3 COLUMN */}
 <div className="lg:col-span-2 space-y-8">
 
 {/* Profile Completion Card */}
 <div className="studzens-card p-6 flex flex-col md:flex-row items-center gap-6">
 {/* Progress Arc */}
 <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
 <svg className="w-full h-full transform -rotate-90">
 <circle cx="64" cy="64" r="54" stroke="#F0F2F8" strokeWidth="8" fill="transparent"/>
 <circle 
 cx="64" cy="64" r="54"
 stroke="#0A2540" strokeWidth="8" fill="transparent"
 strokeDasharray={2 * Math.PI * 54}
 strokeDashoffset={2 * Math.PI * 54 * (1 - profileCompletion.score / 100)}
 strokeLinecap="round"
 className="transition-all duration-1000 ease-out"
 />
 </svg>
 <div className="absolute flex flex-col items-center justify-center text-center">
 <span className="text-2xl font-black text-[#0A2540] font-sans">{profileCompletion.score}</span>
 <span className="text-[10px] text-[#697386] font-bold uppercase tracking-wider">/ 100</span>
 </div>
 </div>

 {/* Breakdown */}
 <div className="flex-1 space-y-2 w-full">
 <div className="flex items-center justify-between">
 <h3 className="font-bold text-base font-sans flex items-center gap-2"><User size={16}/>Profile Completed</h3>
 <Link to="/profile" className="text-xs font-bold text-black hover:underline">Edit Profile →</Link>
 </div>
 <p className="text-sm text-[#697386] leading-relaxed font-sans">
 Complete your profile to unlock accurate college matches and exam suggestions.
 </p>
 <div className="pt-1 space-y-1.5">
 {profileCompletion.breakdown.map(item => (
 <div key={item.label} className="flex items-center justify-between text-xs bg-[#F6F7FB] border border-[#E3E8EF] p-2.5 rounded-xl font-sans">
 <span className={`flex items-center gap-1.5 font-semibold ${item.done ? 'text-emerald-700' : 'text-[#425466]'}`}>
 {item.done
 ? <CheckCircle size={13} className="text-emerald-500"/>
 : <AlertTriangle size={13} className="text-amber-400"/>}
 {item.label}
 </span>
 <span className={`font-bold text-[10px] px-1.5 py-0.5 rounded-full ${item.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>+{item.pts}pts</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Exam Countdown Tracker */}
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <Clock size={20} className="text-[#697386]"/> My Exam Tracker
 </h2>
 <Link to="/exams"className="btn-ghost text-sm font-sans">
 Configure Pinned Exams <ArrowRight size={15} />
 </Link>
 </div>

 {trackedExamsData.length === 0 ? (
 <div className="studzens-card p-10 text-center">
 <CalendarClock size={32} className="mx-auto text-[#9DA6B4] mb-3"/>
 <h3 className="font-bold text-[#0A2540] mb-1 font-sans">No entrance exams pinned</h3>
 <p className="text-sm text-[#697386] mb-4 font-sans">Pin exams from the hub to populate countdown timers and tracking deadlines.</p>
 <Link to="/exams"className="btn-primary text-sm font-sans">
 Browse Exams
 </Link>
 </div>
 ) : (
 <div className="space-y-4">
 {trackedExamsData.map(exam => {
 const nextEvents = [
 { label: 'Reg. Starts', date: exam.importantDates.registrationStart },
 { label: 'Reg. Closes', date: exam.importantDates.registrationEnd },
 { label: 'Exam Date', date: exam.importantDates.examStart },
 { label: 'Result Date', date: exam.importantDates.resultExpected }
 ].map(e => ({ ...e, days: calculateDays(e.date) }))
 .filter(e => e.days > 0)
 .sort((a, b) => a.days - b.days);

 const nextMilestone = nextEvents[0];

 return (
 <div key={exam.id} className="studzens-card p-6 flex flex-col md:flex-row gap-6">
 <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-[#E3E8EF] pb-4 md:pb-0 pr-5 flex flex-col justify-between">
 <div>
 <span className="sz-chip text-xs mb-2 inline-flex">{exam.category}</span>
 <h3 className="font-bold text-[#0A2540] text-lg font-sans leading-snug">{exam.name}</h3>
 <p className="text-xs text-[#697386] mt-0.5 font-sans leading-snug">{exam.fullName}</p>
 </div>
 <Link to={`/exams/${exam.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-black mt-4 hover:underline font-sans">
 Detailed Exam Hub Profile <ArrowRight size={12} />
 </Link>
 </div>
 <div className="md:w-2/3 flex flex-col justify-between">
 <div className="grid grid-cols-3 gap-3">
 {[
 { label: 'Reg. Deadline', value: calculateDays(exam.importantDates.registrationEnd), date: exam.importantDates.registrationEnd },
 { label: 'Exam Starts', value: calculateDays(exam.importantDates.examStart), date: exam.importantDates.examStart },
 { label: 'Expected Result', value: calculateDays(exam.importantDates.resultExpected), date: exam.importantDates.resultExpected },
 ].map(({ label, value }) => (
 <div key={label} className="bg-[#F6F7FB] rounded-xl p-3 border border-[#E3E8EF] font-sans">
 <div className="text-[10px] font-bold text-[#9DA6B4] uppercase tracking-wider mb-1">{label}</div>
 <div className="text-lg font-black text-[#0A2540]">{value}</div>
 <div className="text-[10px] text-[#697386]">days remaining</div>
 </div>
 ))}
 </div>
 
 {nextMilestone && (
 <div className="mt-4 bg-slate-100 rounded-xl p-3 border border-slate-300 text-xs font-semibold text-black flex items-center justify-between font-sans">
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
 <div className="studzens-card p-6 space-y-5">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3E8EF]">
 <h3 className="font-bold text-lg flex items-center gap-2 font-sans">
 <CalendarIcon className="text-black"/> My Academic Calendar
 </h3>
 <div className="flex items-center gap-2 flex-wrap">
 {/* Google Calendar sync */}
 <a
 href={buildGoogleCalendarUrl()}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#E3E8EF] bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-[#0A2540]"
 title="Add events to Google Calendar"
 >
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
 </svg>
 Google
 <ExternalLink size={11} className="text-slate-400"/>
 </a>
 {/* Apple/ICS download */}
 <button
 onClick={handleDownloadICS}
 className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#E3E8EF] bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-[#0A2540]"
 title="Download .ics for Apple Calendar / Outlook"
 >
 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
 </svg>
 Apple / ICS
 </button>
 {/* Month nav */}
 <div className="flex items-center gap-1">
 <button onClick={handlePrevMonth} className="p-1.5 hover:bg-[#F6F7FB] border border-[#E3E8EF] rounded-lg cursor-pointer transition-colors"><ChevronLeft size={16} /></button>
 <span className="font-bold text-sm min-w-[120px] text-center font-sans">{calMonthLabel}</span>
 <button onClick={handleNextMonth} className="p-1.5 hover:bg-[#F6F7FB] border border-[#E3E8EF] rounded-lg cursor-pointer transition-colors"><ChevronRight size={16} /></button>
 </div>
 </div>
 </div>

 {/* Exam Filters */}
 {profile.trackedExams.length > 0 && (
 <div className="flex flex-wrap gap-2 text-xs font-sans">
 {profile.trackedExams.map(id => {
 const exam = exams.find(e => e.id === id);
 if (!exam) return null;
 const selected = selectedCalExams.includes(id);
 return (
 <button
 key={id}
 onClick={() => setSelectedCalExams(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
 className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer font-semibold ${selected ? 'bg-slate-100 border-[#635BFF] text-black' : 'bg-white border-[#E3E8EF] text-[#697386]'}`}
 >
 {exam.name}
 </button>
 );
 })}
 </div>
 )}

 {/* Calendar Grid */}
 <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#697386] font-sans">
 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
 <div key={d} className="py-2 text-[10px] font-bold uppercase tracking-wider">{d}</div>
 ))}
 {calRows.map((row, rIdx) => 
 row.map((cell, cIdx) => {
 const eventsOnDay = cell.day ? getEventsForDate(cell.dateStr) : [];
 const isToday = cell.day && todayDateStr === new Date(calYear, calMonth, cell.day).toDateString();
 return (
 <div 
 key={`${rIdx}-${cIdx}`} 
 className={`min-h-[60px] rounded-xl border p-1.5 flex flex-col justify-between transition-all ${
 cell.day ? 'bg-white border-[#E3E8EF]' : 'bg-[#F6F7FB] border-transparent'
 } ${isToday ? 'ring-2 ring-black border-transparent' : ''}`}
 >
 {cell.day ? (
 <div className="flex justify-between items-center">
 <span className={`text-[10px] font-bold flex items-center justify-center w-5 h-5 rounded-full ${isToday ? 'bg-black text-white' : 'text-[#0A2540]'}`}>
 {cell.day}
 </span>
 {eventsOnDay.length > 0 && (
 <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
 )}
 </div>
 ) : <div />}
 
 {/* Event Tags */}
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
 <div className="text-[7px] text-right font-black text-[#9DA6B4] uppercase pr-1">+{eventsOnDay.length - 1} more</div>
 )}
 </div>
 );
 })
 )}
 </div>
 </div>

  {/* For You shortcut card */}
  <div className="studzens-card p-5 flex items-center gap-4">
  <div className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
  <Sparkles size={22} className="text-[#0A2540]"/>
  </div>
  <div className="flex-1 min-w-0">
  <h3 className="font-bold text-[#0A2540] font-sans">Personalised College Picks</h3>
  <p className="text-xs text-[#697386] font-sans mt-0.5">See colleges ranked just for you based on your profile.</p>
  </div>
  <Link to="/for-you" className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-white bg-[#0A2540] px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors">
  View <ArrowRight size={14}/>
  </Link>
  </div>
 </div>

 {/* RIGHT 1/3 SIDEBAR */}
 <div className="space-y-8">
 
 {/* Today's Academic Priorities */}
 <div className="studzens-card p-6 space-y-4">
 <h3 className="font-bold text-base flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-3">
 <CheckSquare className="text-black"size={20} /> Today's Priorities
 </h3>
 <div className="space-y-3">
 {priorities.map(p => (
 <button 
 key={p.id}
 onClick={() => handleTogglePriority(p.id)}
 className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-[#F6F7FB] transition-all cursor-pointer font-sans text-xs border border-transparent hover:border-[#E3E8EF]"
 >
 <span className="mt-0.5 shrink-0 text-black">
 {p.done ? <CheckCircle size={16} /> : <Square size={16} />}
 </span>
 <span className={`leading-relaxed ${p.done ? 'line-through text-[#9DA6B4] font-medium' : 'text-[#425466] font-bold'}`}>
 {p.text}
 </span>
 </button>
 ))}
 </div>
 </div>

 {/* Suggested Exams For You */}
 <div className="studzens-card p-6 space-y-4">
 <h3 className="font-bold text-base flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-3">
 <BookOpen className="text-black"size={20} /> Suggested Exams
 </h3>
 <div className="space-y-3.5">
 {suggestedExams.length === 0 ? (
 <div className="text-center py-6 text-xs text-[#9DA6B4] font-sans">No suggestions. Set stream in profile first.</div>
 ) : (
 suggestedExams.map(ex => (
 <div key={ex.id} className="p-3 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl flex flex-col justify-between gap-2.5 font-sans">
 <div>
 <div className="flex justify-between items-center">
 <span className="sz-chip text-[10px] px-2 py-0.5">{ex.category}</span>
 <span className="text-[10px] text-[#697386] font-bold uppercase">{ex.level}</span>
 </div>
 <h4 className="font-bold text-[#0A2540] text-sm mt-1">{ex.name}</h4>
 <p className="text-[11px] text-[#697386] mt-0.5 line-clamp-2 leading-relaxed">{ex.description}</p>
 </div>
 <Link to={`/exams/${ex.id}`} className="text-xs text-black font-bold hover:underline self-end">
 View Exam Intel →
 </Link>
 </div>
 ))
 )}
 </div>
 </div>

 {/* Quick Navigation Panels */}
 <div className="studzens-card overflow-hidden divide-y divide-[#E3E8EF]">
 {[
 { icon: GraduationCap, label: 'Explore Colleges', sub: `${colleges.length} colleges listed`, path: '/search', color: 'text-black', bg: 'bg-slate-100' },
 { icon: BookOpen, label: 'Exam Hub', sub: 'Track deadlines', path: '/exams', color: 'text-orange-600', bg: 'bg-orange-50' },
 { icon: MapPin, label: 'Compare Colleges', sub: 'Side-by-side analysis', path: '/compare', color: 'text-slate-800', bg: 'bg-blue-50' },
 ].map(({ icon: Icon, label, sub, path, color, bg }) => (
 <Link key={path} to={path} className="flex items-center gap-3 p-4 hover:bg-[#F6F7FB] transition-colors group">
 <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
 <Icon size={18} className={color} />
 </div>
 <div className="flex-1 min-w-0">
 <div className="font-semibold text-sm text-[#0A2540] font-sans">{label}</div>
 <div className="text-xs text-[#697386] font-sans">{sub}</div>
 </div>
 <ArrowRight size={16} className="text-[#9DA6B4] group-hover:text-black transition-colors shrink-0"/>
 </Link>
 ))}
 </div>

 </div>

 </div>

 </div>
 </div>
 );
}
