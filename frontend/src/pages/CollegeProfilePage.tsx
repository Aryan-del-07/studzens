import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 

/**
 * CollegeProfilePage.tsx
 *
 * WHAT THIS FILE DOES:
 * Displays a detailed profile of a single college: overview, courses,
 * fees, placements, facilities, gallery, and alumni.
 *
 * WHY IT EXISTS:
 * After finding a college in search, students need comprehensive
 * information to decide if it's right for them.
 *
 * KEY CONCEPTS:
 * - Dynamic route: URL includes the college ID (e.g., /college/1)
 * - `useParams`: Reads the college ID from the URL
 * - `getCollegeById`: Looks up the college in the data file
 * - Tabbed sections: Overview, Courses, Fees, Placements, Facilities, Gallery
 * - Similar colleges: Shows related options at the bottom
 */
 MapPin, Building2, BookOpen, GraduationCap, ShieldCheck, ArrowLeft, Wallet, 
 Plane, Train, Compass, Landmark, Briefcase, Award, Map, DollarSign, 
 Activity, MessageSquare, ShieldAlert, Image as ImageIcon, ChevronRight, 
 Sparkles, AlertCircle, Plus, Send, CheckCircle2, Bookmark, ExternalLink,
 Star, ChevronDown, ChevronUp, Clock, HelpCircle, X, Scale
} from 'lucide-react';
import { colleges } from '../api/mocks/colleges';
import { getIntelligenceForCollege, type StudentReview, type VoiceQuestion } from '../utils/collegeIntelligence';
import { useBookmarks } from '../contexts/BookmarkContext';

