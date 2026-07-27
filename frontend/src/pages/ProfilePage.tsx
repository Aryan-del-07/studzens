import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {

/**
 * ProfilePage.tsx
 *
 * WHAT THIS FILE DOES:
 * Lets students view and edit their academic profile, preferences,
 * exam scores, and shortlist. Shows a profile strength indicator.
 *
 * WHY IT EXISTS:
 * Students need to update their information as their situation changes
 * (e.g., after taking an exam, changing stream, updating marks).
 *
 * KEY CONCEPTS:
 * - Profile strength ring: Visual indicator of how complete the profile is
 * - Editable form sections with save/cancel buttons
 * - Bookmarked colleges section with quick links
 * - Tracked exams section with score editing
 * - Tabbed navigation for different profile sections
 */
 LogOut, Settings, Home, Search, Users,
 Target, TrendingUp, Bell, MapPin, Wallet, GraduationCap,
 ChevronRight, ArrowRight, Star, Shield, Clock, Calendar,
 CheckCircle2, Circle, AlertCircle, Bookmark, X, BarChart2,
 Zap, Award, Edit3, Plus, ExternalLink, Trophy, Flame
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStudentProfile } from '../contexts/StudentProfileContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { colleges } from '../api/mocks/colleges';
import { exams } from '../api/mocks/exams';
import type { FitType } from '../contexts/BookmarkContext';

/* ─────────────────────────────────────────────────────────
 NAV CONFIG
───────────────────────────────────────────────────────── */
const NAV_ITEMS = [
 { icon: Home, label: 'Home', path: '/dashboard' },
 { icon: Search, label: 'Colleges', path: '/search' },
 { icon: GraduationCap, label: 'Exams', path: '/exams' },
 { icon: Users, label: 'Community', path: '/community' },
];

/* ─────────────────────────────────────────────────────────
 TYPES
───────────────────────────────────────────────────────── */
type Tab = 'overview' | 'colleges' | 'exams' | 'career' | 'settings';

