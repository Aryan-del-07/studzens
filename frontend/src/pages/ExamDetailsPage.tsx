import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 

/**
 * ExamDetailsPage.tsx
 *
 * WHAT THIS FILE DOES:
 * Shows detailed information about a specific exam: syllabus, pattern,
 * eligibility, important dates, preparation tips, and related colleges.
 *
 * WHY IT EXISTS:
 * After finding an exam on the ExamHub, students need deep details
 * to plan their preparation and registration strategy.
 *
 * KEY CONCEPTS:
 * - Dynamic route: URL includes the exam ID (e.g., /exams/jee-main)
 * - `useParams`: Reads the exam ID from the URL
 * - `getExamById`: Looks up the exam in the data file
 * - Tabbed sections: Overview, Pattern, Dates, Tips, Colleges
 * - Related colleges: Shows which colleges accept this exam
 */
 ArrowLeft, Calendar, FileText, CheckCircle2, AlertCircle, Compass, 
 GraduationCap, Bookmark, BookmarkCheck, ExternalLink, 
 MapPin, CheckSquare, Square, ChevronRight
} from 'lucide-react';
import { exams } from '../api/mocks/exams';
import { colleges } from '../api/mocks/colleges';
import { useStudentProfile } from '../contexts/StudentProfileContext';