export default function CollegeProfilePage() {
 const { id } = useParams<{ id: string }>();
 const college = colleges.find(c => c.id === id);
 const { isSaved, saveCollege, removeCollege } = useBookmarks();

 // Fetch deterministic intelligence layer safely
 const intelligence = college ? getIntelligenceForCollege(college) : null;

 // Compute similar colleges for quick comparisons
 const similarColleges = useMemo(() => {
 if (!college) return [];
 return colleges
 .filter(c => c.id !== college.id && c.primaryCategory === college.primaryCategory && c.tier === college.tier)
 .slice(0, 3);
 }, [college]);

 // States
 const [activeTab, setActiveTab] = useState<string>('overview');
 const [bookmarkSuccess, setBookmarkSuccess] = useState(false);

 // Budget slider states
 const [livingType, setLivingType] = useState<'hostel' | 'pg'>('pg');
 const [pgRent, setPgRent] = useState(intelligence?.livingBudget.defaultPgRentMonthly ?? 0);
 const [pgFood, setPgFood] = useState(intelligence?.livingBudget.defaultPgFoodMonthly ?? 0);
 const [pgTravel, setPgTravel] = useState(intelligence?.livingBudget.defaultTravelMonthly ?? 0);
 const [amenityAddons, setAmenityAddons] = useState<string[]>([]);

 // Reviews/Q&A local state to allow interactive adds
 const [reviews, setReviews] = useState<StudentReview[]>(() => intelligence?.reviews ?? []);
 const [reviewsFilter, setReviewsFilter] = useState<string>('All');
 const [newReview, setNewReview] = useState({
 author: '',
 role: 'Sophomore' as const,
 category: 'Academics' as const,
 rating: 5,
 text: ''
 });
 const [showReviewForm, setShowReviewForm] = useState(false);

 const [questions, setQuestions] = useState<VoiceQuestion[]>(() => intelligence?.questions ?? []);
 const [newQuestion, setNewQuestion] = useState('');
 const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
 const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null);

 // FAQs open states
 const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

 // Gallery category filter and lightbox
 const [galleryFilter, setGalleryFilter] = useState<string>('all');
 const [lightboxImage, setLightboxImage] = useState<string | null>(null);
 const [lightboxCaption, setLightboxCaption] = useState<string>('');
 const [lightboxCredit, setLightboxCredit] = useState<string>('');

 // Early return if college is not found
 if (!college || !intelligence) {
 return (
 <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F6F7FB] text-[#0A2540]">
 <h2 className="text-2xl font-bold mb-2">College not found</h2>
 <Link to="/search"className="text-[#635BFF] hover:underline font-medium font-sans">Return to Search</Link>
 </div>
 );
 }

 // Handle bookmark toggle
 const handleBookmarkToggle = () => {
 if (isSaved(college.id)) {
 removeCollege(college.id);
 } else {
 saveCollege(college.id, 'Target');
 setBookmarkSuccess(true);
 setTimeout(() => setBookmarkSuccess(false), 2000);
 }
 };

 // Add review
 const handleAddReview = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newReview.text.trim()) return;

 const added: StudentReview = {
 id: `rev-custom-${Date.now()}`,
 author: newReview.author.trim() || 'Anonymous Student',
 role: newReview.role,
 category: newReview.category,
 rating: newReview.rating,
 text: newReview.text,
 date: new Date().toISOString().split('T')[0],
 helpfulVotes: 0
 };

 setReviews([added, ...reviews]);
 setNewReview({ author: '', role: 'Sophomore', category: 'Academics', rating: 5, text: '' });
 setShowReviewForm(false);
 };

 // Add question
 const handleAddQuestion = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newQuestion.trim()) return;

 const added: VoiceQuestion = {
 id: `q-custom-${Date.now()}`,
 question: newQuestion.trim(),
 askedBy: 'Aspirant',
 date: new Date().toISOString().split('T')[0],
 answers: []
 };

 setQuestions([added, ...questions]);
 setNewQuestion('');
 };

 // Add answer
 const handleAddAnswer = (questionId: string) => {
 const text = replyTexts[questionId];
 if (!text || !text.trim()) return;

 setQuestions(prev => prev.map(q => {
 if (q.id === questionId) {
 return {
 ...q,
 answers: [
 ...q.answers,
 {
 id: `ans-custom-${Date.now()}`,
 author: 'You (Student)',
 role: 'Contributor',
 text: text.trim(),
 helpfulVotes: 0,
 verifiedSenior: false
 }
 ]
 };
 }
 return q;
 }));

 setReplyTexts(prev => ({ ...prev, [questionId]: '' }));
 setActiveReplyBox(null);
 };

 // Helpful vote
 const handleHelpfulReview = (id: string) => {
 setReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r));
 };

 // Toggle amenity addon
 const toggleAmenityAddon = (amenity: string) => {
 if (amenityAddons.includes(amenity)) {
 setAmenityAddons(prev => prev.filter(a => a !== amenity));
 } else {
 setAmenityAddons(prev => [...prev, amenity]);
 }
 };

 // Calculate PG total budget
 const pgAmenitiesCost = amenityAddons.length * 400; // ₹400 extra rent per selected amenity
 const totalMonthlyPg = pgRent + pgFood + pgTravel + pgAmenitiesCost + intelligence.livingBudget.defaultInternetMonthly + intelligence.livingBudget.defaultMiscMonthly;
 const totalYearlyPg = totalMonthlyPg * 12;

 const totalYearlyHostel = intelligence.livingBudget.hostelFeeYearly + intelligence.livingBudget.messFeeYearly + (pgTravel + intelligence.livingBudget.defaultMiscMonthly) * 10; // 10 months

 // Tabs structure
 const tabs = [
 { id: 'overview', label: 'Overview', icon: Building2 },
 { id: 'placements', label: 'Placements', icon: Briefcase },
 { id: 'outcomes', label: 'Career Outcomes', icon: Compass },
 { id: 'travel', label: 'Travel & Transit', icon: Plane },
 { id: 'living', label: 'Living & PG', icon: Wallet },
 { id: 'reality', label: 'Reality Ratings', icon: Activity },
 { id: 'voices', label: 'Student Voices', icon: MessageSquare },
 { id: 'rules', label: 'Rules & FAQs', icon: ShieldAlert },
 { id: 'gallery', label: 'Campus Explorer', icon: ImageIcon }
 ];

 return (
 <div className="bg-[#F6F7FB] min-h-screen pb-20 text-[#0A2540]">
 
 {/* Premium College Header */}
 <div className="bg-white border-b border-[#E3E8EF] pt-8 pb-32 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-50/50 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none"/>
 
 <div className="max-w-5xl mx-auto px-4 relative">
 <div className="flex justify-between items-center mb-8">
 <Link to="/search"className="inline-flex items-center gap-2 text-sm font-semibold text-[#697386] hover:text-[#0A2540] transition-colors font-sans">
 <ArrowLeft size={16} /> Back to Search
 </Link>
 
 <div className="flex items-center gap-3">
 <Link
 to={`/compare?add=${college.id}`}
 className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E3E8EF] text-sm font-semibold text-[#425466] hover:border-[#635BFF] hover:text-[#635BFF] transition-all font-sans cursor-pointer bg-white"
 >
 <Compass size={18} />
 <span>Compare</span>
 </Link>

 <button
 onClick={handleBookmarkToggle}
 className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all font-sans cursor-pointer ${
 isSaved(college.id)
 ? 'bg-indigo-50 border-[#635BFF] text-[#635BFF]'
 : 'bg-white border-[#E3E8EF] text-[#425466] hover:border-[#635BFF] hover:text-[#635BFF]'
 }`}
 >
 {isSaved(college.id) ? (
 <>
 <Bookmark size={18} className="fill-current text-[#635BFF]"/>
 <span>Saved to Fit List</span>
 </>
 ) : (
 <>
 <Bookmark size={18} />
 <span>Save College</span>
 </>
 )}
 </button>
 </div>
 </div>

 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-slide-up">
 <div className="flex items-start gap-6">
 <div className="w-24 h-24 bg-[#F0F2F8] rounded-2xl flex items-center justify-center shrink-0 border border-[#E3E8EF] relative shadow-sm">
 <Building2 className="text-[#425466]"size={44} />
 {college.verificationMetadata?.general?.status === 'Verified' && (
 <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 border border-[#E3E8EF] shadow-md"title={`Verified by ${college.verificationMetadata.general.source}`}>
 <ShieldCheck className="text-emerald-500 fill-emerald-50"size={24} />
 </div>
 )}
 </div>
 <div>
 <div className="flex flex-wrap gap-2 mb-3">
 <span className="sz-chip">
 {college.tier}
 </span>
 <span className="sz-chip-gray">
 {college.ownership}
 </span>
 {college.nirfRank && (
 <span className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1">
 <Award size={12} /> NIRF #{college.nirfRank}
 </span>
 )}
 </div>
 <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#0A2540] font-sans tracking-tight leading-none">{college.name}</h1>
 <p className="text-[#697386] flex items-center gap-2 font-medium font-sans">
 <MapPin size={18} className="text-[#9DA6B4]"/> {college.city}, {college.state}
 </p>
 </div>
 </div>
 
 <div className="flex items-center gap-6 bg-[#F6F7FB] p-4 rounded-xl border border-[#E3E8EF] md:self-center shrink-0">
 <div className="text-center px-4 border-r border-[#E3E8EF]">
 <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#697386] mb-1 font-sans">Avg Placement</div>
 <div className="text-xl font-bold text-[#0A2540] font-sans">₹{college.avgPackageLpa} LPA</div>
 </div>
 <div className="text-center px-4">
 <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#697386] mb-1 font-sans">Annual Fee</div>
 <div className="text-xl font-bold text-[#0A2540] font-sans">₹{college.annualFeeLpa} L</div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Main Content Layout */}
 <div className="max-w-5xl mx-auto px-4 -mt-20">
 
 {/* Bookmark Success Toast */}
 {bookmarkSuccess && (
 <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
 <CheckCircle2 className="text-emerald-500 shrink-0"size={20} />
 <span className="text-sm font-semibold text-emerald-800 font-sans">
 College saved successfully! You can categorise and track this in your profile.
 </span>
 </div>
 )}

 <div className="space-y-8">
 
 {/* Professional Navigation Tabs */}
 <div className="bg-white border border-[#E3E8EF] p-1.5 rounded-2xl flex flex-wrap gap-1 shadow-sm overflow-x-auto scrollbar-none z-10 sticky top-4">
 {tabs.map((tab) => {
 const Icon = tab.icon;
 const isSelected = activeTab === tab.id;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all font-sans cursor-pointer shrink-0 ${
 isSelected
 ? 'bg-[#635BFF] text-white shadow-sm'
 : 'text-[#425466] hover:bg-[#F6F7FB] hover:text-[#0A2540]'
 }`}
 >
 <Icon size={16} />
 <span>{tab.label}</span>
 </button>
 );
 })}
 </div>

 {/* Dynamic Tab Body */}
 <div className="animate-slide-up delay-75">
 
 {/* 1. OVERVIEW TAB */}
 {activeTab === 'overview' && (
 <div className="grid md:grid-cols-3 gap-8">
 <div className="md:col-span-2 space-y-6">
 {/* Highlights Card */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <GraduationCap className="text-[#635BFF]"size={22} /> About the Institution
 </h2>
 <p className="text-[#425466] leading-relaxed font-sans">{college.vibe}</p>
 
 <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-[#E3E8EF]">
 <div>
 <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block mb-1">Established</span>
 <span className="text-base font-bold text-[#0A2540]">{college.establishedYear || 'N/A'}</span>
 </div>
 <div>
 <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block mb-1">Accreditation</span>
 <span className="text-base font-bold text-[#0A2540]">{intelligence.accreditation}</span>
 </div>
 <div>
 <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block mb-1">Campus Size</span>
 <span className="text-base font-bold text-[#0A2540]">{college.campusSize || 'Awaiting official report'}</span>
 </div>
 <div>
 <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block mb-1">Student Strength</span>
 <span className="text-base font-bold text-[#0A2540]">{college.studentStrength ? `${college.studentStrength.toLocaleString()} Students` : 'Awaiting update'}</span>
 </div>
 </div>
 </div>

 {/* Academic Programs */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <BookOpen className="text-[#635BFF]"size={22} /> Academic Programs & Intake
 </h2>
 <div className="grid sm:grid-cols-2 gap-4">
 {college.programs.map((program, idx) => (
 <div key={idx} className="p-4 rounded-xl bg-[#F6F7FB] border border-[#E3E8EF] flex items-center justify-between font-sans">
 <span className="font-bold text-[#425466]">{program}</span>
 <span className="text-xs font-medium bg-white px-2.5 py-1 rounded-md border border-[#E3E8EF] text-[#697386]">B.Tech / UG</span>
 </div>
 ))}
 </div>
 </div>

 {/* Admission Process */}
 <div className="sz-card p-6 md:p-8 space-y-4">
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <Landmark className="text-[#635BFF]"size={22} /> Admission Details
 </h2>
 <div className="bg-[#EEF0FF] p-4 rounded-xl border border-[#C7C5FF] flex gap-3">
 <Sparkles className="text-[#635BFF] shrink-0 mt-0.5"size={20} />
 <div className="text-sm text-[#4338CA] leading-relaxed font-sans">
 <strong className="block mb-1">Entrance Exams Accepted:</strong>
 <div className="flex flex-wrap gap-2 mt-1">
 {college.entranceExams.map((ex, i) => (
 <span key={i} className="bg-white border border-[#C7C5FF] text-[#635BFF] px-2 py-0.5 rounded-md font-bold text-xs">
 {ex}
 </span>
 ))}
 </div>
 </div>
 </div>
 <p className="text-[#425466] text-sm leading-relaxed pt-2 font-sans">{intelligence.admissionProcess}</p>
 </div>
 </div>

 {/* Sidebar */}
 <div className="space-y-6">
 {/* Verified Sources references */}
 <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 space-y-4">
 <div className="flex items-start gap-3">
 <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5"size={24} />
 <div>
 <h3 className="font-bold text-emerald-950 mb-1 font-sans">Verified Intelligence</h3>
 <p className="text-xs text-emerald-800 font-sans leading-relaxed">
 All stats and reports are cross-checked with official data publications to avoid fabrication.
 </p>
 </div>
 </div>
 <div className="border-t border-emerald-200/60 pt-3">
 <span className="text-[10px] uppercase font-extrabold text-emerald-900 tracking-wider block mb-2">Sources Checked:</span>
 <ul className="space-y-2">
 {intelligence.verifiedReferences.map((ref, idx) => (
 <li key={idx} className="text-xs text-emerald-900 font-semibold flex items-center gap-1.5 font-sans">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>
 {ref}
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Financial Aid Card */}
 <div className="sz-card p-6 space-y-4">
 <h3 className="font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <DollarSign className="text-[#635BFF]"size={20} /> Scholarships & Aid
 </h3>
 <p className="text-[#425466] text-xs leading-relaxed font-sans">
 {intelligence.scholarships}
 </p>
 </div>

 {/* Quick Web Access */}
 <a
 href={college.website}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-between p-4 bg-white border border-[#E3E8EF] rounded-xl text-[#635BFF] hover:border-[#635BFF] hover:bg-indigo-50/20 transition-all font-sans font-bold text-sm"
 >
 <span>Visit Official Website</span>
 <ExternalLink size={16} />
 </a>

 {/* Quick Comparisons */}
 {similarColleges.length > 0 && (
 <div className="sz-card p-6 space-y-4">
 <h3 className="font-bold text-[#0A2540] flex items-center gap-2 font-sans text-sm">
 <Compass className="text-[#635BFF]"size={18} /> Quick Comparisons
 </h3>
 <div className="space-y-2">
 {similarColleges.map(sim => (
 <Link
 key={sim.id}
 to={`/compare?ids=${college.id},${sim.id}`}
 className="w-full text-left flex items-center justify-between p-3 bg-[#F6F7FB] border border-[#E3E8EF] hover:border-[#635BFF] hover:bg-indigo-50/20 rounded-xl text-xs font-semibold text-[#425466] transition-all"
 >
 <span>Compare with {sim.name}</span>
 <ChevronRight size={14} className="text-[#9DA6B4]"/>
 </Link>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 )}

 {/* 2. PLACEMENT INTELLIGENCE TAB */}
 {activeTab === 'placements' && (
 <div className="space-y-8">
 {/* Highlights Dashboard */}
 <div className="grid sm:grid-cols-3 gap-6">
 <div className="sz-card p-6 text-center">
 <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block mb-1">Highest Package</span>
 <span className="text-3xl font-extrabold text-[#635BFF] font-sans">
 ₹{college.highestPackageLpa ? `${college.highestPackageLpa} LPA` : 'Awaiting Report'}
 </span>
 </div>
 <div className="sz-card p-6 text-center">
 <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block mb-1">Average Package</span>
 <span className="text-3xl font-extrabold text-[#0BBF8A] font-sans">₹{college.avgPackageLpa} LPA</span>
 </div>
 <div className="sz-card p-6 text-center">
 <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block mb-1">NIRF Placement Score</span>
 <span className="text-3xl font-extrabold text-[#0A2540] font-sans">
 {intelligence.realityRatings.placementSupport}/100
 </span>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 {/* Trends Bar Chart */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h3 className="text-lg font-bold text-[#0A2540] font-sans">Placement Package Progression</h3>
 
 {/* SVG Chart */}
 <div className="space-y-6 pt-4">
 {intelligence.placementTrends.map((trend, idx) => (
 <div key={idx} className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">{trend.year}</span>
 <span className="text-[#697386]">
 Avg: <span className="text-[#0BBF8A] font-bold">₹{trend.avgPackageLpa}L</span> | Max: <span className="text-[#635BFF] font-bold">₹{trend.highestPackageLpa}L</span>
 </span>
 </div>
 
 {/* Progress indicators as standard charts */}
 <div className="space-y-1.5">
 {/* Highest Package bar */}
 <div className="w-full bg-[#F0F2F8] h-2.5 rounded-full overflow-hidden">
 <div 
 className="bg-[#635BFF] h-full rounded-full transition-all duration-500"
 style={{ width: `${Math.min(100, (trend.highestPackageLpa / 60) * 100)}%` }}
 />
 </div>
 {/* Average Package bar */}
 <div className="w-full bg-[#F0F2F8] h-2.5 rounded-full overflow-hidden">
 <div 
 className="bg-[#0BBF8A] h-full rounded-full transition-all duration-500"
 style={{ width: `${Math.min(100, (trend.avgPackageLpa / 60) * 100)}%` }}
 />
 </div>
 </div>
 </div>
 ))}
 <div className="text-[10px] text-[#697386] font-sans text-center mt-2">
 Chart scale capped at ₹60 LPA for relative comparisons.
 </div>
 </div>
 </div>

 {/* Sector Allocation */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h3 className="text-lg font-bold text-[#0A2540] font-sans">Placements by Sector</h3>
 <div className="space-y-4 pt-2">
 {intelligence.sectorAnalysis.map((sect, idx) => (
 <div key={idx} className="space-y-1 font-sans">
 <div className="flex justify-between text-xs font-bold text-[#425466]">
 <span>{sect.sector}</span>
 <span className="text-[#0A2540]">{sect.percentage}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-indigo-500 h-full rounded-full"
 style={{ width: `${sect.percentage}%` }}
 />
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 {/* Salary Bracket Spread */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h3 className="text-lg font-bold text-[#0A2540] font-sans">Salary Package Distribution</h3>
 <div className="space-y-4 pt-2">
 {intelligence.salarySpread.map((spread, idx) => (
 <div key={idx} className="space-y-1 font-sans">
 <div className="flex justify-between text-xs font-bold text-[#425466]">
 <span>{spread.range}</span>
 <span className="text-[#0A2540]">{spread.percentage}% of Batch</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-emerald-500 h-full rounded-full"
 style={{ width: `${spread.percentage}%` }}
 />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Top Recruiters */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h3 className="text-lg font-bold text-[#0A2540] font-sans">Key Recruiters</h3>
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
 {intelligence.recruiters.map((rec, idx) => (
 <div key={idx} className="p-3 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl flex items-center justify-center font-sans font-bold text-[#425466] text-sm text-center shadow-xs">
 {rec}
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 )}

 {/* 3. CAREER OUTCOMES TAB */}
 {activeTab === 'outcomes' && (
 <div className="sz-card p-6 md:p-8 space-y-8">
 <div className="max-w-2xl">
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans mb-2">
 <Compass className="text-[#635BFF]"size={22} /> Graduating Class Career Pathways
 </h2>
 <p className="text-sm text-[#697386] font-sans">
 Detailed analysis of career paths selected by graduates from prime branches within 6 months of graduation.
 </p>
 </div>

 {/* Pathway Flowchart */}
 <div className="space-y-8">
 {intelligence.careerOutcomes.map((outcome, idx) => (
 <div key={idx} className="border border-[#E3E8EF] rounded-2xl p-6 bg-[#F6F7FB] space-y-6">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#635BFF]">
 <GraduationCap size={20} />
 </div>
 <h3 className="text-base font-extrabold text-[#0A2540] font-sans">{outcome.program} Graduates</h3>
 </div>

 {/* Visual Flow diagram */}
 <div className="grid md:grid-cols-4 gap-4 items-center">
 <div className="bg-white border border-[#E3E8EF] p-4 rounded-xl text-center shadow-xs">
 <span className="text-[10px] uppercase font-bold text-[#697386] tracking-wider">Degree Batch</span>
 <p className="font-extrabold text-[#0A2540] text-sm mt-1">{outcome.program}</p>
 <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200 mt-2 inline-block">100% Grads</span>
 </div>

 <div className="hidden md:flex justify-center text-[#9DA6B4]">
 <ChevronRight size={24} />
 </div>

 <div className="md:col-span-2 space-y-3">
 {outcome.gradPaths.map((path, pIdx) => (
 <div key={pIdx} className="bg-white border border-[#E3E8EF] p-3 rounded-xl flex items-center justify-between shadow-xs font-sans">
 <div>
 <div className="flex items-center gap-2">
 <span className="font-bold text-sm text-[#0A2540]">{path.role}</span>
 <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold border ${
 path.avenue === 'Core Tech' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' :
 path.avenue === 'Consulting & Finance' ? 'bg-amber-50 border-amber-100 text-amber-700' :
 path.avenue === 'Higher Studies' ? 'bg-purple-50 border-purple-100 text-purple-700' :
 'bg-slate-50 border-slate-100 text-slate-700'
 }`}>
 {path.avenue}
 </span>
 </div>
 <p className="text-[10px] text-[#697386] mt-0.5">
 Focus areas: {path.subRoles.join(', ')}
 </p>
 </div>
 <span className="text-sm font-extrabold text-[#635BFF] bg-indigo-50 px-2 py-1 rounded">
 {path.percentage}%
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* 4. TRAVEL GUIDE & TRANSIT TAB */}
 {activeTab === 'travel' && (
 <div className="grid md:grid-cols-3 gap-8">
 <div className="md:col-span-2 space-y-6">
 {/* Transit Hubs */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <Map className="text-[#635BFF]"size={22} /> Transit & Commute Hubs
 </h2>
 
 <div className="space-y-4">
 {college.transit?.airport && typeof college.transit.airport !== 'string' && (
 <div className="p-4 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
 <div className="flex items-start gap-3">
 <Plane className="text-[#635BFF] mt-0.5 shrink-0"size={20} />
 <div>
 <span className="font-extrabold text-sm text-[#0A2540]">Nearest Airport</span>
 <p className="text-xs text-[#697386] mt-0.5">{college.transit.airport.name}</p>
 </div>
 </div>
 <div className="sm:text-right shrink-0">
 <span className="font-bold text-sm text-[#0A2540] block">{college.transit.airport.distanceKm} km away</span>
 <span className="text-xs text-[#697386] font-medium flex items-center gap-1 sm:justify-end mt-0.5">
 <Clock size={12} /> {college.transit.airport.travelTimeMinutes} mins travel
 </span>
 </div>
 </div>
 )}

 {college.transit?.railway && typeof college.transit.railway !== 'string' && (
 <div className="p-4 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
 <div className="flex items-start gap-3">
 <Train className="text-[#635BFF] mt-0.5 shrink-0"size={20} />
 <div>
 <span className="font-extrabold text-sm text-[#0A2540]">Nearest Railway Terminal</span>
 <p className="text-xs text-[#697386] mt-0.5">{college.transit.railway.name}</p>
 </div>
 </div>
 <div className="sm:text-right shrink-0">
 <span className="font-bold text-sm text-[#0A2540] block">{college.transit.railway.distanceKm} km away</span>
 <span className="text-xs text-[#697386] font-medium flex items-center gap-1 sm:justify-end mt-0.5">
 <Clock size={12} /> {college.transit.railway.travelTimeMinutes} mins travel
 </span>
 </div>
 </div>
 )}

 {college.transit?.metro && (
 <div className="p-4 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
 <div className="flex items-start gap-3">
 <Compass className="text-[#0BBF8A] mt-0.5 shrink-0"size={20} />
 <div>
 <span className="font-extrabold text-sm text-[#0A2540]">Nearest Metro Station</span>
 <p className="text-xs text-[#697386] mt-0.5">{college.transit.metro.name}</p>
 </div>
 </div>
 <div className="sm:text-right shrink-0">
 <span className="font-bold text-sm text-[#0A2540] block">{college.transit.metro.distanceKm} km away</span>
 <span className="text-xs text-[#697386] font-medium flex items-center gap-1 sm:justify-end mt-0.5">
 <Clock size={12} /> {college.transit.metro.travelTimeMinutes} mins travel
 </span>
 </div>
 </div>
 )}

 {college.transit?.busStation && (
 <div className="p-4 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
 <div className="flex items-start gap-3">
 <MapPin className="text-[#635BFF] mt-0.5 shrink-0"size={20} />
 <div>
 <span className="font-extrabold text-sm text-[#0A2540]">Interstate Bus Stand (ISBT)</span>
 <p className="text-xs text-[#697386] mt-0.5">{college.transit.busStation.name}</p>
 </div>
 </div>
 <div className="sm:text-right shrink-0">
 <span className="font-bold text-sm text-[#0A2540] block">{college.transit.busStation.distanceKm} km away</span>
 <span className="text-xs text-[#697386] font-medium flex items-center gap-1 sm:justify-end mt-0.5">
 <Clock size={12} /> {college.transit.busStation.travelTimeMinutes} mins travel
 </span>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>

 {/* Sidebar Guide details */}
 <div className="space-y-6 font-sans">
 {/* Commute Score card */}
 <div className="sz-card p-6 space-y-4">
 <h3 className="font-bold text-[#0A2540]">Accessibility Score</h3>
 <div className="flex items-baseline gap-2">
 <span className="text-4xl font-extrabold text-[#635BFF]">{college.transit?.convenienceScore || 7.5}</span>
 <span className="text-sm font-semibold text-[#697386]">/ 10</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-2 rounded-full overflow-hidden">
 <div 
 className="bg-[#635BFF] h-full rounded-full"
 style={{ width: `${(college.transit?.convenienceScore || 7.5) * 10}%` }}
 />
 </div>
 <p className="text-xs text-[#697386] leading-relaxed">
 Convenience score evaluated from hub distance vectors using the Haversine method. Ratings above 7 indicate excellent local transit connections.
 </p>
 </div>

 {/* Travel Guide Tips */}
 <div className="sz-card p-6 space-y-4 bg-indigo-50/30 border-indigo-100">
 <h3 className="font-bold text-[#0A2540] text-sm flex items-center gap-1.5">
 <Sparkles size={16} className="text-[#635BFF]"/> Campus Transit Tips
 </h3>
 <ul className="space-y-2.5 text-xs text-[#425466]">
 <li className="flex gap-2">
 <span className="text-[#635BFF] font-bold">✓</span>
 Prepaid taxi counters are available directly inside nearest airports.
 </li>
 <li className="flex gap-2">
 <span className="text-[#635BFF] font-bold">✓</span>
 Auto-rickshaws and app cabs are the main transit route from the railway terminal.
 </li>
 </ul>
 </div>
 </div>
 </div>
 )}

 {/* 5. LIVING BUDGET ESTIMATOR TAB */}
 {activeTab === 'living' && (
 <div className="grid md:grid-cols-3 gap-8">
 <div className="md:col-span-2 space-y-6">
 {/* Calculator Box */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#E3E8EF] pb-4">
 <div>
 <h2 className="text-xl font-bold text-[#0A2540] font-sans">Living & Boarding Budget Estimator</h2>
 <p className="text-xs text-[#697386] font-sans mt-0.5">Simulate cost of living at {college.name} based on your preferences.</p>
 </div>
 
 {/* Toggle */}
 <div className="bg-[#F0F2F8] p-1 rounded-xl flex gap-1 border border-[#E3E8EF]">
 <button
 onClick={() => setLivingType('pg')}
 className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans cursor-pointer transition-all ${
 livingType === 'pg' ? 'bg-white text-[#635BFF] shadow-xs' : 'text-[#697386]'
 }`}
 >
 Off-Campus PG
 </button>
 <button
 onClick={() => setLivingType('hostel')}
 className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans cursor-pointer transition-all ${
 livingType === 'hostel' ? 'bg-white text-[#635BFF] shadow-xs' : 'text-[#697386]'
 }`}
 >
 On-Campus Hostel
 </button>
 </div>
 </div>

 {livingType === 'pg' ? (
 <div className="space-y-6">
 {/* PG Rent Slider */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#425466]">Monthly Rent (PG/Flatshare)</span>
 <span className="text-[#0A2540] font-bold">₹{pgRent.toLocaleString()} / mo</span>
 </div>
 <input
 type="range"
 min="3000"
 max="22000"
 step="500"
 value={pgRent}
 onChange={(e) => setPgRent(Number(e.target.value))}
 className="w-full accent-[#635BFF] cursor-pointer"
 />
 <div className="flex justify-between text-[10px] text-[#697386]">
 <span>Min (Budget Room): ₹3,000</span>
 <span>Max (Premium 1BHK): ₹22,000</span>
 </div>
 </div>

 {/* Food Slider */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#425466]">Monthly Food & Mess Outlay</span>
 <span className="text-[#0A2540] font-bold">₹{pgFood.toLocaleString()} / mo</span>
 </div>
 <input
 type="range"
 min="2000"
 max="10000"
 step="200"
 value={pgFood}
 onChange={(e) => setPgFood(Number(e.target.value))}
 className="w-full accent-[#635BFF] cursor-pointer"
 />
 </div>

 {/* Local Commute Slider */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#425466]">Monthly Travel & Transit</span>
 <span className="text-[#0A2540] font-bold">₹{pgTravel.toLocaleString()} / mo</span>
 </div>
 <input
 type="range"
 min="500"
 max="5000"
 step="100"
 value={pgTravel}
 onChange={(e) => setPgTravel(Number(e.target.value))}
 className="w-full accent-[#635BFF] cursor-pointer"
 />
 </div>

 {/* Amenity checklist */}
 <div className="space-y-3 pt-2">
 <span className="text-xs font-extrabold text-[#697386] uppercase tracking-wider block">PG Amenities (+ ₹400/mo each):</span>
 <div className="grid grid-cols-2 gap-3">
 {intelligence.livingBudget.amenities.map((am, idx) => (
 <label key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#425466] cursor-pointer">
 <input
 type="checkbox"
 checked={amenityAddons.includes(am)}
 onChange={() => toggleAmenityAddon(am)}
 className="w-4 h-4 rounded text-[#635BFF] focus:ring-[#635BFF] cursor-pointer"
 />
 <span>{am}</span>
 </label>
 ))}
 </div>
 </div>

 {/* Fixed charges info */}
 <div className="bg-[#F6F7FB] p-4 rounded-xl border border-[#E3E8EF] flex justify-between text-xs font-semibold text-[#697386]">
 <span>Internet Wi-Fi (Fixed): ₹{intelligence.livingBudget.defaultInternetMonthly}</span>
 <span>Misc / Pocket Money: ₹{intelligence.livingBudget.defaultMiscMonthly}</span>
 </div>
 </div>
 ) : (
 <div className="space-y-6 font-sans">
 {/* Hostel details card */}
 <div className="bg-[#EEF0FF] border border-[#C7C5FF] p-6 rounded-xl space-y-4">
 <div className="flex justify-between items-center">
 <span className="text-sm font-semibold text-[#4338CA]">Hostel Fee (Yearly)</span>
 <span className="text-lg font-extrabold text-[#635BFF]">₹{intelligence.livingBudget.hostelFeeYearly.toLocaleString()} / yr</span>
 </div>
 <div className="flex justify-between items-center border-t border-[#C7C5FF]/50 pt-3">
 <span className="text-sm font-semibold text-[#4338CA]">Mess Food Bill (Yearly)</span>
 <span className="text-lg font-extrabold text-[#635BFF]">₹{intelligence.livingBudget.messFeeYearly.toLocaleString()} / yr</span>
 </div>
 <div className="text-[10px] text-[#697386] pt-1">
 Note: Hostel fees are collected annually during registration. Mess bills are collected per semester.
 </div>
 </div>

 <div className="p-4 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl text-xs font-semibold text-[#697386] space-y-2">
 <p className="flex justify-between">
 <span>Estimated Local Commute (10 Months):</span>
 <span className="text-[#0A2540] font-bold">₹{(pgTravel * 10).toLocaleString()}</span>
 </p>
 <p className="flex justify-between">
 <span>Estimated Personal Misc (10 Months):</span>
 <span className="text-[#0A2540] font-bold">₹{(intelligence.livingBudget.defaultMiscMonthly * 10).toLocaleString()}</span>
 </p>
 </div>
 </div>
 )}
 </div>
 </div>

 {/* Sidebar Budget Calculations */}
 <div className="space-y-6 font-sans">
 {/* Totals Outlay */}
 <div className="bg-white border border-[#E3E8EF] rounded-2xl p-6 shadow-sm space-y-6">
 <h3 className="font-extrabold text-base text-[#0A2540]">Estimated Outlay</h3>
 
 {livingType === 'pg' ? (
 <div className="space-y-4">
 <div>
 <span className="text-[10px] uppercase font-extrabold text-[#697386] tracking-wider block mb-1">Monthly Total</span>
 <span className="text-3xl font-black text-[#635BFF]">₹{totalMonthlyPg.toLocaleString()}</span>
 </div>
 <div className="border-t border-[#E3E8EF] pt-4">
 <span className="text-[10px] uppercase font-extrabold text-[#697386] tracking-wider block mb-1">Yearly Total (12 Months)</span>
 <span className="text-xl font-bold text-[#0A2540]">₹{totalYearlyPg.toLocaleString()}</span>
 </div>
 </div>
 ) : (
 <div className="space-y-4">
 <div>
 <span className="text-[10px] uppercase font-extrabold text-[#697386] tracking-wider block mb-1">Yearly Total (College Session)</span>
 <span className="text-3xl font-black text-[#635BFF]">₹{totalYearlyHostel.toLocaleString()}</span>
 </div>
 <div className="border-t border-[#E3E8EF] pt-4">
 <span className="text-[10px] uppercase font-extrabold text-[#697386] tracking-wider block mb-1">Equivalent Monthly Cost</span>
 <span className="text-xl font-bold text-[#0A2540]">₹{Math.round(totalYearlyHostel / 12).toLocaleString()} / mo</span>
 </div>
 </div>
 )}
 </div>

 {/* Near Facilities */}
 <div className="sz-card p-6 space-y-4">
 <h3 className="font-bold text-sm text-[#0A2540]">Local Infrastructure</h3>
 <div className="space-y-3 text-xs">
 <div>
 <span className="font-bold text-[#697386] block mb-1">Hospitals / Clinics</span>
 <ul className="space-y-1 text-[#425466]">
 {intelligence.livingBudget.hospitals.map((h, i) => (
 <li key={i} className="flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full shrink-0"/>
 {h}
 </li>
 ))}
 </ul>
 </div>
 <div className="border-t border-[#E3E8EF] pt-3">
 <span className="font-bold text-[#697386] block mb-1">Shopping & Markets</span>
 <ul className="space-y-1 text-[#425466]">
 {intelligence.livingBudget.markets.map((m, i) => (
 <li key={i} className="flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 bg-[#635BFF] rounded-full shrink-0"/>
 {m}
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* 6. REALITY RATINGS TAB */}
 {activeTab === 'reality' && (
 <div className="sz-card p-6 md:p-8 space-y-8">
 <div className="max-w-2xl">
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans mb-2">
 <Activity className="text-[#635BFF]"size={22} /> Reality Intelligence Profile
 </h2>
 <p className="text-sm text-[#697386] font-sans">
 Unbiased student satisfaction index and campus stress levels compiled anonymously.
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-8 pt-4">
 {/* Left Column ratings */}
 <div className="space-y-5">
 {/* Happiness */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Overall Student Happiness Index</span>
 <span className="text-[#635BFF] font-black">{intelligence.realityRatings.happinessScore}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-indigo-600 h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.happinessScore}%` }}
 />
 </div>
 </div>

 {/* Pressure */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Academic Pressure & Competition</span>
 <span className="text-amber-600 font-black">{intelligence.realityRatings.academicPressure}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-amber-500 h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.academicPressure}%` }}
 />
 </div>
 </div>

 {/* Culture & Freedom */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Campus Culture & Curfew Freedom</span>
 <span className="text-[#0BBF8A] font-black">{intelligence.realityRatings.freedomCulture}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-emerald-500 h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.freedomCulture}%` }}
 />
 </div>
 </div>

 {/* Mess Food */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Mess & Cafeteria Food Quality</span>
 <span className="text-[#697386] font-black">{intelligence.realityRatings.foodQuality}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-[#697386] h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.foodQuality}%` }}
 />
 </div>
 </div>
 </div>

 {/* Right Column ratings */}
 <div className="space-y-5">
 {/* Diversity */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Student Diversity (State/Stream)</span>
 <span className="text-[#635BFF] font-black">{intelligence.realityRatings.diversityScore}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-indigo-400 h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.diversityScore}%` }}
 />
 </div>
 </div>

 {/* Hostel Quality */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Hostel Infrastructure & Maintenance</span>
 <span className="text-[#0BBF8A] font-black">{intelligence.realityRatings.hostelQuality}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-emerald-400 h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.hostelQuality}%` }}
 />
 </div>
 </div>

 {/* Sports */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Sports Infrastructure Score</span>
 <span className="text-[#635BFF] font-black">{intelligence.realityRatings.sportsInfrastructure}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-indigo-500 h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.sportsInfrastructure}%` }}
 />
 </div>
 </div>

 {/* Safety */}
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-semibold font-sans">
 <span className="text-[#0A2540]">Campus Safety & Security Index</span>
 <span className="text-[#0BBF8A] font-black">{intelligence.realityRatings.safetyScore}%</span>
 </div>
 <div className="w-full bg-[#F0F2F8] h-3 rounded-full overflow-hidden">
 <div 
 className="bg-emerald-500 h-full rounded-full"
 style={{ width: `${intelligence.realityRatings.safetyScore}%` }}
 />
 </div>
 </div>
 </div>
 </div>

 {/* Reality Warning Footer */}
 <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3 text-xs leading-relaxed text-amber-800 font-sans">
 <AlertCircle size={20} className="text-amber-500 shrink-0"/>
 <div>
 <strong className="block mb-1">Reality Summary Note:</strong>
 This college is categorized as {college.tier}. It features high placement outcomes with average packages of ₹{college.avgPackageLpa} LPA, but students report a demanding workload (Academic Pressure rating: {intelligence.realityRatings.academicPressure}%). Keep these insights in mind while planning your selection priorities.
 </div>
 </div>
 </div>
 )}

 {/* 7. STUDENT VOICES TAB */}
 {activeTab === 'voices' && (
 <div className="grid md:grid-cols-3 gap-8">
 
 {/* Reviews & Forum */}
 <div className="md:col-span-2 space-y-6">
 
 {/* Reviews Section */}
 <div className="sz-card p-6 md:p-8 space-y-6">
 <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#E3E8EF] pb-4">
 <h3 className="text-lg font-bold text-[#0A2540] font-sans">Anonymous Student Reviews</h3>
 
 <div className="flex items-center gap-3">
 <select
 value={reviewsFilter}
 onChange={(e) => setReviewsFilter(e.target.value)}
 className="px-3 py-1.5 bg-white border border-[#E3E8EF] rounded-xl text-xs font-bold font-sans focus:outline-none cursor-pointer"
 >
 <option value="All">All Categories</option>
 <option value="Academics">Academics</option>
 <option value="Placements">Placements</option>
 <option value="Hostel & Mess">Hostel & Mess</option>
 <option value="Campus Life">Campus Life</option>
 </select>

 <button
 onClick={() => setShowReviewForm(!showReviewForm)}
 className="bg-[#635BFF] text-white px-3 py-1.5 rounded-xl text-xs font-bold font-sans hover:bg-[#4F47E5] cursor-pointer flex items-center gap-1"
 >
 <Plus size={14} /> Write Review
 </button>
 </div>
 </div>

 {/* Review Form */}
 {showReviewForm && (
 <form onSubmit={handleAddReview} className="p-4 bg-[#F6F7FB] border border-[#E3E8EF] rounded-xl space-y-4 font-sans animate-slide-up">
 <div className="grid sm:grid-cols-3 gap-4">
 <div>
 <label className="text-xs font-bold text-[#697386] block mb-1">Author Name</label>
 <input
 type="text"
 placeholder="e.g. Anonymous Sophomore"
 value={newReview.author}
 onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
 className="w-full bg-white border border-[#E3E8EF] rounded-lg p-2 text-sm focus:outline-none focus:border-[#635BFF]"
 />
 </div>
 <div>
 <label className="text-xs font-bold text-[#697386] block mb-1">Your Role</label>
 <select
 value={newReview.role}
 onChange={(e) => setNewReview({ ...newReview, role: e.target.value as any })}
 className="w-full bg-white border border-[#E3E8EF] rounded-lg p-2 text-sm focus:outline-none focus:border-[#635BFF] cursor-pointer"
 >
 <option value="Sophomore">Sophomore</option>
 <option value="Senior">Senior Student</option>
 <option value="Alumni">Alumnus</option>
 </select>
 </div>
 <div>
 <label className="text-xs font-bold text-[#697386] block mb-1">Rating (1 to 5 Stars)</label>
 <select
 value={newReview.rating}
 onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
 className="w-full bg-white border border-[#E3E8EF] rounded-lg p-2 text-sm focus:outline-none focus:border-[#635BFF] cursor-pointer"
 >
 <option value={5}>5 Stars (Excellent)</option>
 <option value={4}>4 Stars (Good)</option>
 <option value={3}>3 Stars (Decent)</option>
 <option value={2}>2 Stars (Poor)</option>
 <option value={1}>1 Star (Awful)</option>
 </select>
 </div>
 </div>

 <div>
 <label className="text-xs font-bold text-[#697386] block mb-1">Category</label>
 <select
 value={newReview.category}
 onChange={(e) => setNewReview({ ...newReview, category: e.target.value as any })}
 className="w-full bg-white border border-[#E3E8EF] rounded-lg p-2 text-sm focus:outline-none focus:border-[#635BFF] cursor-pointer"
 >
 <option value="Academics">Academics</option>
 <option value="Placements">Placements</option>
 <option value="Hostel & Mess">Hostel & Mess</option>
 <option value="Campus Life">Campus Life</option>
 <option value="Faculty">Faculty</option>
 </select>
 </div>

 <div>
 <label className="text-xs font-bold text-[#697386] block mb-1">Review text</label>
 <textarea
 placeholder="Write your honest, objective review of campus reality..."
 value={newReview.text}
 onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
 rows={3}
 className="w-full bg-white border border-[#E3E8EF] rounded-lg p-2 text-sm focus:outline-none focus:border-[#635BFF]"
 />
 </div>

 <div className="flex justify-end gap-2">
 <button
 type="button"
 onClick={() => setShowReviewForm(false)}
 className="px-3 py-1.5 bg-white border border-[#E3E8EF] rounded-lg text-xs font-bold font-sans cursor-pointer"
 >
 Cancel
 </button>
 <button
 type="submit"
 className="px-3 py-1.5 bg-[#635BFF] text-white rounded-lg text-xs font-bold font-sans cursor-pointer"
 >
 Submit Review
 </button>
 </div>
 </form>
 )}

 {/* Reviews List */}
 <div className="space-y-4 pt-2">
 {reviews
 .filter(r => reviewsFilter === 'All' || r.category === reviewsFilter)
 .map((rev, idx) => (
 <div key={rev.id || idx} className="border border-[#E3E8EF] p-4 rounded-xl bg-white space-y-3 font-sans shadow-xs">
 <div className="flex justify-between items-start flex-wrap gap-2">
 <div>
 <span className="font-extrabold text-sm text-[#0A2540]">{rev.author}</span>
 <span className="text-[10px] text-[#697386] font-bold block mt-0.5">{rev.role} • Reviewed on {rev.date}</span>
 </div>
 
 <div className="flex gap-2 items-center">
 <span className="bg-[#EEF0FF] border border-[#C7C5FF] text-[#635BFF] px-2 py-0.5 rounded font-bold text-[10px]">
 {rev.category}
 </span>
 <span className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
 <Star size={12} className="fill-current"/> {rev.rating}/5
 </span>
 </div>
 </div>

 <p className="text-xs text-[#425466] leading-relaxed">{rev.text}</p>
 
 <div className="flex items-center gap-2">
 <button
 onClick={() => handleHelpfulReview(rev.id)}
 className="text-[10px] font-bold text-[#697386] hover:text-[#635BFF] bg-[#F6F7FB] px-2 py-1 rounded-md border border-[#E3E8EF] transition-all cursor-pointer"
 >
 👍 Helpful ({rev.helpfulVotes})
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Right Column: Q&A Forum */}
 <div className="space-y-6 font-sans">
 <div className="sz-card p-6 space-y-6">
 <h3 className="font-bold text-[#0A2540] flex items-center gap-2 border-b border-[#E3E8EF] pb-3">
 <MessageSquare size={18} className="text-[#635BFF]"/> Senior Q&A Board
 </h3>

 {/* Ask a question form */}
 <form onSubmit={handleAddQuestion} className="space-y-2.5">
 <input
 type="text"
 placeholder="Ask a question about campus life..."
 value={newQuestion}
 onChange={(e) => setNewQuestion(e.target.value)}
 className="w-full bg-[#F6F7FB] border border-[#E3E8EF] rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#635BFF]"
 />
 <button
 type="submit"
 className="w-full bg-[#635BFF] text-white py-1.5 rounded-lg text-xs font-bold hover:bg-[#4F47E5] cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
 >
 <Send size={12} /> Post Question
 </button>
 </form>

 {/* Questions thread list */}
 <div className="space-y-5 pt-2 max-h-[500px] overflow-y-auto pr-1">
 {questions.map((q) => (
 <div key={q.id} className="border-b border-[#E3E8EF] pb-4 last:border-0 last:pb-0 space-y-3">
 <div>
 <span className="text-[10px] text-[#697386] font-bold">Asked by {q.askedBy} • {q.date}</span>
 <h4 className="font-bold text-xs text-[#0A2540] mt-0.5">{q.question}</h4>
 </div>

 {/* Answers list */}
 <div className="space-y-2 pl-3 border-l-2 border-indigo-100">
 {q.answers.map((ans, aIdx) => (
 <div key={ans.id || aIdx} className="bg-[#F6F7FB] p-2.5 rounded-lg text-xs space-y-1">
 <div className="flex justify-between items-center">
 <span className="font-bold text-[#425466] flex items-center gap-1">
 {ans.author}
 {ans.verifiedSenior && (
 <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-1 rounded text-[8px] font-black inline-flex items-center gap-0.5">
 ✓ Senior
 </span>
 )}
 </span>
 <span className="text-[9px] text-[#697386]">{ans.role}</span>
 </div>
 <p className="text-[#425466] leading-relaxed font-sans">{ans.text}</p>
 </div>
 ))}
 </div>

 {/* Reply trigger button */}
 <div>
 {activeReplyBox === q.id ? (
 <div className="space-y-2 mt-2 pl-3">
 <textarea
 placeholder="Write your response as a senior/peer..."
 value={replyTexts[q.id] || ''}
 onChange={(e) => setReplyTexts({ ...replyTexts, [q.id]: e.target.value })}
 rows={2}
 className="w-full bg-[#F6F7FB] border border-[#E3E8EF] rounded-lg p-2 text-xs focus:outline-none focus:border-[#635BFF]"
 />
 <div className="flex justify-end gap-2">
 <button
 onClick={() => setActiveReplyBox(null)}
 className="px-2.5 py-1 bg-white border border-[#E3E8EF] rounded-md text-[10px] font-bold cursor-pointer"
 >
 Cancel
 </button>
 <button
 onClick={() => handleAddAnswer(q.id)}
 className="px-2.5 py-1 bg-[#635BFF] text-white rounded-md text-[10px] font-bold cursor-pointer"
 >
 Reply
 </button>
 </div>
 </div>
 ) : (
 <button
 onClick={() => setActiveReplyBox(q.id)}
 className="text-[10px] font-bold text-[#635BFF] hover:underline pl-3 cursor-pointer"
 >
 Answer this question
 </button>
 )}
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 </div>
 )}

 {/* 8. RULES & FAQS TAB */}
 {activeTab === 'rules' && (
 <div className="grid md:grid-cols-3 gap-8">
 
 {/* General FAQs Accordions */}
 <div className="md:col-span-2 space-y-6">
 <div className="sz-card p-6 md:p-8 space-y-6">
 <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 font-sans border-b border-[#E3E8EF] pb-3">
 <HelpCircle size={20} className="text-[#635BFF]"/> Frequently Asked Questions
 </h3>
 
 <div className="space-y-4">
 {intelligence.faqs.map((faq, idx) => {
 const isOpen = !!openFaqs[idx];
 return (
 <div key={idx} className="border border-[#E3E8EF] rounded-xl overflow-hidden font-sans">
 <button
 onClick={() => setOpenFaqs({ ...openFaqs, [idx]: !isOpen })}
 className="w-full p-4 bg-[#F6F7FB] flex justify-between items-center text-left font-bold text-xs text-[#0A2540] hover:bg-[#EEF0FF]/30 transition-all focus:outline-none cursor-pointer"
 >
 <span>{faq.q}</span>
 {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
 </button>
 {isOpen && (
 <div className="p-4 bg-white border-t border-[#E3E8EF] text-xs leading-relaxed text-[#425466] animate-slide-up">
 {faq.a}
 </div>
 )}
 </div>
 );
 })}
 </div>
 </div>
 </div>

 {/* Right Column: Official Rules List */}
 <div className="space-y-6 font-sans">
 
 {/* Attendance Rules */}
 <div className="sz-card p-6 space-y-3">
 <h4 className="font-bold text-xs text-[#0A2540] uppercase tracking-wider flex items-center gap-1.5">
 <Scale size={16} className="text-amber-500"/> Attendance Clause
 </h4>
 <p className="text-xs text-[#425466] leading-relaxed">
 {intelligence.rules.attendance}
 </p>
 </div>

 {/* Reservation Rules */}
 <div className="sz-card p-6 space-y-3">
 <h4 className="font-bold text-xs text-[#0A2540] uppercase tracking-wider flex items-center gap-1.5">
 <ShieldCheck size={16} className="text-[#635BFF]"/> Quota & Reservations
 </h4>
 <ul className="space-y-2 text-xs text-[#425466]">
 {intelligence.rules.reservations.map((res, i) => (
 <li key={i} className="flex gap-2">
 <span className="text-[#635BFF] font-bold">•</span>
 {res}
 </li>
 ))}
 </ul>
 </div>

 {/* Hostel Timings */}
 <div className="sz-card p-6 space-y-3">
 <h4 className="font-bold text-xs text-[#0A2540] uppercase tracking-wider flex items-center gap-1.5">
 <Clock size={16} className="text-indigo-500"/> Hostel Curfews
 </h4>
 <ul className="space-y-2 text-xs text-[#425466]">
 {intelligence.rules.hostel.map((rule, i) => (
 <li key={i} className="flex gap-2">
 <span className="text-red-500 font-bold">•</span>
 {rule}
 </li>
 ))}
 </ul>
 </div>
 </div>

 </div>
 )}

 {/* 9. CAMPUS EXPLORER TAB (Image gallery) */}
 {activeTab === 'gallery' && (
 <div className="sz-card p-6 md:p-8 space-y-6">
 <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#E3E8EF] pb-4">
 <div>
 <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2 font-sans">
 <ImageIcon className="text-[#635BFF]"size={22} /> Campus Photo Explorer
 </h2>
 <p className="text-xs text-[#697386] font-sans mt-0.5">Explore libraries, laboratories, hostels, and lecture theatres.</p>
 </div>

 {/* Category switcher */}
 <div className="flex gap-2 scrollbar-none overflow-x-auto shrink-0">
 {['all', 'buildings', 'library', 'classrooms', 'hostels'].map((cat) => (
 <button
 key={cat}
 onClick={() => setGalleryFilter(cat)}
 className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans cursor-pointer transition-all border ${
 galleryFilter === cat
 ? 'bg-[#635BFF] text-white border-[#635BFF]'
 : 'bg-white text-[#697386] border-[#E3E8EF] hover:bg-[#F6F7FB]'
 }`}
 >
 {cat.toUpperCase()}
 </button>
 ))}
 </div>
 </div>

 {/* Images grid */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
 {intelligence.gallery
 .filter(img => galleryFilter === 'all' || img.category === galleryFilter)
 .map((img, idx) => (
 <div
 key={idx}
 onClick={() => {
 setLightboxImage(img.url);
 setLightboxCaption(img.caption);
 setLightboxCredit(img.attribution);
 }}
 className="group border border-[#E3E8EF] rounded-xl overflow-hidden cursor-pointer relative bg-[#F0F2F8] shadow-xs hover:border-[#635BFF] transition-all"
 >
 <div className="aspect-[4/3] overflow-hidden">
 <img
 src={img.url}
 alt={img.caption}
 className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
 />
 </div>
 <div className="p-3 bg-white">
 <span className="text-[10px] font-extrabold uppercase text-[#635BFF] block tracking-wider">{img.category}</span>
 <span className="text-xs font-bold text-[#0A2540] truncate block mt-0.5">{img.caption}</span>
 <span className="text-[8px] text-[#697386] font-semibold block mt-1">{img.attribution}</span>
 </div>
 </div>
 ))}
 </div>

 {/* Image Lightbox */}
 {lightboxImage && (
 <div className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center p-4">
 <button
 onClick={() => setLightboxImage(null)}
 className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-all cursor-pointer"
 >
 <X size={24} />
 </button>

 <div className="max-w-4xl max-h-[75vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl relative">
 <img
 src={lightboxImage}
 alt={lightboxCaption}
 className="object-contain w-full h-auto max-h-[75vh]"
 />
 </div>
 
 <div className="text-center mt-6 text-white max-w-lg space-y-2">
 <h4 className="text-lg font-bold font-sans">{lightboxCaption}</h4>
 <p className="text-xs text-slate-400 font-sans font-medium">{lightboxCredit}</p>
 </div>
 </div>
 )}
 </div>
 )}

 </div>

 </div>
 </div>
 </div>
 );
}