const FIT_CONFIG: Record<FitType, { label: string; color: string; dot: string }> = {
 Dream: { label: 'Dream', color: 'text-purple-700 bg-purple-50 border-purple-200', dot: 'bg-purple-500' },
 Target: { label: 'Target', color: 'text-slate-900 bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
 Safe: { label: 'Safe', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
 Uncategorized: { label: 'Saved', color: 'text-slate-600 bg-slate-100 border-slate-200', dot: 'bg-slate-400' },
};

/* ─────────────────────────────────────────────────────────
 HELPER
───────────────────────────────────────────────────────── */
function daysUntil(dateStr: string) {
 const d = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
 return d > 0 ? d : 0;
}
function urgencyColor(days: number) {
 if (days <= 7) return 'text-red-600 bg-red-50 border-red-200';
 if (days <= 30) return 'text-amber-600 bg-amber-50 border-amber-200';
 return 'text-emerald-700 bg-emerald-50 border-emerald-200';
}

/* ─────────────────────────────────────────────────────────
 SUB-COMPONENTS
───────────────────────────────────────────────────────── */
function SectionHeader({ icon: Icon, title, action }: {
 icon: React.ElementType; title: string; action?: { label: string; path: string };
}) {
 return (
 <div className="flex items-center justify-between mb-5">
 <h2 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
 <Icon size={17} className="text-black"/>
 {title}
 </h2>
 {action && (
 <Link to={action.path} className="text-xs font-semibold text-black hover:underline flex items-center gap-1">
 {action.label} <ChevronRight size={13} />
 </Link>
 )}
 </div>
 );
}

function EmptyState({ icon: Icon, title, desc, cta }: {
 icon: React.ElementType; title: string; desc: string; cta?: { label: string; path: string };
}) {
 return (
 <div className="border-2 border-dashed border-[#E3E8EF] rounded-xl p-8 text-center">
 <Icon size={28} className="mx-auto text-[#C7D0DE] mb-3"/>
 <p className="font-semibold text-[#425466] text-sm">{title}</p>
 <p className="text-[#9DA6B4] text-xs mt-1 mb-4">{desc}</p>
 {cta && (
 <Link to={cta.path} className="btn-primary text-xs py-2 px-4 inline-flex">
 {cta.label} <ArrowRight size={13} />
 </Link>
 )}
 </div>
 );
}

/* ─────────────────────────────────────────────────────────
 OVERVIEW TAB
───────────────────────────────────────────────────────── */
function OverviewTab({ profile, savedColleges, navigate }: {
 profile: ReturnType<typeof useStudentProfile>['profile'];
 savedColleges: ReturnType<typeof useBookmarks>['savedColleges'];
 navigate: ReturnType<typeof useNavigate>;
}) {
 const acad = profile.academicProfile;
 const prefs = profile.preferences as any;

 // Profile completeness
 const checks = [
 !!acad?.currentClass,
 !!acad?.board,
 (acad?.marks12 ?? 0) > 0,
 Object.keys(profile.examScores || {}).length > 0,
 (prefs?.preferredStates || []).length > 0,
 profile.targetCareers.length > 0,
 savedColleges.length > 0,
 profile.trackedExams.length > 0,
 ];
 const pct = Math.round((checks.filter(Boolean).length / checks.length) * 100);

 // Upcoming deadlines (next 90 days)
 const deadlines = exams
 .filter(e => profile.trackedExams.includes(e.id))
 .flatMap(e => [
 { label: `${e.name} Registration Closes`, date: e.importantDates.registrationEnd, examName: e.name, id: e.id + '-reg' },
 { label: `${e.name} Exam Date`, date: e.importantDates.examStart, examName: e.name, id: e.id + '-exam' },
 ])
 .filter(d => daysUntil(d.date) > 0 && daysUntil(d.date) <= 90)
 .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
 .slice(0, 5);

 // AI Insights
 const insights: { icon: React.ElementType; color: string; text: string }[] = [];
 if ((acad?.marks12 ?? 0) >= 90) insights.push({ icon: Trophy, color: 'text-amber-500', text: 'Your 90%+ marks make you eligible for top-tier private colleges like BITS and Manipal.' });
 if (profile.trackedExams.includes('jee-main')) insights.push({ icon: Zap, color: 'text-black', text: 'JEE Main is coming up. Focus on Maths and Physics — they carry the highest weightage.' });
 if (savedColleges.length === 0) insights.push({ icon: Star, color: 'text-yellow-500', text: 'Start saving colleges to build your application list. Aim for 8-10 colleges across tiers.' });
 if ((prefs?.preferredStates || []).length === 0) insights.push({ icon: MapPin, color: 'text-blue-500', text: 'Add preferred states in your profile to see location-specific college matches.' });
 if (insights.length === 0) insights.push({ icon: Award, color: 'text-emerald-500', text: 'Great profile! Explore the Colleges tab to find more matches based on your scores.' });

 // Stats
 const stats = [
 { label: 'Profile Score', value: `${pct}%`, icon: TrendingUp, color: 'text-black', bg: 'bg-slate-100' },
 { label: 'Saved Colleges', value: savedColleges.length, icon: Bookmark, color: 'text-slate-800', bg: 'bg-blue-50' },
 { label: 'Pinned Exams', value: profile.trackedExams.length, icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-50' },
 { label: 'Career Goals', value: profile.targetCareers.length, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
 ];

 return (
 <div className="space-y-6">
 {/* Profile Completeness */}
 <div className="sz-card p-6">
 <div className="flex items-center justify-between mb-4">
 <div>
 <h2 className="font-bold text-[#0A2540]">Profile Completeness</h2>
 <p className="text-xs text-[#697386] mt-0.5">Complete your profile to get better recommendations</p>
 </div>
 <div className="text-right">
 <div className="text-3xl font-black text-black">{pct}%</div>
 <div className="text-xs text-[#9DA6B4]">complete</div>
 </div>
 </div>
 <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
 <div
 className="h-full bg-gradient-to-r from-black to-slate-800 rounded-full transition-all duration-700"
 style={{ width: `${pct}%` }}
 />
 </div>
 {pct < 100 && (
 <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
 {[
 { label: 'Class & Board', done: checks[0] && checks[1] },
 { label: '12th Marks', done: checks[2] },
 { label: 'Exam Scores', done: checks[3] },
 { label: 'Career Goals', done: checks[5] },
 ].map(({ label, done }) => (
 <div key={label} className={`flex items-center gap-1.5 text-xs font-medium ${done ? 'text-[#0BBF8A]' : 'text-[#9DA6B4]'}`}>
 {done ? <CheckCircle2 size={13} /> : <Circle size={13} />}
 {label}
 </div>
 ))}
 </div>
 )}
 <button onClick={() => navigate('/onboarding')} className="btn-secondary text-xs py-2 px-4 mt-4 inline-flex">
 <Edit3 size={12} /> Update Profile
 </button>
 </div>

 {/* Stats Grid */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 {stats.map(({ label, value, icon: Icon, color, bg }) => (
 <div key={label} className="sz-card p-4 flex items-center gap-3">
 <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
 <Icon size={18} className={color} />
 </div>
 <div>
 <div className="text-2xl font-bold text-[#0A2540]">{value}</div>
 <div className="text-xs text-[#697386] font-medium leading-tight">{label}</div>
 </div>
 </div>
 ))}
 </div>

 <div className="grid lg:grid-cols-2 gap-6">
 {/* Academic Snapshot */}
 <div className="sz-card p-6">
 <SectionHeader icon={BarChart2} title="Academic Snapshot"action={{ label: 'Edit', path: '/onboarding' }} />
 {acad && Object.keys(acad).length > 0 ? (
 <div className="space-y-4">
 <div className="grid grid-cols-3 gap-3">
 {[
 { label: '10th', value: acad.marks10 },
 { label: '11th', value: acad.marks11 },
 { label: '12th', value: acad.marks12 },
 ].map(({ label, value }) => (
 <div key={label} className="bg-[#F6F7FB] rounded-xl p-3 text-center border border-[#E3E8EF]">
 <div className="text-xl font-black text-[#0A2540]">
 {value ? `${value}%` : '—'}
 </div>
 <div className="text-xs text-[#697386] font-medium">{label}</div>
 </div>
 ))}
 </div>
 <div className="grid grid-cols-2 gap-3 text-sm">
 {[
 { label: 'Board', value: acad.board },
 { label: 'Stream', value: acad.stream },
 { label: 'Class', value: acad.currentClass },
 { label: 'Category', value: acad.category },
 ].map(({ label, value }) => value && (
 <div key={label} className="flex items-center justify-between py-2 border-b border-[#F0F2F8]">
 <span className="text-[#697386] text-xs font-medium">{label}</span>
 <span className="font-semibold text-[#0A2540] text-xs">{value}</span>
 </div>
 ))}
 </div>
 </div>
 ) : (
 <EmptyState icon={BarChart2} title="No marks added"desc="Add your academic details"cta={{ label: 'Add Now', path: '/onboarding' }} />
 )}
 </div>

 {/* AI Insights */}
 <div className="sz-card p-6">
 <SectionHeader icon={Zap} title="AI Insights"/>
 <div className="space-y-3">
 {insights.map(({ icon: Icon, color, text }, i) => (
 <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F7FB] border border-[#E3E8EF]">
 <Icon size={16} className={`${color} shrink-0 mt-0.5`} />
 <p className="text-sm text-[#425466] leading-relaxed">{text}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Upcoming Deadlines */}
 <div className="sz-card p-6">
 <SectionHeader icon={Calendar} title="Upcoming Deadlines"action={{ label: 'All Exams', path: '/exams' }} />
 {deadlines.length === 0 ? (
 <EmptyState icon={Calendar} title="No deadlines tracked"desc="Pin exams to see their deadlines here"cta={{ label: 'Browse Exams', path: '/exams' }} />
 ) : (
 <div className="space-y-3">
 {deadlines.map(d => {
 const days = daysUntil(d.date);
 return (
 <div key={d.id} className="flex items-center gap-4 py-3 border-b border-[#F0F2F8] last:border-0">
 <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border shrink-0 ${urgencyColor(days)}`}>
 {days}d
 </div>
 <div className="flex-1 min-w-0">
 <p className="font-semibold text-[#0A2540] text-sm truncate">{d.label}</p>
 <p className="text-xs text-[#697386]">
 {new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
 </p>
 </div>
 {days <= 7 && (
 <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-200 shrink-0">
 <AlertCircle size={11} /> Urgent
 </div>
 )}
 </div>
 );
 })}
 </div>
 )}
 </div>

 {/* Admission Progress */}
 <div className="sz-card p-6">
 <SectionHeader icon={CheckCircle2} title="Admission Checklist"/>
 <div className="grid sm:grid-cols-2 gap-3">
 {[
 { label: 'Research colleges', done: savedColleges.length > 0 },
 { label: 'Fill academic details', done: (acad?.marks12 ?? 0) > 0 },
 { label: 'Add exam scores', done: Object.keys(profile.examScores || {}).length > 0 },
 { label: 'Set preferred states', done: (prefs?.preferredStates || []).length > 0 },
 { label: 'Pin target exams', done: profile.trackedExams.length > 0 },
 { label: 'Define career goals', done: profile.targetCareers.length > 0 },
 { label: 'Save 5+ colleges', done: savedColleges.length >= 5 },
 { label: 'Review college comparisons', done: false },
 ].map(({ label, done }) => (
 <div key={label} className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-colors ${
 done ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-[#F6F7FB] border-[#E3E8EF] text-[#425466]'
 }`}>
 {done
 ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0"/>
 : <Circle size={16} className="text-[#C7D0DE] shrink-0"/>}
 {label}
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}

/* ─────────────────────────────────────────────────────────
 COLLEGES TAB
───────────────────────────────────────────────────────── */
function CollegesTab({ savedColleges, updateFit, removeCollege }: {
 savedColleges: ReturnType<typeof useBookmarks>['savedColleges'];
 updateFit: (id: string, fit: FitType) => void;
 removeCollege: (id: string) => void;
}) {
 const byFit: Record<FitType, typeof savedColleges> = {
 Dream: savedColleges.filter(c => c.fit === 'Dream'),
 Target: savedColleges.filter(c => c.fit === 'Target'),
 Safe: savedColleges.filter(c => c.fit === 'Safe'),
 Uncategorized: savedColleges.filter(c => c.fit === 'Uncategorized'),
 };

 const FIT_FITS: FitType[] = ['Dream', 'Target', 'Safe', 'Uncategorized'];

 if (savedColleges.length === 0) {
 return (
 <div className="sz-card p-12">
 <EmptyState
 icon={Bookmark}
 title="No colleges saved yet"
 desc="Start saving colleges to build your application list. Aim for 8-10 colleges across tiers."
 cta={{ label: 'Explore Colleges', path: '/search' }}
 />
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* Summary bar */}
 <div className="sz-card p-5">
 <div className="flex flex-wrap gap-6">
 {FIT_FITS.map(fit => {
 const cfg = FIT_CONFIG[fit];
 return (
 <div key={fit} className="flex items-center gap-2">
 <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
 <span className="text-sm font-semibold text-[#0A2540]">{byFit[fit].length}</span>
 <span className="text-xs text-[#697386]">{cfg.label}</span>
 </div>
 );
 })}
 </div>
 </div>

 {/* Groups */}
 {FIT_FITS.filter(fit => byFit[fit].length > 0).map(fit => {
 const cfg = FIT_CONFIG[fit];
 return (
 <div key={fit}>
 <div className="flex items-center gap-2 mb-3">
 <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
 <h3 className="text-sm font-bold text-[#425466] uppercase tracking-wider">{cfg.label} Colleges</h3>
 <span className="text-xs text-[#9DA6B4]">({byFit[fit].length})</span>
 </div>
 <div className="space-y-3">
 {byFit[fit].map(saved => {
 const college = colleges.find(c => c.id === saved.collegeId);
 if (!college) return null;
 return (
 <div key={saved.collegeId} className="sz-card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
 <GraduationCap size={18} className="text-black"/>
 </div>
 <div className="flex-1 min-w-0">
 <Link to={`/college/${college.id}`} className="font-bold text-[#0A2540] text-sm hover:text-black transition-colors truncate block">
 {college.name}
 </Link>
 <div className="flex items-center gap-3 text-xs text-[#697386] mt-0.5">
 <span className="flex items-center gap-1"><MapPin size={10} />{college.city}, {college.state}</span>
 <span className="flex items-center gap-1"><Wallet size={10} />₹{college.annualFeeLpa}L/yr</span>
 <span className="flex items-center gap-1"><Shield size={10} />{college.tier}</span>
 </div>
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <select
 value={saved.fit}
 onChange={e => updateFit(saved.collegeId, e.target.value as FitType)}
 className="text-xs font-semibold border border-[#E3E8EF] rounded-lg px-2 py-1.5 bg-white text-[#425466] outline-none cursor-pointer"
 >
 {FIT_FITS.map(f => <option key={f} value={f}>{f}</option>)}
 </select>
 <Link to={`/college/${college.id}`} className="p-1.5 text-[#9DA6B4] hover:text-black transition-colors">
 <ExternalLink size={14} />
 </Link>
 <button onClick={() => removeCollege(saved.collegeId)} className="p-1.5 text-[#9DA6B4] hover:text-red-500 transition-colors">
 <X size={14} />
 </button>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
 })}

 <Link to="/search"className="btn-secondary text-sm inline-flex">
 <Plus size={15} /> Add More Colleges
 </Link>
 </div>
 );
}

/* ─────────────────────────────────────────────────────────
 EXAMS TAB
───────────────────────────────────────────────────────── */
function ExamsTab({ profile, untrackExam }: {
 profile: ReturnType<typeof useStudentProfile>['profile'];
 untrackExam: (id: string) => void;
}) {
 const tracked = exams.filter(e => profile.trackedExams.includes(e.id));

 return (
 <div className="space-y-6">
 {/* Exam Scores */}
 {Object.keys(profile.examScores || {}).length > 0 && (
 <div className="sz-card p-6">
 <SectionHeader icon={Award} title="My Exam Scores"action={{ label: 'Update', path: '/onboarding' }} />
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {Object.entries(profile.examScores).map(([examId, scoreData]) => {
 const exam = exams.find(e => e.id === examId);
 const val = scoreData.percentile ?? scoreData.score ?? scoreData.rank;
 const unit = scoreData.percentile ? 'percentile' : scoreData.rank ? 'rank' : 'score';
 return (
 <div key={examId} className="bg-[#F6F7FB] rounded-xl p-4 border border-[#E3E8EF]">
 <div className="sz-chip text-[10px] mb-2 inline-flex">{exam?.category || 'Exam'}</div>
 <div className="font-bold text-[#0A2540]">{exam?.name || examId.toUpperCase()}</div>
 <div className="text-3xl font-black text-black mt-2">{val ?? '—'}</div>
 <div className="text-xs text-[#697386] capitalize">{unit}</div>
 </div>
 );
 })}
 </div>
 </div>
 )}

 {/* Pinned Exams */}
 <div className="sz-card p-6">
 <SectionHeader icon={Clock} title="Pinned Exams"action={{ label: 'Browse All', path: '/exams' }} />
 {tracked.length === 0 ? (
 <EmptyState icon={GraduationCap} title="No exams pinned"desc="Pin exams to track their key dates and countdowns"cta={{ label: 'Go to Exam Hub', path: '/exams' }} />
 ) : (
 <div className="space-y-4">
 {tracked.map(exam => {
 const regDays = daysUntil(exam.importantDates.registrationEnd);
 const examDays = daysUntil(exam.importantDates.examStart);
 return (
 <div key={exam.id} className="border border-[#E3E8EF] rounded-2xl p-5 bg-white">
 <div className="flex items-start justify-between gap-3 mb-4">
 <div>
 <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border inline-block mb-1.5 ${
 exam.category === 'Engineering' ? 'bg-blue-50 text-slate-900 border-blue-200' :
 exam.category === 'Medical' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
 'bg-amber-50 text-amber-700 border-amber-200'
 }`}>{exam.category}</span>
 <h3 className="font-bold text-[#0A2540]">{exam.name}</h3>
 <p className="text-xs text-[#697386]">{exam.fullName}</p>
 </div>
 <button
 onClick={() => untrackExam(exam.id)}
 className="text-[#9DA6B4] hover:text-red-500 transition-colors p-1"
 title="Unpin exam"
 >
 <X size={16} />
 </button>
 </div>

 <div className="grid grid-cols-3 gap-3">
 {[
 { label: 'Reg. Closes', days: regDays, date: exam.importantDates.registrationEnd },
 { label: 'Exam In', days: examDays, date: exam.importantDates.examStart },
 { label: 'Result', days: null, date: exam.importantDates.resultExpected },
 ].map(({ label, days, date }) => (
 <div key={label} className={`rounded-xl p-3 border text-center ${
 days !== null ? urgencyColor(days) : 'bg-[#F6F7FB] border-[#E3E8EF] text-[#697386]'
 }`}>
 <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">{label}</div>
 <div className="text-xl font-black">{days !== null ? `${days}` : '—'}</div>
 <div className="text-[10px]">{days !== null ? 'days' : new Date(date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
 </div>
 ))}
 </div>

 <div className="flex gap-3 mt-4">
 <Link to={`/exams/${exam.id}`} className="btn-ghost text-xs">
 Full Details <ArrowRight size={12} />
 </Link>
 <a href={exam.officialWebsite} target="_blank"rel="noopener noreferrer"className="btn-ghost text-xs text-[#697386]">
 Official Site <ExternalLink size={12} />
 </a>
 </div>
 </div>
 );
 })}
 </div>
 )}
 </div>
 </div>
 );
}

/* ─────────────────────────────────────────────────────────
 CAREER TAB
───────────────────────────────────────────────────────── */
function CareerTab({ profile, untargetCareer }: {
 profile: ReturnType<typeof useStudentProfile>['profile'];
 untargetCareer: (id: string) => void;
}) {
 const ROADMAP_STEPS: Record<string, { step: string; label: string; done: boolean }[]> = {
 'Software Engineering': [
 { step: '1', label: 'Complete 12th with strong Maths', done: (profile.academicProfile?.marks12 ?? 0) > 0 },
 { step: '2', label: 'Clear JEE Main / BITSAT', done: !!profile.examScores?.['jee-main'] || !!profile.examScores?.['bitsat'] },
 { step: '3', label: 'Enroll in B.Tech CS program', done: false },
 { step: '4', label: 'Build portfolio projects', done: false },
 { step: '5', label: 'Land internship', done: false },
 { step: '6', label: 'Graduate & get placed', done: false },
 ],
 'Medicine / MBBS': [
 { step: '1', label: 'Complete 12th PCB with 70%+', done: (profile.academicProfile?.marks12 ?? 0) > 0 },
 { step: '2', label: 'Clear NEET UG', done: !!profile.examScores?.['neet'] },
 { step: '3', label: 'MBBS (5.5 years)', done: false },
 { step: '4', label: 'Internship (1 year)', done: false },
 { step: '5', label: 'PG Entrance / Practice', done: false },
 ],
 'Law': [
 { step: '1', label: 'Complete 12th in any stream', done: (profile.academicProfile?.marks12 ?? 0) > 0 },
 { step: '2', label: 'Clear CLAT / AILET', done: !!profile.examScores?.['clat'] },
 { step: '3', label: 'BA LLB (5 years)', done: false },
 { step: '4', label: 'Internships & Moot Courts', done: false },
 { step: '5', label: 'Enroll as Advocate', done: false },
 ],
 };

 const defaultRoadmap = [
 { step: '1', label: 'Define your career path', done: profile.targetCareers.length > 0 },
 { step: '2', label: 'Identify required entrance exams', done: profile.trackedExams.length > 0 },
 { step: '3', label: 'Save target colleges', done: false },
 { step: '4', label: 'Complete all applications', done: false },
 ];

 return (
 <div className="space-y-6">
 {/* Career Goals */}
 <div className="sz-card p-6">
 <SectionHeader icon={Target} title="Career Goals"action={{ label: 'Explore Careers', path: '/careers' }} />
 {profile.targetCareers.length === 0 ? (
 <EmptyState icon={Target} title="No career goals set"desc="Add career interests during onboarding or on the Career Explorer"cta={{ label: 'Explore Careers', path: '/careers' }} />
 ) : (
 <div className="flex flex-wrap gap-2">
 {profile.targetCareers.map(career => (
 <div key={career} className="flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-sm font-semibold text-black">
 {career}
 <button onClick={() => untargetCareer(career)} className="text-black/50 hover:text-black transition-colors">
 <X size={13} />
 </button>
 </div>
 ))}
 <Link to="/careers"className="flex items-center gap-1 px-3 py-2 border-2 border-dashed border-slate-300 rounded-xl text-xs font-semibold text-black hover:bg-slate-100 transition-colors">
 <Plus size={13} /> Add Goal
 </Link>
 </div>
 )}
 </div>

 {/* Career Roadmaps */}
 {profile.targetCareers.length > 0 && (
 <div className="sz-card p-6">
 <SectionHeader icon={TrendingUp} title={`Roadmap: ${profile.targetCareers[0]}`} />
 <div className="space-y-3">
 {(ROADMAP_STEPS[profile.targetCareers[0]] || defaultRoadmap).map((s, i, arr) => (
 <div key={s.step} className="flex items-start gap-4">
 <div className="flex flex-col items-center">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0 ${
 s.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-[#E3E8EF] text-[#9DA6B4]'
 }`}>
 {s.done ? <CheckCircle2 size={16} /> : s.step}
 </div>
 {i < arr.length - 1 && (
 <div className={`w-0.5 h-8 mt-1 ${s.done ? 'bg-emerald-300' : 'bg-[#E3E8EF]'}`} />
 )}
 </div>
 <div className={`pt-1.5 pb-2 text-sm font-medium ${s.done ? 'text-emerald-700' : 'text-[#425466]'}`}>
 {s.label}
 {s.done && <span className="ml-2 text-xs text-emerald-500 font-semibold">✓ Done</span>}
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Preferred States */}
 {((profile.preferences as any)?.preferredStates || []).length > 0 && (
 <div className="sz-card p-6">
 <SectionHeader icon={MapPin} title="Preferred Locations"action={{ label: 'Update', path: '/onboarding' }} />
 <div className="flex flex-wrap gap-2">
 {((profile.preferences as any)?.preferredStates || []).map((state: string) => (
 <span key={state} className="sz-chip-gray">{state}</span>
 ))}
 </div>
 {(profile.preferences as any)?.budgetLimitLpa && (
 <div className="mt-4 flex items-center gap-2 text-sm">
 <Wallet size={15} className="text-black"/>
 <span className="text-[#697386]">Annual budget up to</span>
 <span className="font-bold text-[#0A2540]">₹{(profile.preferences as any).budgetLimitLpa}L / year</span>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

/* ─────────────────────────────────────────────────────────
 SETTINGS TAB
───────────────────────────────────────────────────────── */
function SettingsTab({ user, handleLogout }: { user: { name: string; email: string }; handleLogout: () => void }) {
 return (
 <div className="space-y-6 max-w-lg">
 <div className="sz-card overflow-hidden">
 <div className="px-5 py-4 border-b border-[#E3E8EF] bg-[#F6F7FB]">
 <h3 className="font-bold text-xs font-sans uppercase tracking-wider text-[#697386]">Account Preferences</h3>
 </div>
 {[
 { label: 'Edit Profile & Preferences', path: '/onboarding', icon: Edit3, desc: 'Update marks, exams, states, budget' },
 { label: 'Notification Preferences', path: '#', icon: Bell, desc: 'Control what alerts you receive' },
 { label: 'Data & Privacy', path: '#', icon: Shield, desc: 'Manage your data and privacy settings' },
 ].map(({ label, path, icon: Icon, desc }) => (
 <Link key={label} to={path} className="flex items-center gap-4 p-5 hover:bg-[#F6F7FB] :bg-slate-800/50 border-b border-[#E3E8EF] last:border-0 transition-colors group">
 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-slate-100 :bg-slate-700 transition-colors">
 <Icon size={18} className="text-[#697386] group-hover:text-black :text-[#818CF8]"/>
 </div>
 <div className="flex-1">
 <div className="font-semibold text-sm text-[#0A2540]">{label}</div>
 <div className="text-xs text-[#697386]">{desc}</div>
 </div>
 <ChevronRight size={16} className="text-[#C7D0DE] group-hover:text-black :text-[#818CF8]"/>
 </Link>
 ))}
 </div>

 <div className="sz-card overflow-hidden">
 <button
 onClick={handleLogout}
 className="w-full flex items-center gap-4 p-5 hover:bg-red-50 :bg-red-950/10 transition-colors text-left group cursor-pointer"
 >
 <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 :bg-red-950/40 transition-colors">
 <LogOut size={18} className="text-red-500"/>
 </div>
 <div>
 <div className="font-semibold text-sm text-red-600">Sign Out</div>
 <div className="text-xs text-[#697386] font-sans">Signed in as {user.email}</div>
 </div>
 </button>
 </div>
 </div>
 );
}

/* ─────────────────────────────────────────────────────────
 MAIN PROFILE PAGE
───────────────────────────────────────────────────────── */
export default function ProfilePage() {
 const { user, logout } = useAuth();
 const { profile, untrackExam, untargetCareer } = useStudentProfile();
 const { savedColleges, updateFit, removeCollege } = useBookmarks();
 const navigate = useNavigate();
 const [tab, setTab] = useState<Tab>('overview');

 const handleLogout = () => { logout(); navigate('/login'); };

 if (!user) {
 return (
 <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-4">
 <div className="text-center">
 <h2 className="text-2xl font-bold text-[#0A2540] mb-4">Please log in</h2>
 <button onClick={() => navigate('/login')} className="btn-primary">Go to Login</button>
 </div>
 </div>
 );
 }

 const acad = profile.academicProfile;
 const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

 const TABS: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
 { id: 'overview', label: 'Overview', icon: Home },
 { id: 'colleges', label: 'Colleges', icon: Bookmark, count: savedColleges.length },
 { id: 'exams', label: 'Exams', icon: GraduationCap, count: profile.trackedExams.length },
 { id: 'career', label: 'Career', icon: TrendingUp, count: profile.targetCareers.length },
 { id: 'settings', label: 'Settings', icon: Settings },
 ];

 return (
 <div className="min-h-screen bg-[#F6F7FB] transition-colors duration-200">
 <div className="max-w-7xl mx-auto px-4 py-8">
 <div className="flex flex-col lg:flex-row gap-8 items-start">

 {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
 <aside className="w-full lg:w-64 shrink-0 space-y-4 lg:sticky lg:top-24">
 {/* User Card */}
 <div className="sz-card p-6 text-center">
 <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-black to-slate-800 flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg shadow-black/25">
 {initials}
 </div>
 <h1 className="text-lg font-bold text-[#0A2540] leading-tight">{user.name}</h1>
 <p className="text-xs text-[#697386] mt-1">{user.email}</p>

 {acad?.currentClass && (
 <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-black">
 <GraduationCap size={12} />
 {acad.currentClass} • {acad.board || 'Student'}
 </div>
 )}

 {/* Flame streak placeholder */}
 <div className="mt-4 flex items-center justify-center gap-1.5 text-amber-500 text-sm font-bold">
 <Flame size={16} className="fill-amber-500"/>
 <span>7 day streak</span>
 </div>
 </div>

 {/* Tab Navigation */}
 <div className="sz-card overflow-hidden">
 <nav className="p-2">
 {TABS.map(({ id, label, icon: Icon, count }) => (
 <button
 key={id}
 onClick={() => setTab(id)}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
 tab === id
 ? 'bg-slate-100 text-black '
 : 'text-[#425466] hover:bg-slate-50 :bg-slate-800 hover:text-[#0A2540] :text-slate-100'
 }`}
 >
 <Icon size={16} />
 <span className="flex-1">{label}</span>
 {count !== undefined && count > 0 && (
 <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
 tab === id 
 ? 'bg-black text-white' 
 : 'bg-[#E3E8EF] text-[#697386] '
 }`}>
 {count}
 </span>
 )}
 </button>
 ))}
 </nav>
 </div>

 {/* Site Navigation */}
 <div className="sz-card overflow-hidden">
 <div className="px-4 py-3 border-b border-[#E3E8EF]">
 <span className="text-[10px] font-bold text-[#9DA6B4] uppercase tracking-wider">Navigate</span>
 </div>
 <nav className="p-2">
 {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
 <Link
 key={path}
 to={path}
 className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#697386] hover:bg-slate-50 hover:text-[#0A2540] transition-all group"
 >
 <Icon size={15} className="group-hover:text-black"/>
 {label}
 </Link>
 ))}
 </nav>
 </div>
 </aside>

 {/* ── MAIN CONTENT ─────────────────────────────────── */}
 <main className="flex-1 min-w-0">
 {/* Tab Header */}
 <div className="flex items-center gap-3 mb-6">
 {TABS.find(t => t.id === tab) && (() => {
 const { icon: Icon, label } = TABS.find(t => t.id === tab)!;
 return (
 <>
 <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
 <Icon size={18} className="text-black"/>
 </div>
 <h2 className="text-xl font-bold text-[#0A2540]">{label}</h2>
 </>
 );
 })()}
 </div>

 {/* Tab Content */}
 {tab === 'overview' && (
 <OverviewTab profile={profile} savedColleges={savedColleges} navigate={navigate} />
 )}
 {tab === 'colleges' && (
 <CollegesTab savedColleges={savedColleges} updateFit={updateFit} removeCollege={removeCollege} />
 )}
 {tab === 'exams' && (
 <ExamsTab profile={profile} untrackExam={untrackExam} />
 )}
 {tab === 'career' && (
 <CareerTab profile={profile} untargetCareer={untargetCareer} />
 )}
 {tab === 'settings' && (
 <SettingsTab user={user} handleLogout={handleLogout} />
 )}
 </main>
 </div>
 </div>
 </div>
 );
}