export default function ExamDetailsPage() {
 const { id } = useParams<{ id: string }>();
 const exam = exams.find(e => e.id === id);
 const { profile, trackExam, untrackExam } = useStudentProfile();

 // Document checklist local state
 const [docsChecked, setDocsChecked] = useState<string[]>([]);

 // Cross-linked colleges that accept this exam
 const acceptingColleges = useMemo(() => {
 if (!exam) return [];
 return colleges.filter(c => 
 c.entranceExams.some(ex => 
 ex.toLowerCase() === exam.name.toLowerCase() ||
 ex.toLowerCase().includes(exam.name.toLowerCase()) ||
 exam.name.toLowerCase().includes(ex.toLowerCase())
 )
 );
 }, [exam]);

 if (!exam) {
 return (
 <div className="max-w-4xl mx-auto px-4 py-16 text-center bg-[#F6F7FB] text-[#0A2540]">
 <h1 className="text-2xl font-bold mb-4 font-sans">Exam not found</h1>
 <Link to="/exams"className="text-[#635BFF] hover:underline font-semibold font-sans">Return to Exam Hub</Link>
 </div>
 );
 }

 // Handle document toggle
 const toggleDoc = (docId: string) => {
 if (docsChecked.includes(docId)) {
 setDocsChecked(prev => prev.filter(d => d !== docId));
 } else {
 setDocsChecked(prev => [...prev, docId]);
 }
 };

 // Check which timeline dates are completed/active/upcoming
 const currentDate = new Date('2026-06-22'); // Current mock date from user request metadata

 const getMilestoneStatus = (dateStr?: string) => {
 if (!dateStr || dateStr.toLowerCase().includes('awaiting') || dateStr.toLowerCase().includes('tba')) {
 return 'awaiting';
 }
 const eventDate = new Date(dateStr);
 if (isNaN(eventDate.getTime())) return 'awaiting';
 return eventDate < currentDate ? 'completed' : 'upcoming';
 };

 const timelineMilestones = [
 { label: 'Registration Start', date: exam.importantDates.registrationStart, key: 'reg_start' },
 { label: 'Registration Deadline', date: exam.importantDates.registrationEnd, key: 'reg_end' },
 { label: 'Admit Card Available', date: exam.importantDates.admitCard, key: 'admit' },
 { label: 'Entrance Examination', date: exam.importantDates.examStart, key: 'exam_start' },
 { label: 'Answer Key Release', date: 'Awaiting official update', key: 'ans_key' },
 { label: 'Result Announcement', date: exam.importantDates.resultExpected, key: 'result' },
 { label: 'Counselling Registration', date: exam.importantDates.counselingStart || 'Awaiting official update', key: 'counsel' },
 { label: 'Seat Allotment Round 1', date: 'Awaiting official update', key: 'seat_allot' },
 { label: 'College Acceptance List', date: 'Awaiting official update', key: 'acceptance' }
 ];

 const requiredDocuments = [
 { id: '10th', name: 'Class 10 Marksheet & Passing Certificate', desc: 'Required for age and name spelling verification.' },
 { id: '12th', name: 'Class 12 Marks Sheet / Roll Number Card', desc: 'Confirms qualifying subject percentages.' },
 { id: 'id-proof', name: 'Aadhaar Card / Valid Passport', desc: 'Government photo identification.' },
 { id: 'photo', name: 'Passport Size Photographs (recent, white background)', desc: 'Must match uploaded upload guidelines.' },
 { id: 'signature', name: 'Scanned copy of Candidate Signature', desc: 'Must be written clearly in black ink.' },
 { id: 'category', name: 'Category / Reservation Certificate (if applicable)', desc: 'OBC-NCL, SC, ST, or EWS certificate issued by competent authority.' },
 { id: 'pwd', name: 'PwD Disability Certificate (if applicable)', desc: 'For reservation benefits or extra examination scribes.' }
 ];

 const isPinned = profile.trackedExams.includes(exam.id);

 return (
 <div className="bg-[#F6F7FB] min-h-screen text-[#0A2540] pb-20">
 
 {/* Header Profile Section */}
 <div className="bg-white border-b border-[#E3E8EF] pt-8 pb-24 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-50/50 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none"/>
 
 <div className="max-w-5xl mx-auto px-4 relative">
 <div className="flex justify-between items-center mb-8">
 <Link to="/exams"className="inline-flex items-center gap-2 text-sm font-semibold text-[#697386] hover:text-[#0A2540] transition-colors font-sans">
 <ArrowLeft size={16} /> Back to Exam Hub
 </Link>
 
 <button 
 onClick={() => isPinned ? untrackExam(exam.id) : trackExam(exam.id)}
 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all font-sans cursor-pointer ${
 isPinned 
 ? 'bg-indigo-50 border-[#635BFF] text-[#635BFF]' 
 : 'bg-white border-[#E3E8EF] text-[#425466] hover:border-[#635BFF] hover:text-[#635BFF]'
 }`}
 >
 {isPinned ? (
 <><BookmarkCheck size={18} className="fill-current"/> Pinned to Command Center</>
 ) : (
 <><Bookmark size={18} /> Pin to Dashboard</>
 )}
 </button>
 </div>

 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-slide-up">
 <div>
 <div className="flex flex-wrap items-center gap-2 mb-3">
 <span className="sz-chip">
 {exam.category}
 </span>
 <span className="sz-chip-gray">
 {exam.level} Level
 </span>
 <span className="bg-purple-50 border border-purple-200 text-purple-800 px-3 py-0.5 rounded-full text-xs font-bold">
 Difficulty: {exam.difficultyLevel}/5
 </span>
 </div>
 
 <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2540] font-sans tracking-tight leading-none mb-2">{exam.name}</h1>
 <p className="text-base text-[#425466] font-sans font-medium">{exam.fullName}</p>
 </div>

 <div className="bg-[#F6F7FB] p-4 rounded-xl border border-[#E3E8EF] font-sans text-xs flex gap-6 md:self-center shrink-0">
 <div>
 <span className="text-[9px] uppercase font-bold text-[#697386] tracking-wider block mb-1">Conducted By</span>
 <span className="font-extrabold text-[#0A2540]">{exam.conductingBody}</span>
 </div>
 <div className="border-l border-[#E3E8EF] pl-6">
 <span className="text-[9px] uppercase font-bold text-[#697386] tracking-wider block mb-1">Official Portal</span>
 <a href={exam.officialWebsite} target="_blank"rel="noopener noreferrer"className="text-[#635BFF] font-bold hover:underline inline-flex items-center gap-1">
 Visit Website <ExternalLink size={12} />
 </a>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Main Details grid */}
 <div className="max-w-5xl mx-auto px-4 -mt-12">
 <div className="grid md:grid-cols-3 gap-8">
 
 {/* Main Info Columns */}
 <div className="md:col-span-2 space-y-8 animate-slide-up delay-75">
 
 {/* Visual Timeline progress */}
 <section className="sz-card p-6 md:p-8 space-y-6">
 <h2 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-4">
 <Calendar className="text-[#635BFF]"size={20} /> Milestone Progress Timeline
 </h2>

 <div className="relative pl-6 border-l-2 border-[#E3E8EF] space-y-6 font-sans py-2">
 {timelineMilestones.map((m) => {
 const status = getMilestoneStatus(m.date);
 
 return (
 <div key={m.key} className="relative">
 {/* Checkmarks or status nodes */}
 <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 flex items-center justify-center ${
 status === 'completed' ? 'bg-[#0BBF8A] border-white shadow-xs' :
 status === 'upcoming' ? 'bg-indigo-500 border-white shadow-xs' :
 'bg-slate-300 border-white'
 }`} />

 <div className="flex justify-between flex-wrap gap-2">
 <div>
 <strong className="text-xs text-[#0A2540] block">{m.label}</strong>
 <span className={`text-[10px] font-bold ${
 status === 'completed' ? 'text-emerald-600' :
 status === 'upcoming' ? 'text-indigo-600' :
 'text-[#697386]'
 }`}>
 {m.date}
 </span>
 </div>

 {status === 'completed' && (
 <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black border border-emerald-100 self-start">
 Completed
 </span>
 )}
 {status === 'upcoming' && (
 <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-black border border-indigo-100 self-start">
 Upcoming
 </span>
 )}
 {status === 'awaiting' && (
 <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-black border border-amber-100 self-start">
 Awaiting official update
 </span>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </section>

 {/* Exam Pattern & Sections */}
 <section className="sz-card p-6 md:p-8 space-y-6">
 <h2 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-4">
 <Compass className="text-[#635BFF]"size={20} /> Exam Pattern & Marking Scheme
 </h2>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { label: 'Exam Mode', value: exam.pattern.mode },
 { label: 'Duration', value: `${exam.pattern.durationMinutes} Mins` },
 { label: 'Total Marks', value: exam.pattern.totalMarks },
 { label: 'Total Qs', value: exam.pattern.totalQuestions }
 ].map((stat, i) => (
 <div key={i} className="p-4 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl font-sans text-center">
 <span className="text-[9px] font-bold text-[#697386] uppercase tracking-wider block mb-1">{stat.label}</span>
 <strong className="text-sm text-[#0A2540]">{stat.value}</strong>
 </div>
 ))}
 </div>

 {/* Sections list */}
 <div className="space-y-3 font-sans">
 <span className="text-xs font-bold text-[#697386] uppercase tracking-wider block">Question paper structure:</span>
 {exam.pattern.sections.map((sec, idx) => (
 <div key={idx} className="flex justify-between items-center p-3.5 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl text-xs font-semibold">
 <span className="text-[#425466]">{sec.name}</span>
 <span className="text-[#0A2540]">
 {sec.questions} Questions • {sec.marks} Marks
 </span>
 </div>
 ))}
 </div>

 {/* Marking Scheme Alert */}
 <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 text-xs leading-relaxed text-amber-850 font-sans">
 <AlertCircle className="text-amber-500 shrink-0 mt-0.5"size={18} />
 <div>
 <strong className="block text-amber-900 mb-0.5">Scoring Metrics:</strong>
 Candidates score <span className="font-extrabold text-amber-900">+{exam.markingScheme.correct}</span> for every correct option. 
 A negative penalty of <span className="font-extrabold text-red-600">{exam.markingScheme.incorrect}</span> is applied for incorrect choices. 
 Unanswered questions receive {exam.markingScheme.unanswered} penalty points.
 </div>
 </div>
 </section>

 {/* Syllabus Overview */}
 <section className="sz-card p-6 md:p-8 space-y-4">
 <h2 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-4">
 <FileText className="text-[#635BFF]"size={20} /> Syllabus Outline
 </h2>
 <p className="text-xs text-[#697386] font-sans leading-relaxed">
 {exam.syllabusOverview}
 </p>
 
 <div className="pt-2">
 <span className="text-xs font-extrabold text-[#697386] uppercase tracking-wider block mb-2 font-sans">Core Eligibility Standards:</span>
 <ul className="space-y-2 text-xs text-[#425466] leading-relaxed font-sans">
 {exam.eligibility.map((el, i) => (
 <li key={i} className="flex gap-2">
 <span className="text-[#635BFF] font-bold">•</span>
 {el}
 </li>
 ))}
 </ul>
 </div>
 </section>
 </div>

 {/* Sidebar Columns */}
 <div className="space-y-6 animate-slide-up delay-150">
 
 {/* Document Verification Checklist */}
 <div className="sz-card p-6 space-y-4 bg-white">
 <h3 className="font-bold text-sm text-[#0A2540] border-b border-[#E3E8EF] pb-3 flex items-center gap-1.5 font-sans">
 <CheckSquare size={16} className="text-[#635BFF]"/> Documents Required
 </h3>
 
 <div className="space-y-3.5 text-xs font-sans">
 {requiredDocuments.map(doc => {
 const checked = docsChecked.includes(doc.id);
 return (
 <button
 key={doc.id}
 onClick={() => toggleDoc(doc.id)}
 className="w-full text-left flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#F6F7FB] transition-all cursor-pointer"
 >
 <span className="mt-0.5 shrink-0 text-[#635BFF]">
 {checked ? <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-50"/> : <Square size={16} />}
 </span>
 <div>
 <span className={`font-bold block ${checked ? 'line-through text-[#9DA6B4]' : 'text-[#425466]'}`}>
 {doc.name}
 </span>
 <p className="text-[10px] text-[#697386] mt-0.5 leading-snug">{doc.desc}</p>
 </div>
 </button>
 );
 })}
 </div>
 </div>

 {/* Accepting Colleges (Linked Engine) */}
 <div className="sz-card p-6 space-y-4 bg-white">
 <h3 className="font-bold text-sm text-[#0A2540] border-b border-[#E3E8EF] pb-3 flex items-center gap-1.5 font-sans">
 <GraduationCap size={18} className="text-[#635BFF]"/> Accepting Colleges
 </h3>
 
 {acceptingColleges.length === 0 ? (
 <div className="text-xs text-[#697386] font-sans leading-relaxed">
 No specific local profiles are listed. This exam is commonly accepted across {exam.acceptedBy.join(', ')}.
 </div>
 ) : (
 <div className="space-y-3 font-sans">
 {acceptingColleges.map(col => (
 <Link
 key={col.id}
 to={`/college/${col.id}`}
 className="p-3 bg-[#F6F7FB] hover:bg-[#EEF0FF]/30 border border-[#E3E8EF] rounded-xl flex items-center justify-between group transition-all"
 >
 <div className="min-w-0">
 <strong className="text-xs text-[#0A2540] block truncate group-hover:text-[#635BFF] transition-colors">{col.name}</strong>
 <span className="text-[9px] text-[#697386] flex items-center gap-1 mt-0.5">
 <MapPin size={9} /> {col.city}, {col.state}
 </span>
 </div>
 <ChevronRight size={14} className="text-[#9DA6B4] group-hover:text-[#635BFF] shrink-0"/>
 </Link>
 ))}
 </div>
 )}
 </div>

 </div>

 </div>
 </div>
 
 </div>
 );
}
